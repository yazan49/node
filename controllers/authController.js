const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("../models/UserDetails");
const mongoose = require("mongoose");
const User = mongoose.model("UserInfo");

exports.register = async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  if (!email || !password || !firstName || !lastName || !phone) {
    return res.status(400).send({ message: "All fields are required" });
  }

  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return res.status(400).send({
      status: "error",
      message: "User Already Exists",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).send({
      status: "ok",
      message: "User Created Successfully",
      data: newUser,
      token,
    });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send({ message: "User not found!" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send({ message: "Invalid credentials!" });
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  res.status(200).send({
    status: "ok",
    message: "Login Successful",
    data: user,
    token: token,
  });
};
