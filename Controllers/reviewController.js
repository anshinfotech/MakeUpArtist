const Review = require("../Models/reviewModel");

const addReview = async (req, res) => {
  const { fname, lname, image, review, starRating } = req.body;
  try {
    const newReview = await Review.create({
      fname,
      lname,
      image,
      review,
      starRating,
    });
    res.status(201).json({ success: true, message: "Review Added", newReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
};

// Read Reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({createdAt:"desc"})
    res.json({ success: true, reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
};

// Update Review
const updateReview = async (req, res) => {
  const { reviewId } = req.params;
  try {
    const review = await Review.findById(
      reviewId,
    );
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    review.show=true
    await review.save()
    res.json({ success: true, message: "Review updated", review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error });
  }
};
module.exports={addReview,updateReview,getAllReviews}