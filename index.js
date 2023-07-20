require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

const connectDatabase = require("./src/db/databaseConnection");
const errorCatcherMiddleware = require("./src/middleware/errorCatcher");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const category = require("./src/routes/categoryRoutes");
const products = require("./src/routes/productRoutes");
const payment = require("./src/routes/paymentRoutes");
const users = require("./src/routes/userRoutes");

//connecting the database
connectDatabase();

//get the saved image from this route
app.use("/images", express.static(path.join(__dirname, "src/uploads")));

//other routes that will handle different operations
app.use("/categories", category);
app.use("/products", products);
app.use("/payment", payment);
app.use("/users", users);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`running in port ${port}`);
});

app.use(errorCatcherMiddleware);
