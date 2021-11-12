const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  JobID: {
    type: String,
    required: true
  },
  JobTitle: {
    type: String,
    required: true
  },
  JobDescription: {
    type: String,
    required: true
  },
  PrimarySkills: String,
  RequiredSkills: String,
  JobSalary: String,
  JobLocation: String,
  Experience: String,
  JobStatus: String,
  HRName: String,
  HREmail: String,
  Benefits: String
    
});

mongoose.model('job', jobSchema);