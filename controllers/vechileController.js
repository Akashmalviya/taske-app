
const Vehicle = require('../models/vechile')
//const Admin = require('../models/adminSchema');
const AppError = require('../middeleware/AppError');

const defaultResponseObject = {
    success: true,
    data: null, //{},[] or null
    message: "",
    error: null,
  };

  exports.Vehicletype = async(req,res) => {
      try{
          const type = await new Vehicle({type:req.body.type})
          type.save();

          let response = {...defaultResponseObject}
          response.data = type
          res.status(201).send(response)
      }catch(e){
          let response = {...defaultResponseObject}
          response.error = e
          response.success = false
          res.status(400).send(response)
      }
  };

  exports.VehicleCapacity = async(req,res) => {
      try{
      const capacity = await new Vehicle({capacity:req.body.capacity})
      capacity.save();
      let response = {...defaultResponseObject}
      response.data = capacity
      res.status(200).send(response)
      }catch(e){
          let response = {...defaultResponseObject}
          response.error = e
          response.success = false
          res.status(400).send(response)
      }
  };

  exports.viewAll = async(req,res) => {
      try{
      const view = await Vehicle.find({})
      console.log(view);

      let response = {...defaultResponseObject}
      response.data = view
      res.status(201).send(response)
  }catch(e){
      let response = {...defaultResponseObject}
      response.error = e;
      response.success = false
      res.status(401).send(response)
  }

  };

  exports.delete = async(req,res,next) => {
      try{
          const vehicleId = req.params.id
          console.log(vehicleId);
          const check = await Vehicle.findById(vehicleId)
          console.log(check)
          if(!check){
              //return next(new AppError("no vehicle found"))
              res.send("failed")
          }
          const deleteType = await Vehicle.findByIdAndDelete(vehicleId);
           
          let response = {...defaultResponseObject}
          response.data = deleteType
          res.status(200).send(response)

      }catch(e){
          let response = {...defaultResponseObject}
          response.error = e
          response.success = false

          res.status(400).send(response)
      }
      
  };

  exports.update = async(req,res) => {
      
    const updates = Object.keys(req.body) 
    const allowed = ['type','capacity']
    const isValid = updates.every((update) => allowed.includes(update))

    if(!isValid){
        return res.status(400).send({error:"invalid update!!!"})
    }
    const _id = req.params.id
    try{
        const VehicleUpdate = await Vehicle.findById(_id)
        updates.forEach((update)=> VehicleUpdate[update] = req.body[update])
        await VehicleUpdate.save();

        if(!VehicleUpdate){
            return res.status(400).send()
        }
        let response = {...defaultResponseObject}
        response.data = VehicleUpdate
        res.status(201).send(response)

    }catch(e){
        let response = {...defaultResponseObject}
        response.error = e
        response.success = false

        res.status(400).send(response)

    }

  };


