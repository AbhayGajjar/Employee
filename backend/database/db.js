const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/employee_CRUD")
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });

module.exports = mongoose;
