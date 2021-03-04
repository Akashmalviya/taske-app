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

const Vehicle = mongoose.model('Vehicle', vehicleSchema)

exports.module = vehicleSchema
