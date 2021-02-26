const express = require('express');
//const { route } = require('.');
const tripController = require('../controllers/tripController')

var router = express.Router();

router.get('/alltrip',tripController.getalltrip);
router.get('/:_id/gettrip',tripController.gettrip);
router.post('/create/:_id',tripController.createtrip);
router.put('/:_id/cancel',tripController.canceltrip);
router.put('/:_id/destination',tripController.changedestination);
router.put('/:_id/present',tripController.changepresentlocation);
router.put('/changestatus/:_id',tripController.changestatus);
//review
router.post('/review/:_id',tripController.CreateReview);
router.get('/viewall',tripController.ViewReview);
router.get('/view/:reviewId',tripController.ReviewById);
router.delete('/deleteReview/:reviewId',tripController.DeleteReview);



module.exports = router;