const mongoose = require('mongoose')
const { tripEnum } = require('../constants/tripstatus')

const tripSchema = new mongoose.Schema({
    
    estimatedtime:{
        type:Number,
        default:""
    },
    pickuptime:{
        type:Number,
        default:""
    },
    dropuptime:{
        type:Number,
        default:""

    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,ref: 'User'
    },
    driverID:{
        type:mongoose.Schema.Types.ObjectId,ref: 'Driver'
    },
    vechile:{
        type:mongoose.Schema.Types.ObjectId,ref: 'Vehicle'
    },
    estimateddistance:{
        type:String,
        default:""
    },
    estimatedfare:{
        type:Number,
        default:""
    },
    pickupaddress:{
        type:String,
        default:""
    },
    dropupaddress:{
        type:String,
        default:""
    },  
    pickuplocation: {
        type: { type: String, default: "Point" },
        coordinates: { type: [Number] , index: '2dsphere'}
    },
    dropuplocation: {
        type: { type: String, default: "Point" },
        coordinates: { type: [Number] , index: '2dsphere'}
    },
    dropupMobileNumber:{
        type:String,
        default: ""
    },
    totaltripCapacity:{
        type:Number,
        default:""
    },
    driverDistance : {
        type:Number,                        
        default: ""
    },
    paymentStatus: {
        type: Boolean,
        default: false,

    },
    paymentData: {
        type: Object,
        default: null
    },
    tripStatus :{     
        type:String,   
        default: "open" ,
        enum:[...tripEnum]   

    },
    tripDate:{
        type: Date,
        default:Date.now()
    },
    tripCancellationCharge:{
        type: Number,
        default: 0
    },
    tripAcceptedDate:{
        type: Date,
        default: ""
    }, 
    tripPicupDate:{
        type: Date,
        default: ""
    },
    tripdeliveredDate:{
        type: Date,
        default: ""
    },
    tripCancelDate:{
        type: Date,
        default: ""
    },
    tripReturnDate:{
        type: Date,
        default: ""
    },
    picupVehicleCapacity:{
        type: Boolean,
        default: false
    },
    dropupVehicleCapacity:{
        type: Boolean,
        default: false
    },
    picupPackageConcernStatus:{
        type: Boolean,
        default: false
    },
    dropupPackageConcernStatus:{
        type: Boolean,
        default: false
    },
    isPickUpArrived:{
        type: Boolean,
        default: false
    },
    isDropoffArrived:{
        type: Boolean,
        default: false
    },
    statusflag:{
        type:Boolean,
        default:false
    },
    drivercomment:{
        type:String,
        default:""
    },
    usercomment:{
        type:String,
        default:""
    },

    //Review and Rating

    title:{
        type:String
    },
    description: {
        type:String
    },
    rating:{
        type:Number,
        default:null
        
    }




  
})

// userSchema.virtual('tasks', {
//     ref: 'Task',
//     localField: '_id',
//     foreignField: 'owner'
// })
// min.time , pickup time, drop up time , 



const TripSchema = mongoose.model('Trip', tripSchema)

module.exports = TripSchema