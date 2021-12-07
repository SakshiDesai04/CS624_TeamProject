const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true
  },
  jobDescription: {
    type: String,
    required: true
  },
  primarySkills: String,
  requiredSkills: String,
  jobSalary: String,
  jobLocation: String,
  experience: String,
  jobStatus: String,
  hRName: String,
  hREmail: String,
  benefits: String
    
});

mongoose.model('Job', jobSchema);