const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  companyname: {
    type: String,
    require: true,
  },
  addlogourl: {
    type: String,
    require: true,
  },
  jobposition: {
    type: String,
    require: true,
  },
  monthlysalary: {
    type: String,
    require: true,
  },
  jobtype: {
    type: String,
    require: true,
  },
  remote: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  jobdescription: {
    type: String,
    require: true,
  },
  aboutcompany: {
    type: String,
    require: true,
  },
  skillsrequired: {
    type: Array,
    require: true,
  },
  information: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Job", jobSchema);
