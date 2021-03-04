const mongoose = require("mongoose");
const vehicleSchema = new mongoose.Schema({
   
    type:{
        type:String,

    },
    capacity:{
        type:String,

    },
    Min_Fare:{
        type:Number,

    },
    Extra_fare:{
        type:Number
    },
    timestamp: {
        type: Date,
        default: Date.now
      }

})

 vehicleSchema.methods.category = async(wheeler)=> {
    const vechile = this;

 }
const Vehicle = mongoose.model('Vehicle', vehicleSchema)

exports.module = vehicleSchema