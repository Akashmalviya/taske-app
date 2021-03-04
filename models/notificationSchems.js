const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        refPath: 'role'
    },
      tripId:{
        type: mongoose.Schema.Types.ObjectId,
       ref: 'Trip'
    },
    role:{
        type:String,
        enum:['User','Driver','Admin'],
        required:true
    },
    type:{
        type:String,
        required:true
    },
     message:{
        type:String,
          required:true
    },
     read:{
        type:Boolean,
        default:false
    }
}, {
    timestamps: true
})


const Notification = mongoose.model('Notification', notificationSchema)

exports.module = NotificationSchema