const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: {
      type: String,
      required: true,
    //   match:
    //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`|}{\[\]\\';:"\/?.><,])(?=.*[a-zA-Z]).{8,20}$/,
    },
    otp: {
      type: Number,
    },
    verified: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const adminModel = mongoose.model("Admin", adminSchema);

module.exports = adminModel;
