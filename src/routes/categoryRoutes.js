const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  updateCategory,
} = require("../controllers/categoryController");

router.route("/create-category").post(createCategory);
router.route("/all-categories").get(getCategories);
router.route("/update-category/:id").put(updateCategory);

module.exports = router;
