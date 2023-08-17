const express = require("express");
const {
  placeOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getUserOrders,
  checkProductOrder,
} = require("../controllers/orderController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const router = express.Router();

router.route("/create").post(auth, placeOrder);
router.route("/all").get([auth, admin], getAllOrders);
router.route("/my").get(auth, getUserOrders);
router.route("/check-order/:id").get(auth, checkProductOrder);
router.route("/:id").get(auth, getOrderById);
router.route("/update/:id").put([auth, admin], updateOrderStatus);

module.exports = router;
