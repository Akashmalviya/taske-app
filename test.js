var otpGenerator = require('otp-generator')
const createOtp = () => otpGenerator.generate(4, { digits :true , alphabets :false , specialChars :false , upperCase :false});

 console.log(createOtp())