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

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    next(error);
  }
};

const updateProductById = async (req, res, next) => {
  const productId = req.params.id;
  const updateData = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true } // This option returns the updated product instead of the original one
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      res.status(400).json({
        success: false,
        message: `No product found for id ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Product "${product.name}" of id "${product._id}" is deleted.`,
    });
  } catch (error) {
    next(error);
  }
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
exports.updateProductById = updateProductById;
exports.deleteProduct = deleteProduct;
