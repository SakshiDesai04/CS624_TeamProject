const express =  require('express');
const router = express.Router();
const jwt = require('express-jwt');        
const auth = jwt({
  secret: process.env.JWT_SECRET, 
  algorithms: ['HS256'],         
  userProperty: 'payload'                  
});
const ctrlJobs = require('../controllers/jobs');
const ctrlUsers = require('../controllers/users');
const ctrlAuth = require('../controllers/authentication');

// users
router
    .route('/user')
    .post(ctrlUsers.createUser);

router
    .route('/user/:UID')
    .get(ctrlUsers.viewJobsByUID)
    .put(auth,ctrlUsers.addJobToHistory)

//jobs
router
    .route('/jobs')
    .get(ctrlJobs.viewJobs)
    .post(auth,ctrlJobs.CreateJob)

router
    .route('/jobs/:jobID')
    .get(ctrlJobs.getJobByID)
    .put(auth,ctrlJobs.updateJob)
    .delete(auth,ctrlJobs.deleteJob)

router.post('/login', ctrlAuth.login);

module.exports = router;
