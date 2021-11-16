const mongoose = require('mongoose');
const Job = mongoose.model('Job');

const viewJobs = async (req,res) =>{
try {
    const results = await Job.find()
      
    const jobs = results.map(result => {
      return {
        _id : result._id,
        jobTitle : result.jobTitle,
        jobDescription : result.jobDescription,
        primarySkills : result.primarySkills,
        requiredSkills : result.requiredSkills,
        jobSalary : result.jobSalary,
        jobLocation : result.jobLocation,
        experience : result.experience,
        jobStatus : result.jobStatus,
        hRName : result.hRName,
        hREmail : result.hREmail,
        benefits : result.benefits
      }
    });
    res
      .status(200)
      .json(jobs);
  } catch (err) {
    res
      .status(404)
      .json(err);
  }
};


const updateJob = (req, res) => {
    if (!req.params.jobID) {
      return res
        .status(404)
        .json({
          "message": "Not found, jobId is required"
        });
    }
    Job
      .findById(req.params.jobID)
      .exec((err, job) => {
        if (!job) {
          return res
            .status(404)
            .json({
              "message": "jobid not found"
            });
        } else if (err) {
          return res
            .status(400)
            .json(err);
        }
        job.jobTitle = req.body.jobTitle;
        job.jobDescription = req.body.jobDescription;
        job.primarySkills = req.body.primarySkills;
        job.requiredSkills = req.body.requiredSkills;
        job.jobSalary = req.body.jobSalary;
        job.jobLocation = req.body.jobLocation;
        job.experience = req.body.experience;
        job.jobStatus = req.body.jobStatus;
        job.hRName = req.body.hRName;
        job.hREmail = req.body.hREmail;
        job.benefits = req.body.benefits;

        job.save((err, job) => {
          if (err) {
            res
              .status(404)
              .json(err);
          } else {
            res
              .status(200)
              .json(job);
          }
        });
      }
    );
  };


const deleteJob = (req, res) => {
    const {jobID} = req.params;
    if (jobID) {
      Job
        .findByIdAndRemove(jobID)
        .exec((err, job) => {
            if (err) {
              return res
                .status(404)
                .json(err);
            }
            res
              .status(204)
              .json(null);
          }
      );
    } else {
      res
        .status(404)
        .json({
          "message": "No Job"
        });
    }
  };


  const CreateJob = (req, res) => {
    Job.create({
      jobTitle: req.body.jobTitle,
      jobDescription: req.body.jobDescription,
      primarySkills: req.body.primarySkills,
      requiredSkills: req.body.requiredSkills,
      jobSalary: req.body.jobSalary,
      jobLocation: req.body.jobLocation,
      experience: req.body.experience,
      jobStatus: req.body.jobStatus,
      hRName: req.body.hRName,
      hREmail: req.body.hREmail,
      benefits: req.body.benefits
    },
    (err, job) => {
      if (err) {
        res
          .status(400)
          .json(err);
      } else {
        res
          .status(201)
          .json(job);
      }
    });
  };


module.exports = {
  viewJobs,  
  updateJob,
  deleteJob,
  CreateJob
};