const Trip = require("../models/tripSchema");
const User = require("../models/userSchema");
const Driver = require("../models/driverSchema");
const AppError = require("../middeleware/AppError");
const { defaultResponseObject } = require("../constants/constants");

//create A TRIP
exports.createtrip = async (req, res, next) => {
  try {
    const userID = req.user._id;

    console.log(userID);
    const trip = await Trip.create({ ...req.body, userID });
    console.log(trip);
    if (!trip) {
      new Error("Something went wrong!!");
    }
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
    const tripId = req.params.tripId;
    const trip = await Trip.findById(tripId);
    if (!trip) {
      new Error("trip not found");
    }

    const [lat, long] = trip.pickuplocation.coordinates;

    const intervalObj = setInterval((call) => {
      console.log("interviewing the interval");
    }, 500);

    const timeoutObj = setTimeout(() => {
      clearInterval(intervalObj);
    }, 20000);
  } catch (e) {}
};



getDriver()



function  getDriver() {
    const findDriver = (lat,long) => new Promise(  (resolve, reject) => {
  const intervalObj = setInterval(async() => {


      let driver = await Driver.aggregate([{
                            $geoNear: {
                                "near": {
                                    type: "Point",
                                    coordinates: [parseFloat(lat), parseFloat(long)]
                                },
                                "maxDistance": 9 * 1000,
                                "query": {
                                    // activeStatus: "1",
                                    // driverStatus: "1",

                                },
                                "distanceField": "distance",
                                "includeLocs": "dist.location",
                                "spherical": true
                            },
                        },
                       
                    ]).sort({
                        distance: 1
                    }).limit(1);
                    console.log("finding driver ");
    if (driver.length !==0 ) {
      clearInterval(intervalObj);
      resolve(driver);
    }
  }, 500);
  const timeoutObj = setTimeout(() => {
    timeLimit = true;
    clearInterval(intervalObj);
    reject("driver not found");
    clearTimeout(timeoutObj)

  }, 2000);
});
    findDriver(14.9734229,78.5554).then(result=>{
        console.log(result)
    }).catch(err=>{
        console.log(err)
    })
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
exports.gettrip = async (req, res, next) => {
  try {
    const tripid = req.params._id;
    const gettrip = await Trip.findById(tripid);

    if (!gettrip) {
      res.status(400).json({
        status: "fail",
      });
    }
    res.status(200).json({
      status: "success",
      gettrip,
    });
  } catch (e) {
    res.status(400).send(e);
  }
};

//cancel trip

exports.canceltrip = async (req, res, next) => {
  try {
    const tripid = req.params._id;
    const check = await Trip.findById(tripid);

    if (!check) {
      return next(new AppError("no trip found", 404));
    }
    const result = await Trip.findByIdAndUpdate(
      tripid,
      { status: "cancel" },
      { new: true }
    );
    res.status(201).json({
      status: "sucess",
      result,
    });
  } catch (e) {
    res.status(400).send(e);
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

exports.changestatus = async (req, res, next) => {
  try {
    const tripstatus = req.body.status;
    console.log(tripstatus);
    if (!tripstatus) {
      return next(new AppError("give a valid status"), 404);
    }
    const tripid = req.params._id;
    console.log(tripid);
    const result = await Trip.findById(tripid);
    if (!result) {
      return next(new AppError("cannot find trip"), 404);
    }
    console.log(result);
    result.tripStatus = tripstatus;
    const updatedstatus = await result.save();
    res.status(200).json({
      status: "success",
      updatedstatus,
    });
  } catch (e) {
    res.status(400).send(e);
  }
};
