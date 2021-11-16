const express =  require('express');
const router = express.Router();
const ctrlJobs = require('../controllers/jobs');
const ctrlUsers = require('../controllers/users');

// users
router
    .route('/user')
    .post(ctrlUsers.createUser);

router
    .route('/user/:UID')
    .get(ctrlUsers.viewJobsByUID)
    .put(ctrlUsers.addJobToHistory)

//jobs
router
    .route('/jobs')
    .get(ctrlJobs.viewJobs)
    .post(ctrlJobs.CreateJob)

router
    .route('/jobs/:jobID')
    .put(ctrlJobs.updateJob)
    .delete(ctrlJobs.deleteJob)

module.exports = router;
