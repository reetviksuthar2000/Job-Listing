const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
  try {
    const token = req.headers.token;
   
    if (!token) {
      return res.status(404).json({ error: "unAuthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.status(404).json({ error: "all fields are required" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: "invalid token" });
  }
};

module.exports = verifyAuth;
