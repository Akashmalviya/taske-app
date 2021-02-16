const express = require('express');
//const auth = require('../middeleware/auth')
const driverController = require('../controllers/driverController') 
const multer = require('multer')
const fs = require('fs');
const upload = require('../middeleware/file-upload');



var router = express.Router();


//  router.post('/login',driverController.authGateWay);
//  router.post('/verifyOtp', driverController.verifyOtp);
//  router.post('/verifyPassword', driverController.verifyOtp);
//  router.patch('/completeProfile',auth, driverController.completeProfile);
//  router.post('/logout',auth, driverController.logout)

router.post('/upload', upload.single('upload'),async (req, res) =>{

    console.log(req.file.path);
    var img = req.file.filename
    const url = 'http://localhost:3000/img/'+img
      res.send('file uploaded succesfully'+ url)
  } )
// router.post('/uploads', upload.array('uploads'), driverController.documentUpload)

module.exports = router;