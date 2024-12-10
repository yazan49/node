const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/AuthRoutes");
const dbConnect = require("./config/db");

dbConnect();

app.use("/auth", authRoutes);

app.listen(5001, () => {
  console.log("Server running on 5001");
});
