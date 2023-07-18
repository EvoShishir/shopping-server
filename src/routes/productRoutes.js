const express = require("express");
const router = express.Router();
const createProduct = require("../controllers/productController");
const multerUpload = require("../config/multerConfig");

router
  .route("/create-product")
  .post(multerUpload.single("image"), createProduct);

module.exports = router;
