const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(
      "mongodb+srv://evoshishir:Atefarmanshishir123@cluster0.fvbztsh.mongodb.net/shopping"
    )
    .then(() => console.log("Connected to database"))
    .catch((error) => console.error("Connection to database failed", error));
};

module.exports = connectDatabase;
