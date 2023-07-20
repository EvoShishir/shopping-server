const Category = require("../models/categoryModel");

const createCategory = async (req, res, next) => {
  try {
    const category = await Category.create({
      name: req.body.name.toLowerCase(),
    });
    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name.toLowerCase(),
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
};

exports.createCategory = createCategory;
exports.getCategories = getCategories;
exports.updateCategory = updateCategory;
