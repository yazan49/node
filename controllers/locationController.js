const Location = require("../models/Location"); // Import the model

exports.saveLocation = async (req, res) => {
  const { lat, long, speed, accuracy, speedAccuracy, time } = req.body;

  if (!lat || !long) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newLocation = await Location.create({
      lat,
      long,
      speed,
      accuracy,
      speedAccuracy,
      time,
    });

    return res.status(200).json({
      status: "ok",
      message: "Location Save Successfully",
      data: { lat, long, time },
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
