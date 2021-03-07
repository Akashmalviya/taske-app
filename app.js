const createError = require("http-errors");
const express = require("express");
const app = express();
const cors = require('cors');
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*:*",
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
  },
  allowEIO3: true,
});
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fs = require("fs");
const swaggerUi = require("swagger-ui-express"),
  YAML = require("yamljs");
require("./db/mongoose");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const driverRouter = require("./routes/driver");
const vechileRouter = require("./routes/vehicle");
const tripRouter = require("./routes/trip");
const DriverSchema = require("./models/driverSchema");
const TripSchema = require("./models/tripSchema");
const getDistanceFromLatLonInKm = require("./middeleware/DistanceBetweenTwoPoints");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// require("./middeleware/cros")(app);

const allowedOrigins = [
  'capacitor://localhost',
  'ionic://localhost',
  'http://localhost',
  'http://localhost:8080',
  'http://localhost:8100',
  
];

// Reflect the origin if it's in the allowed list or not defined (cURL, Postman, etc.)
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS'));
    }
  }
}

// Enable preflight requests for all routes
app.options('*', cors(corsOptions));



/**
 * Swagger API Doc
 */


app.use("/api/index", indexRouter);
app.use("/api/user", cors(corsOptions), usersRouter);
app.use("/api/driver", cors(corsOptions), driverRouter);
app.use("/api/trip", cors(corsOptions), tripRouter);
//app.use('/category',vechileRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.io = io.sockets.on("connection", (socket) => {
  // Everytime a client logs in, display a connected message
  console.log("Server-Client Connected!", socket.id);

  socket.on("join", (room) => {
    socket.join(room);
  });

  socket.on("connected", () => {
    //listen to event at anytime (not only when endpoint is called);
    //execute some code here;
    console.log("connected");
  });

  socket.on("JoinOrderTrackingRoom", (TripId) => {
    socket.join(TripId);
  });

  socket.on(
    "updateDriverCurrentLocation",
    async ({ tripId, driverId, driverCoordinates }) => {
      let driver = await DriverSchema.findByIdAndUpdate(
        driverId,
        { location: driverCoordinates },
        { new: true }
      );
      let trip = await TripSchema.findById(tripId);

      let distance = getDistanceFromLatLonInKm(
        trip.pickuplocation.coordinates,
        driverCoordinates.coordinates
      );

      if (distance < 0.2) {
        //excute nearby code

        io.to(tripId).emit("driverCurrentLocation", {
          driverCoordinates,
          isArrived: true,
          message: "Driver is nearby you",
        });
      } else
       { io.to(tripId).emit("driverCurrentLocation", {
          driverCoordinates,
          isArrived: false,
          message: `Driver is ${distance.toFixed(2)}KM away`,
        });}
    }
  );

  socket.on(
    "driverIsPickUpArrived",
    async ({ tripId, driverId, driverCoordinates }) => {
      let trip = await TripSchema.findByIdAndUpdate(
        tripId,
        { isPickUpArrived: true , tripStatus: tripEnum[2] , pickUpOtp : generateOtp() },
        { new: true }
      );
      io.to(tripId).emit("driverIsPickUpArrived", { trip , makePyament : true });
    }
  );

  socket.on("orderTracking", async ({ tripId, driverId, driverCoordinates })=>{
 let driver = await DriverSchema.findByIdAndUpdate(
        driverId,
        { location: driverCoordinates },
        { new: true }
      );
  let trip = await TripSchema.findByIdAndUpdate(tripId , {currentlocation : driverCoordinates});

      let distance = getDistanceFromLatLonInKm(
        trip.dropuplocation.coordinates,
        driverCoordinates.coordinates
      );

      if (distance < 0.5) {
        //excute nearby code

        io.to(tripId).emit("driverCurrentLocation", {
          driverCoordinates,
          isArrivedDropOff: true,
          message: "Driver is nearby you",
        });
      } else
       { io.to(tripId).emit("driverCurrentLocation", {
          driverCoordinates,
          isArrivedDropOff: false,
          message: `Driver is ${distance.toFixed(2)}KM away`,
        });}
    
  })
});

module.exports = server;
