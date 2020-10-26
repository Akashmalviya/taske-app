var express = require('express');

const UserControllers = require('../controllers/UserControllers') 
const auth = require('../middeleware/auth')

var router = express.Router();

/* GET users listing. */
router.post('/login', UserControllers.authGateWay);
router.post('/verifyOtp', UserControllers.verifyOtp);
router.post('/verifyPassword', UserControllers.verifyPassword);
router.patch('/completeProfile',auth, UserControllers.completeProfile);


module.exports = router;


