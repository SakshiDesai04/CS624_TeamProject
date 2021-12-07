const mongoose = require('mongoose');
const User = mongoose.model('User');

const viewJobsByUID =  (req, res) =>{
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
       .exec((err,jh) =>
       {
         if(!jh){
             return res.status(200).json({"message":"No Jobs found"});
         }
         else
         {
            const response = jh.jobHistory.map(result => {
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
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password || !req.body.role) {
      return res
        .status(400)
        .json({"message": "All fields required"});
    }
  
    const user = new User();
    user.firstName =req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email
    user.setPassword(req.body.password);
    user.role=req.body.role;
    user.phoneNumber=req.body.phoneNumber;
    user.skills=req.body.skills;
    user.experience=req.body.experience;
    user.currentTitle=req.body.currentTitle;
    
    user.save((err, us) => {
      if (err) {
        res
          .status(400)
          .json(err);
      } else {
        const token = user.generateJwt();
        res
          .status(200)
          .json({token});
      }
    })
  };

  const addJobToUser = (req, res, user) => {
    if (!user) {
      res
        .status(404)
        .json({"message": "user not found"});
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
            var applied = false
            user.jobHistory.forEach(
              jb =>{
                if(jb.jobID==req.body.jobID){
                  applied = true
                }
              }
            );
            if(!applied){
              addJobToUser(req, res, user);
            }
            else{
              res
            .status(200)
            .json("Already applied!");
            }     
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
