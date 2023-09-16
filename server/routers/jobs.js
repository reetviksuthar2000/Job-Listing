const express = require("express");
const router = express.Router();
const Job = require("../models/job");
const verifyAuth = require("../middleware/verifyAuth");

router.post("/jobspost", verifyAuth, async (req, res) => {
  try {
    let {
      companyname,
      addlogourl,
      jobposition,
      monthlysalary,
      jobtype,
      remote,
      location,
      jobdescription,
      aboutcompany,
      skillsrequired,
      information,
    } = req.body;

    skillsrequired = skillsrequired.split(",");
    for (let i = 0; i < skillsrequired.length; i++) {
      skillsrequired[i] = skillsrequired[i].trim();
    }

    if (
      !companyname ||
      !addlogourl ||
      !jobposition ||
      !monthlysalary ||
      !jobtype ||
      !remote ||
      !location ||
      !jobdescription ||
      !aboutcompany ||
      !skillsrequired ||
      !information
    ) {
      return res.status(404).json({ error: "all fields are required" });
    }

    const jobPost = new Job({
      companyname,
      addlogourl,
      jobposition,
      monthlysalary,
      jobtype,
      remote,
      location,
      jobdescription,
      aboutcompany,
      skillsrequired,
      information,
    });
    await jobPost.save();

    return res.json({
      message: "job created successfully",
      name: "recuritername",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "internal server error" });
  }
});

router.patch("/edit-post/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.json({ success: false, error: "bad request" });
    }

    let{
      companyname,
      addlogourl,
      jobposition,
      monthlysalary,
      jobtype,
      remote,
      location,
      jobdescription,
      aboutcompany,
      skillsrequired,
      information,
    } = req.body;

    skillsrequired = skillsrequired.toString().split(",");

    for (let i = 0; i < skillsrequired.length; i++) {
      skillsrequired[i] = skillsrequired[i].trim();
    }

    const updateData = {
      companyname,
      addlogourl,
      jobposition,
      monthlysalary,
      jobtype,
      remote,
      location,
      jobdescription,
      aboutcompany,
      skillsrequired,
      information,
    };

    

    await Job.findByIdAndUpdate({ _id: id }, updateData);

    return res.json({
      // success: true,
      message: "Job edited succesfully",
      // name: recruiterName,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "internal server error" });
  }
});

/* get id for description page*/

router.get("/job-post/:id", async (req, res) => {
  try {
    // const { id } = req.params;
    const _id = req.params.id;

    // if (!id) {
    //   return res.json({ success: false, error: "bad request" });
    // }

    const jobdetail = await Job.findById({ _id });

    return res.json({
      success: true,
      message: "Job post succesfully for description page",
      data: jobdetail,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "internal server error" });
  }
});

/* find and filter method*/

router.get("/listjob", async (req, res) => {
  try {
    const search = req.query.search;
    let skills = req.query.skills;

    // const joblist = await Job.find({
    //   jobposition: { $regex: search, $options: "i" },
    //   skillsrequired: { $in: skills },
    // });

    // if (!joblist) return res.json({ success: false, error: "bad request" });

    if(!skills && !search) {
      const jobs = await Job.find();
      return res.json({
        jobs
      })
    }
   
   if(skills){
    const jobs = await Job.find({ skillsrequired: { $in: skills}})
    return res.json({
      jobs
    })
   }    

   if(search){
    const jobs = await Job.find({ jobposition: { $regex: search, $options: "i" }})
    return res.json({
      jobs
    })
   }    
      
    // return res.json({
    //   success: true,
    //   // message: "Job post succesfully for description page",
    //   data: joblist,
    // });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "internal server error" });
  }
});

/* get job*/

router.get("/getjob", async (req, res) => {
  try {
    const alljobs = await Job.find({});

    return res.json({
      success: true,
      message: "all jobs get success",
      data: alljobs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "internal server error" });
  }
});

module.exports = router;
