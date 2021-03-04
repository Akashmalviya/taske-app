const otpGenerator = require("otp-generator");

const generateOtp = () => {
  return otpGenerator.generate(4, {
    digits: true,
    alphabets: false,
    specialChars: false,
    upperCase: false,
  });
};


module.exports = generateOtp