const { Product } = require("../models/productModel");
const Category = require("../models/categoryModel");

const createProduct = async (req, res, next) => {
  try {
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category Invalid",
      });
    }
    const product = await Product.create({
      ...req.body,
      image: req.file.filename,
    });
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    next(error);
  }
};

const getProductsByCategory = async (req, res, next) => {
  const categoryName = req.params.categoryName.toLowerCase();

  try {
    // Find the category by name
    const category = await Category.findOne({ name: categoryName });

    if (!category) {
      // If the category is not found, return a 404 status
      res.status(404).json({ message: "Category not found." });
    } else {
      // If the category is found, fetch products with the specified category ID
      const products = await Product.find({ category: category._id }).populate(
        "category"
      );

      if (products.length === 0) {
        // No products found for the given category
        res
          .status(404)
          .json({ message: "No products found for the given category." });
      } else {
        res.status(200).json({ products });
      }
    }
  } catch (error) {
    next(error);
  }
};

const getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

const updateProductById = async (req, res, next) => {
  const productId = req.params.id;
  const updateData = req.body;
  const updatedImage = req?.file?.filename;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        ...updateData,
        image: updatedImage,
      },
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
      message: `Product ${product.name} of id ${product._id} is deleted.`,
    });
  } catch (error) {
    next(error);
  }
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
exports.getProductsByCategory = getProductsByCategory;
exports.getSingleProduct = getSingleProduct;
exports.updateProductById = updateProductById;
exports.deleteProduct = deleteProduct;
