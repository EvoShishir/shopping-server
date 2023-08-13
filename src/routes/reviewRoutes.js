const express = require("express");
const router = express.Router();

const { getReviews, createReview } = require("../controllers/reviewController");

router.route("/create/").post(createReview);
router.route("/all").get(getReviews);

module.exports = router;
