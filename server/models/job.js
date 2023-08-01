const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  companyname: {
    type: String,
    reqired: true,
  },
  addlogourl: {
    type: String,
    reqired: true,
  },
  jobposition: {
    type: String,
    reqired: true,
  },
  monthlysalary: {
    type: String,
    reqired: true,
  },
  jobtype: {
    type: String,
    reqired: true,
  },
  remote: {
    type: String,
    reqired: true,
  },
  location: {
    type: String,
    reqired: true,
  },
  jobdescription: {
    type: String,
    reqired: true,
  },
  aboutcompany: {
    type: String,
    reqired: true,
  },
  skillsrequired: {
    type: String,
    reqired: true,
  },
  information: {
    type: String,
    reqired: true,
  },
});

module.exports = mongoose.model("Job", jobSchema);
