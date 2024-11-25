const userModel = require("../models/user.mode");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

// Register controller with file upload
const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Debugging request data

    // Validate input fields
    if (
      !username ||
      !email ||
      !password ||
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password using
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate JWT
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token);
    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Failed to register user", error });
  }
};

// Login controller remains the same
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token);
    res.json({
      message: "User logged in successfully",
      user,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Failed to login user", error });
  }
};

module.exports = {
  registerController, // Wrap with multer middleware
  loginController,
};
