const mongoose = require('mongoose');
const User = mongoose.model('User');

const viewJobsByUID = (req, res) =>{
    const {UID} = req.params
    if(!UID)
    {
      return res
      .status(404)
      .json({'message': 'Not found, UIDis required'}); 
    }

    try
    {
        User
       .findById(UID)
       .select('jobHistory')
       .exec((err,jobhistory) =>
       {
         if(!jobhistory){
             return res.status(200).json({"message":"No Jobs found"});
         }
         else
         {
            const response = jobhistory.map(result => {
                return {
                  jobID: result.jobID,
                  status: result.status,
                  remarks: result.remarks
                }
              });
            return res.status(200).json(response);
         }
       })
    }
    catch (err) {
        res
          .status(404)
          .json(err);
      }
}

const createUser = (req, res) => {
    User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    skills: req.body.skills,
    experience: req.body.experience,
    currentTitle: req.body.currentTitle,
    authorization: {
        userName: req.body.userName,
        password: req.body.password,
        role: req.body.role
    }
    },
    (err, user) => {
      if (err) {
        res
          .status(400)
          .json(err);
      } else {
        res
          .status(201)
          .json(user);
      }
    });
  };



  const addJobToUser = (req, res, user) => {
    if (!user) {
      res
        .status(404)
        .json({"message": "uset not found"});
    } else {
      const {jobID, status, remarks} = req.body;
      user.jobHistory.push({
        jobID,
        status,
        remarks
      });
      user.save((err, userResponse) => {
        if (err) {
          console.log(err)
          res
            .status(400)
            .json(err);
        } else {          
          res
            .status(201)
            .json(userResponse);
        }
      });
    }
  };
  
  const addJobToHistory = (req, res) => {
    const UID = req.params.UID;
    if (UID) {
      User
        .findById(UID)
        .select('jobHistory')
        .exec((err, user) => {
          if (err) {
            res
              .status(400)
              .json(err);
          } else {
            addJobToUser(req, res, user);
          }
        });
    } else {
      res
        .status(404)
        .json({"message": "user not found"});
    }
  };


module.exports = {
  createUser,
  viewJobsByUID,
  addJobToHistory,
  addJobToUser
};
