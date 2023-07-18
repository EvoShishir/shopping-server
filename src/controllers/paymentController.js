const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const makePayment = async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount * 100,
    currency: "usd",
    payment_method_types: ["card"],
  });

  console.log(paymentIntent);

  res.send({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
};

module.exports = makePayment;
