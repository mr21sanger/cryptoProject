const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/cryptoApp")
  .then(() => {
    console.log("connnection successfull");
  })
  .catch((e) => console.error("Database Error", e));