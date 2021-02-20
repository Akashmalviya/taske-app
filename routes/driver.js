const express = require('express');
//const auth = require('../middeleware/auth')
const driverController = require('../controllers/driverController') 
const multer = require('multer')
const fs = require('fs');
const upload = require('../middeleware/file-upload');



var router = express.Router();


 router.post('/login',driverController.authGateWay);
 router.post('/verifyOtp', driverController.verifyOtp);
 router.post('/verifyPassword', driverController.verifyOtp);

module.exports = router;