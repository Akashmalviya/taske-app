const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const otpGenerator = require("otp-generator");
const { use } = require("../routes");

const userSchema = new mongoose.Schema({
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
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  moblieNumber: {
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
  otpVerify: {
    type: Number,
    unique: true,
    trim: true,
    default: null,
  },
  user_type: {
    type: String,
    enum: ["admin", "driver", "user"],
    required: true,
    default: "user",
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
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

// userSchema.virtual('tasks', {
//     ref: 'Task',
//     localField: '_id',
//     foreignField: 'owner'
// })

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "thisismynewcourse");

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.statics.findByCredentials = async (moblieNumber) => {
  const user = await User.findOne({ moblieNumber });

  if (!user) {
    const user = new User({ moblieNumber, otpVerify: generateOtp() });
    await user.save();
    return user;
  }
  user.otpVerify = generateOtp();
  return await user.save();
};

userSchema.statics.userOtpVerify = async (id, otp) => {
  const user = await User.findOne({ _id: id, otpVerify: otp });
  if (!user) {throw new Error("User not found");}
  user.otpVerify = null;
  return await user.save();
};

userSchema.statics.verifyPassword = async (id, password) => {
  const user = await User.findById(id)

  if (!user) {
      throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)
  console.log(isMatch)
  console.log(user)

  if (!isMatch) {
      throw new Error('Unable to login')
  }

  return user
}

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

const generateOtp = () => {
  return otpGenerator.generate(4, {
    digits: true,
    alphabets: false,
    specialChars: false,
    upperCase: false,
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
