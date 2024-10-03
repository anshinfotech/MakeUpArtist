const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    slot: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    confirm: {
      type: Boolean,
      default: false,
      required: true,
    },
    id:{
        type:String,
        unique :true,
        required:true
    }
  },
  {
    timestamps: true,
  }
);

const appointmentModel = mongoose.model("Appointments", appointmentSchema);

module.exports = appointmentModel;
