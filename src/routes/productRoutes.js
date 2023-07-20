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

router
  .route("/create-product")
  .post(multerUpload.single("image"), createProduct);

router
  .route("/update-product/:id")
  .put(multerUpload.single("image"), updateProductById);

router.route("/all-products").get(getProducts);
router.route("/all-products/:id").get(getSingleProduct);
router.route("/:categoryName").get(getProductsByCategory);

router.route("/delete-product/:id").delete(deleteProduct);

module.exports = router;
