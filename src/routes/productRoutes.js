const express = require("express");
const router = express.Router();
const multerUpload = require("../config/multerConfig");

const {
  createProduct,
  getProducts,
  updateProductById,
  deleteProduct,
} = require("../controllers/productController");

router
  .route("/create-product")
  .post(multerUpload.single("image"), createProduct);
router.get("/all-products", getProducts);
router.route("/update-product/:id").put(updateProductById);
router.route("/delete-product/:id").delete(deleteProduct);

module.exports = router;
