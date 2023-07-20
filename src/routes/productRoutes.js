const express = require("express");
const router = express.Router();
const multerUpload = require("../config/multerConfig");

const {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProductById,
  deleteProduct,
  getProductsByCategory,
} = require("../controllers/productController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router
  .route("/create")
  .post(multerUpload.single("image"), [auth, admin], createProduct);

router
  .route("/update/:id")
  .put(multerUpload.single("image"), [auth, admin], updateProductById);

router.route("/all").get(getProducts);
router.route("/:id").get(getSingleProduct);
router.route("/category/:categoryName").get(getProductsByCategory);

router.route("/delete/:id").delete([auth, admin], deleteProduct);

module.exports = router;
