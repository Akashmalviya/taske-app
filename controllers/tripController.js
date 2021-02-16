const Trip = require('../models/tripSchema')
const User = require('../models/userSchema')
const Driver = require('../models/driverSchema')
const AppError = require('../middeleware/AppError');
// const defaultResponseObject = {
//     success: true,
//     data: null, //{},[] or null
//     message: "",
//     error: null,
//   };


//create A TRIP
exports.createtrip = async(req,res,next) =>{
    try{
        const userID = req.params.userid

        const user = User.findById(userID)
        console.log(user)
        const trip = await Trip.create({
            dropup: req.body.dropupaddress,
            pickup: req.body.pickupaddress,
           // pickuplocation:req.body.pickuplocation,
            tripStatus:'pending',
            userid:userID

        })
        console.log(trip)
        if(!trip){
            res.status(400).json({
                status:'unsuccess'
            })
        }
        res.status(201).json({
            status:'success',
            trip
        })
        

    }catch(e){
        res.status(400).send('something went wrong')
    }

}

// view all trip
exports.getalltrip = async(req,res,next)=>{
    try{
    const alltrips = await Trip.find({})

    if(!alltrips){
        res.status(400).send('something went wrong')
    }
    res.status(200).json({
        status:'success',
        alltrips
    });
    }catch(e){
        res.status(400).send(e)
    }
}

//get a trip by id
exports.gettrip = async(req,res,next)=>{
    try{
        const tripid = req.params._id
        const gettrip = await Trip.findById(tripid)

        if(!gettrip){
            res.status(400).json({
                status:'fail'
            })
        }
            res.status(200).json({
                status:'success',
                gettrip
            })

    }catch(e){
        res.status(400).send(e)
    }
}

//cancel trip 

exports.canceltrip = async(req,res,next) => {
    try{
    const tripid = req.params._id
    const check = await Trip.findById(tripid)
    
    if(!check){
        return next(new AppError('no trip found' , 404))
    }
    const result = await Trip.findByIdAndUpdate(tripid,{status : 'cancel'},{new:true})
    res.status(201).json({
        status:'sucess',
        result
    })
    }catch(e){
        res.status(400).send(e)
    }

};

//to change destination of trip

exports.changedestination = async(req,res,next) => {
    try{
    const dropuplocation = req.body.dropuplocation;
    if(!dropuplocation){
        return next(new AppError('give a valid destination'),404);
    }
    const tripId = req.params._id;
    const check = await Trip.findById(tripId)

    if(!check){
        return next(new AppError('no trip found'),404);
    }
    const result = await Trip.update(
        {dropuplocation:dropuplocation},
        {where : {id: tripId}}
    );
    res.status(200).json({
        status:'success',
        result
    });
    }catch(e){
        res.send(e)
    }
};

//to change the present location

exports.changepresentlocation = async(req,res,next)=>{
    try{
    const presentlocation = req.body.pickuplocation;
    if(!presentlocation){
        return next(new AppError('give a valid location'),404)
    }
    const tripid = req.params._id
    const check = await Trip.findById(tripid)
    if(!check){
        return next(new AppError('no trip found'),404)
    }
    Trip.pickuplocation = presentlocation;
    const updation = await Trip.save();
    res.status(200).json({
        status:'success',
        updation
    });
}catch(e){
    res.status(404).send(e);
}
};

exports.changestatus = async(req,res,next) => {
    try{

    const tripstatus = req.body.status
    console.log(tripstatus)
    if(!tripstatus){
        return next(new AppError('give a valid status'), 404)
    }
    const tripid = req.params._id
    console.log(tripid)
    const result = await Trip.findById(tripid)
    if(!result){
        return next(new AppError('cannot find trip'), 404)
    }
    console.log(result)
    result.tripStatus = tripstatus;
    const updatedstatus = await result.save();
    res.status(200).json({
      status:'success',
      updatedstatus
  });
}catch(e){
    res.status(400).send(e)
}


}