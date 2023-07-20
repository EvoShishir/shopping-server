const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_CONNECTION_STRING)
    .then(() => console.log("Connected to database"))
    .catch((error) => console.error("Connection to database failed", error));
};

module.exports = connectDatabase;
