const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  image: {
    type: String,
    default:
      "https://icons.veryicon.com/png/o/internet--web/55-common-web-icons/person-4.png",
  },
  review: { type: String, required: true },
  starRating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  show: { type: Boolean, default: false },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
