const express = require("express");
const router = express.Router();

const {
  createReview,
  getProductReviews,
} = require("../controllers/reviewController");
const auth = require("../middleware/auth");

router.route("/create/:id").post(auth, createReview);
router.route("/:id").get(getProductReviews);

module.exports = router;
