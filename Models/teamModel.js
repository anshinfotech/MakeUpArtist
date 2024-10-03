const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: [true, "Please provide your first name"],
    },
    lname: {
      type: String,
      required: [true, "Please provide your first name"],
    },
    designation: {
      type: String,
      required: true,
    },
    quote: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const employeeModel = mongoose.model("Employees",employeeSchema)
module.exports=employeeModel;