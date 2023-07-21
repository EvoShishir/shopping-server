const Order = require("../models/orderModel");
const { User } = require("../models/userModel");
const { Product } = require("../models/productModel");

const placeOrder = async (req, res, next) => {
  const { products, totalAmount, shipping, paymentMethod } = req.body;

  if (!products || products.length === 0 || !totalAmount || !shipping) {
    return res.status(400).json({
      message:
        "Invalid order data. Please provide products, totalAmount and shipping",
    });
  }

  try {
    const user = await User.findById(req.user._id).select([
      "-role",
      "-password",
      "-createdAt",
      "-updatedAt",
    ]);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid user",
      });
    }
    const newOrder = new Order({
      user,
      products,
      totalAmount,
      shipping,
      paymentMethod,
    });

    const savedOrder = await newOrder.save();

    for (const orderedProduct of products) {
      const product = await Product.findById(orderedProduct.product);

      if (!product) {
        return res.status(404).json({ message: "Product not found." });
      }

      // Subtract the ordered quantity from the product stock
      product.stock -= orderedProduct.quantity;
      await product.save();
    }

    res.status(201).json({
      success: true,
      savedOrder,
    });
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name price");
    res.status(200).json({ orders });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("products.product", "name price");
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json({ order });
  } catch (error) {
    next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    order.status = req.body.status;
    const updatedOrder = await order.save();

    res.status(200).json({ order: updatedOrder });
  } catch (error) {
    next(error);
  }
};

const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user }).populate(
      "products.product",
      "name price"
    );
    res.status(200).json({ orders });
  } catch (error) {
    next(error);
  }
};

exports.placeOrder = placeOrder;
exports.getAllOrders = getAllOrders;
exports.getOrderById = getOrderById;
exports.getUserOrders = getUserOrders;
exports.updateOrderStatus = updateOrderStatus;
