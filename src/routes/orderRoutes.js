const express = require("express");
const {
  placeOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getUserOrders,
} = require("../controllers/orderController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const router = express.Router();

router.route("/create").post(auth, placeOrder);
router.route("/all").get([auth, admin], getAllOrders);
router.route("/my").get(auth, getUserOrders);
router.route("/:id").get(auth, getOrderById);
router.route("/update/:id").put([auth, admin], updateOrderStatus);

module.exports = router;
