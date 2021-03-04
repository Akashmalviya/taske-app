const Trip = require("../models/tripSchema");
const AppError = require("../middeleware/AppError");
const { defaultResponseObject } = require("../constants/constants");
const DriverSchema = require("../models/driverSchema");
const { tripEnum } = require("../constants/tripstatus");


//create A TRIP
exports.createtrip = async (req, res, next) => {
  try {
    const userID = req.params._id;

    // console.log(userID);
    const trip = await Trip.create({ ...req.body, userID });
    console.log(trip);
    if (!trip)  throw new Error("Something went wrong!!");
    let response = { ...defaultResponseObject };
    response.data = trip;
    res.status(201).send(response);
  } catch (e) {
    let response = { ...defaultResponseObject };
    response.error = e;
    response.success = false;
    res.status(400).send(response);
  }
};

exports.findDriver = async (req, res, next) => {
  try {
    const io = req.app.io
    const tripId = req.params.tripId;
    const trip = await Trip.findById(tripId);
    const [lat, long] = trip.pickuplocation.coordinates;
    let driver = await DriverSchema.findDriverByCoordinate(lat, long)
    //  console.log( "driver ---------------->",driver);

    let newTripData = await Trip.findByIdAndUpdate(tripId, { driverID: driver._id, tripStatus: tripEnum[1] ,tripAcceptedDate:Date.now()}, { new: true })

    io.to(trip.userID).emit('searchDriver', { driver,trip: newTripData});

    let response = { ...defaultResponseObject };
    response.data = newTripData;
    res.status(201).send(response);

  } catch (e) {
    // console.error("error---->", e);
    let response = { ...defaultResponseObject };
    response.error = e.message || e;
    response.success = false;
    res.status(400).send(response);
  }
};

exports.pickUpTripItem = async  (req, res, next) => {
    try {
    const tripId = req.params.tripId;
    const otp  = req.query.otp;
    const trip = await Trip.find({_id :tripId , driverID :req.user._id} , { tripStatus: tripEnum[2] });
    if(!trip) throw new Error("Order not found!!");
    if(otp !== trip.pickUpOtp) throw new Error("Invaild OTP!!")

    let newTripData = await Trip.findByIdAndUpdate(tripId, {tripStatus: tripEnum[3] , pickUpOtpVerfied:true, tripPicupDate :Date.now() }, { new: true })
    io.to(trip.userID).emit('tripEvent', { trip: newTripData , message :"Trip started"});
    let response = { ...defaultResponseObject };
    response.data = newTripData;
    res.status(201).send(response);
    } catch (e) {
    // console.error("error---->", e);
    let response = { ...defaultResponseObject };
    response.error = e.message || e;
    response.success = false;
    res.status(400).send(response);
    }

}



// view all trip
exports.getalltrip = async (req, res, next) => {
  try {
    const alltrips = await Trip.find({});

    if (!alltrips) {
      res.status(400).send("something went wrong");
    }
    res.status(200).json({
      status: "success",
      alltrips,
    });
  } catch (e) {
    res.status(400).send(e);
  }
};

//get a trip by id
exports.viewTripDetails = async (req, res, next) => {
  try {
    const tripid = req.params._id;
    const gettrip = await Trip.findById(tripid);

    if (!gettrip) throw new Error("Order not found!!")

     let response = { ...defaultResponseObject };
    response.data = gettrip;
    res.status(201).send(response);
   
  } catch (e) {
    let response = { ...defaultResponseObject };
    response.error = e.message || e;
    response.success = false;
    res.status(400).send(response);
  }
};

//cancel trip

exports.cancelTrip = async (req, res, next) => {
  try {
    const tripid = req.params._id;
    const check = await Trip.findById(tripid);

    if (!check) throw new Error("Order not found")
    const result = await Trip.findByIdAndUpdate(
      tripid,
      { tripStatus: tripEnum[4]  },
      { new: true }
    );

    let response = { ...defaultResponseObject };
    response.data = result;
    res.status(201).send(response);
   
  } catch (e) {
    // console.error("error---->", e);
    let response = { ...defaultResponseObject };
    response.error = e.message || e;
    response.success = false;
    res.status(400).send(response);
  }
};

//to change destination of trip

exports.changedestination = async (req, res, next) => {
  try {
    const dropuplocation = req.body.dropuplocation;
    if (!dropuplocation) {
      return next(new AppError("give a valid destination"), 404);
    }
    const tripId = req.params._id;
    const check = await Trip.findById(tripId);

    if (!check) {
      return next(new AppError("no trip found"), 404);
    }
    const result = await Trip.update(
      { dropuplocation: dropuplocation },
      { where: { id: tripId } }
    );
    res.status(200).json({
      status: "success",
      result,
    });
  } catch (e) {
    res.send(e);
  }
};

//to change the present location

exports.changepresentlocation = async (req, res, next) => {
  try {
    const presentlocation = req.body.pickuplocation;
    if (!presentlocation) {
      return next(new AppError("give a valid location"), 404);
    }
    const tripid = req.params._id;
    const check = await Trip.findById(tripid);
    if (!check) {
      return next(new AppError("no trip found"), 404);
    }
    Trip.pickuplocation = presentlocation;
    const updation = await Trip.save();
    res.status(200).json({
      status: "success",
      updation,
    });
  } catch (e) {
    res.status(404).send(e);
  }
};

