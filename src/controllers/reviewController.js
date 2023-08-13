const { Review } = require("../models/reviewModel");
const { User } = require("../models/userModel");
const { Product } = require("../models/productModel");

const createReview = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.user);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Invalid",
      });
    }
    const product = await Product.findById(req.body.product);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product Invalid",
      });
    }
    const review = await Review.create({
      ...req.body,
    });
    res.status(201).json({
      success: true,
      review,
    });
  } catch (error) {
    next(error);
  }
};

const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find();
    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    next(error);
  }
};

exports.createReview = createReview;
exports.getReviews = getReviews;
