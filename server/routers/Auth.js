const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      // return next(new Error("cannot get a user detail regidter"))
      return res.status(404).json({ error: "all fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: "email is already registred" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, email, mobile, password: hashedPassword };

    await User.create(newUser);

    const token = jwt.sign(newUser, process.env.JWT_SECRET_KEY);
    res.json({
      success: true,
      token,
      user: email,
      name: name,
      message: "you are signup successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(406).json({ error: "no matched" });
    }

    const user = await User.findOne({ email });
    if (user) {
      // return res.status(401).json({ error: "Invalid email and password" });
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET_KEY);
        res.json({
          success: true,
          token,
          recruiterName: user.name,
          user: email,
        });
      } else {
        res.json({
          status: "FAIL",
          message: "Incorrect password",
        });
      }
    } else {
      res.json({
        status: "FAIL",
        message: "user does not exists",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "internal server error" });
  }
});

module.exports = router;
