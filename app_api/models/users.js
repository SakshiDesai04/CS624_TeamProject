const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});

const jobhistorySchema = new mongoose.Schema({
  jobID: {
    type: String,
    required: true
  },
  status: String,
  remarks: String
});

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: Number,
  skills: String,
  experience: Number,
  currentTitle: String,
  authorization: authSchema,
  jobHistory: [jobhistorySchema]
});

mongoose.model('User', userSchema);