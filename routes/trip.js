const express = require('express');
//const { route } = require('.');
const TripController = require('../controllers/tripController')
const auth = require('../middeleware/auth')
var router = express.Router();

router.get('/alltrip',TripController.getalltrip);
router.get('/findDriver/:tripId', TripController.findDriver);

// router.get('/:_id/gettrip',TripController.gettrip);
// router.post('/createTrip', auth,TripController.createtrip);
// router.put('/:_id/cancel',TripController.canceltrip);
// router.put('/:_id/destination',TripController.changedestination);
// router.put('/:_id/present',TripController.changepresentlocation);
// router.put('/changestatus/:_id',TripController.changestatus);

module.exports = router;