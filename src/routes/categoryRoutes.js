const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");

router.route("/create").post([auth, admin], createCategory);
router.route("/all").get(getCategories);
router.route("/update/:id").put([auth, admin], updateCategory);
router.route("/delete/:id").delete([auth, admin], deleteCategory);

module.exports = router;
