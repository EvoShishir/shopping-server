const express = require("express");
const makePayment = require("../controllers/paymentController");
const router = express.Router();

router.route("/").post(makePayment);

module.exports = router;
