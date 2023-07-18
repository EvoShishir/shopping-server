const Product = require("../models/productModel");

const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create({
      ...req.body,
      image: req.file.filename,
    });
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createProduct;
