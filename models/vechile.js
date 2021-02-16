const mongoose = require("mongoose");
const vehicleSchema = new mongoose.Schema({
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //  vechile{
    //     type
    //     capacity
    //     wheeler
    //     min. fare(per km)
    //     exe. fare(extra per km)

    // }@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    type:{
        type:String,

    },
    capacity:{
        type:String,

    },
    Min_FAre:{
        type:Number,

    },
    Extra_fare:{
        type:Number
    },
    timestamp: {
        type: Date,
        default: Date.now
      }
//post and get

})

 vehicleSchema.methods.category = async(wheeler)=> {
    const vechile = this;

 }
const Vehicle = mongoose.model('vehicle', vehicleSchema)

exports.module = vehicleSchema