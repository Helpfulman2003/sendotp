const Otp = require("../model/OtpModel");
const bcrypt = require("bcrypt");

const otpService = {
  insertOtp: async ({ otp, email }) => {
    try {
      const OTP = await Otp.create({
        otp,
        email,
      });
      return OTP ? 1 : 0;
    } catch (error) {
      console.log(error);
    }
  },
  validOtp: async ({ otp, hashOtp }) => {
    const invalid = bcrypt.compareSync(otp, hashOtp);
    return invalid;
  },
};

module.exports = otpService;
