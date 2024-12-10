const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  console.log("qqqqqqqqqq mongo url", process.env.MONGO_URI);

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

module.exports = dbConnect;
