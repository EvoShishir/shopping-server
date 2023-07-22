const Category = require("../models/categoryModel");

const createCategory = async (req, res, next) => {
  try {
    const category = await Category.create({
      name: req.body.name.toLowerCase(),
    });
    res.status(201).json({
      success: true,
      category,
    });
  } catch (error) {
    next(error);
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort("name");
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

const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      res.status(400).json({
        success: false,
        message: `No category found for id ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Category ${category.name} of id ${category._id} is deleted.`,
    });
  } catch (error) {
    next(error);
  }
};

exports.createCategory = createCategory;
exports.getCategories = getCategories;
exports.updateCategory = updateCategory;
exports.deleteCategory = deleteCategory;
