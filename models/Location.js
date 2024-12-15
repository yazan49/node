const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema(
  {
    lat: Number,
    long: Number,
    speed: Number,
    accuracy: Number,
    speedAccuracy: Number,
    time: String,
  },
  {
    collection: "Location",
    timestamps: true,
  }
);

const Location = mongoose.model("Location", LocationSchema);

module.exports = Location;
