const express = require('express');
const { addReview, getAllReviews, updateReview } = require('../Controllers/reviewController');
const { requireAdminLogin } = require('../Middlewares/middleware');
const router = express.Router();


router.post('/reviews', addReview);
router.get('/reviews', getAllReviews);
router.put('/reviews/:reviewId',updateReview);

module.exports = router;
