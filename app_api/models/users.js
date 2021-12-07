const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

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
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  phoneNumber: Number,
  skills: String,
  experience: Number,
  currentTitle: String,
  jobHistory: [jobhistorySchema]
});

userSchema.methods.setPassword = function (password) {
  const salt = "samplesalt";       
  this.password = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');                                       
};

userSchema.methods.validPassword = function (password) {
  const salt = "samplesalt"; 
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');                                      
  return this.password === hash;                               
};

userSchema.methods.generateJwt = function () {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);                
  return jwt.sign({   
    _id: this._id,                                                                     
    email: this.email,                                 
    role: this.role,                                   
    exp: parseInt(expiry.getTime() / 1000, 10),        
  }, process.env.JWT_SECRET);                                 
};

mongoose.model('User', userSchema);