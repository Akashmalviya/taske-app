 var express = require('express');
 const VechileController = require('../controllers/vechileController')

 var router = express.Router();

router.post('/category', VechileController.Vehicletype);
router.post('/capacity', VechileController.VehicleCapacity);
router.get('/viewall',VechileController.viewAll);
router.delete('/delete/:id',VechileController.delete);
router.patch('/updateVechile/:id', VechileController.update);

module.exports = router;