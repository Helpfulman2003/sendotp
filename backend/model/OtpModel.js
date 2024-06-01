const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema({
  otp: {
    type: String,
  },
  email: {
    type: String,
  },
  time: {
    type: Date,
    default: Date.now(),
    index: { expires: "60s" },
  },
});

module.exports = mongoose.model("OTP", otpSchema);
