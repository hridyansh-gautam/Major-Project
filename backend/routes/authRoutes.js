const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// REGISTER ROUTE
router.post("/register", async (req, res) => {
  try {
    const {
      firstName, middleName, lastName, username, email, password,
      userGroup, facilities, facilityGroup, phone, address, country,
      birthDate, gender, race, ethnicity, education, changePasswordNextLogin, pin
    } = req.body;

    if (!firstName || !lastName || !username || !email || !password) {
      return res.status(400).json({ message: "Missing required fields!" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName, middleName, lastName, username, email, 
      password: hashedPassword, userGroup, facilities, facilityGroup,
      phone, address, country, pin, birthDate, gender, 
      race, ethnicity, education, changePasswordNextLogin
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });

  } catch (error) {
    console.error("Error in Register Route:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Both fields are required!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, email: user.email }, 
      process.env.JWT_SECRET || "secretkey", 
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful!", token });

  } catch (error) {
    console.error("Error in Login Route:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
