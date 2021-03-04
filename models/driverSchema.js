const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const otpGenerator = require("otp-generator");

const driverSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  mobileNumber: {
    type: Number,
    unique: true,
    required: true,
    trim: true,
    validate(value) {
      if (value.toString().length !== 10) {
        throw new Error("Invalid mobile number");
      }
    },
  },
  password: {
    type: String,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  otpVerify: {
    type: Number,
    //  unique: true,
    trim: true,
    default: null,
  },
  //   user_type: {
  //     type: String,
  //     enum: ["admin", "driver", "user"],
  //     required: true,
  //     default: "user",
  //   },
  address: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  country: {
    type: String,
    default: "",
  },
  postalCode: {
    type: String,
    default: "",
  },
  dateOfBirth: {
    type: String,
    default: "",
  },
  driverStatus: {
    type: String, // 0 =  dissapprove , 1 = approve
    default: "pending",
  },
  isAgeEighteen: {
    type: String,
    default: "", // 0 = false  , 1 = true
  },
  ownVehicleStatus: {
    type: String,
    default: "",
  },
  vehicleType: {
    type: String,
    default: "",
  },
  profileCompleted: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error('Password cannot contain "password"');
      }
    },
  },
  location: {
    type: { type: String, default: "Point" },
    coordinates: { type: [Number], index: '2dsphere' }
  },
  drivingLicense: {
    type: String,
    default: "",
  },
  vehicleRegistration: {
    type: String,
    default: "",
  },
  vehicleInsurance: {
    type: String,
    default: "",
  },
  policyNumber: {
    type: String,
    default: "",
  },
  expiryDate: {
    type: String,
    default: "",
  },
  documentStatus: {
    type: Boolean,
    default: false,
  },
  vehicleCapacity: {
    type: Number,
    default: 0,
  },
  fillCapacity: {
    type: Number,
    default: 0,
  },
  remainingCapacity: {
    type: Number,
    default: 0,
  },
  vehicleOccupency: [
    {
      type: Object,
    },
  ],
  activeStatus: {
    type: String, // for user offline or active
    default: "1", // 0 = false  , 1 = true
  },
  offlineTime: {
    type: Date,
    default: "",
  },
  criminalStatus: {
    type: String,
    default: "", // 0 = false  , 1 = true
  },
  preferredWorkArea: {
    type: String,
    default: "",
  },
  preferredWorkingHours: {
    type: String,
    default: "",
  },
  requestFlag: {
    // for manage multiple order request at a time
    type: Boolean,
    default: false,
  },
  tripsCompleted: {
    // count of all delivered order by own
    type: Number,
    default: 0,
  },
  totalEarning: {
    // total earning
    type: Number,
    default: 0,
  },
  Payouts: {
    // paid moeny for order
    type: Number,
    default: 0,
  },
  balanceOutstanding: {
    // available money for order
    type: Number,
    default: 0,
  },
  accountHolderName: {
    type: String,
    default: "",
  },
  accountNumber: {
    type: String,
    default: "",
  },
  BankTransitNumber: {
    type: String,
    default: "",
  },
  BranchName: {
    type: String,
    default: "",
  },
  deletedAt: {
    type: Boolean,
    default: false,
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

// driverSchema.virtual('tasks', {
//     ref: 'Task',
//     localField: '_id',
//     foreignField: 'owner'
// })

driverSchema.methods.generateAuthToken = async function () {
  const driver = this;
  const token = jwt.sign(
    { _id: driver._id.toString(), role: "driver" },
    "thisismynewcourse"
  );

  driver.tokens = driver.tokens.concat({ token });
  await driver.save();

  return token;
};

// driverSchema.pre("save", function (next) {
//   this.password = bcrypt.hashSync(this.password, saltRounds);
//   next();
// });

driverSchema.statics.findByCredentials = async (mobileNumber) => {
  const driver = await DriverSchema.findOne({ mobileNumber });
  const otp = generateOtp()
  //  await sendMessage(otp,mobileNumber)

  if (!driver) {

    const Driver = new DriverSchema({ mobileNumber, otpVerify: otp });
    console.log(Driver);

    let data = await Driver.save();
    console.log('driver--------', data);

    return data

  }




  driver.otpVerify = generateOtp();
  return await driver.save();
};

driverSchema.statics.findDriverByCoordinate = (lat, long) => new Promise((resolve, reject) => {
  const intervalObj = setInterval(async () => {
    let driver = await DriverSchema.aggregate([{
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
    if (driver.length !== 0) {
       resolve(driver[0]);
      clearInterval(intervalObj);
       clearTimeout(timeoutObj)
     
    }
  }, 1000);
  const timeoutObj = setTimeout(() => {
   
    reject("driver not found");
    clearInterval(intervalObj);

    clearTimeout(timeoutObj)

  }, 20000);
});


driverSchema.statics.userOtpVerify = async (id, otp) => {
  const driver = await DriverSchema.findOne({ _id: id, otpVerify: otp });
  if (!driver) { throw new Error("User not found"); }
  driver.otpVerify = null;
  return await driver.save();
};

driverSchema.statics.verifyPassword = async (id, password) => {
  const driver = await DriverSchema.findById(id)

  if (!driver) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, driver.password)
  console.log(isMatch)
  console.log(driver)

  if (!isMatch) {
    throw new Error('Unable to login')
  }

  return driver
}

const generateOtp = () => {
  return otpGenerator.generate(4, {
    digits: true,
    alphabets: false,
    specialChars: false,
    upperCase: false,
  });
};

const DriverSchema = mongoose.model("Driver", driverSchema);

module.exports = DriverSchema;
