const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  UID: {
    type: String,
    required: true
  },
  Role: {
    type: String,
    required: true
  }
});

const jobhistorySchema = new mongoose.Schema({
  JobID: {
    type: String,
    required: true
  },
  UID: {
    type: String,
    required: true
  },
  status: String,
  remarks: String
});

const userSchema = new mongoose.Schema({
  UID: {
    type: String,
    required: true
  },
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  PhoneNumber: Number,
  Skills: [String],
  Experience: Number,
  CurrentTitle: String,
  Authorization: [authSchema],
  JobHistory: [jobhistorySchema]
});

mongoose.model('User', userSchema);