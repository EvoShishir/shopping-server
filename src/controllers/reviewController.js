const { Review } = require("../models/reviewModel");
const { User } = require("../models/userModel");
const { Product } = require("../models/productModel");

const createReview = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Invalid",
      });
    }
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "Product Invalid",
      });
    }
    const review = await Review.create({
      user: user._id,
      product: req.params.id,
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

const getProductReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ product: req.params.id }).populate(
      "user product",
      "name"
    );
    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    next(error);
  }
};

exports.createReview = createReview;
exports.getProductReviews = getProductReviews;
