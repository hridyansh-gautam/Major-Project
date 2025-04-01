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

    // Check if user already exists with same email
    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    // Check if username is taken
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken!" });
    }

    // Create new user
    const newUser = new User({
      firstName, middleName, lastName, username, email, 
      password, userGroup, facilities, facilityGroup,
      phone, address, country, pin, birthDate, gender, 
      race, ethnicity, education, changePasswordNextLogin
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });

  } catch (error) {
    console.error("Error in Register Route:", error);
    
    // More specific error handling
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        message: "Validation error", 
        error: error.message 
      });
    }
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: "Duplicate key error. This username or email may already be in use." 
      });
    }
    
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

    // Find user by email (case insensitive)
    const user = await User.findOne({ 
      email: { $regex: new RegExp(`^${email}$`, 'i') } 
    });
    
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    // Check if user needs to change password
    const needsPasswordChange = user.changePasswordNextLogin;

    // Generate JWT Token
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userGroup: user.userGroup
      }, 
      process.env.JWT_SECRET || "secretkey", 
      { expiresIn: "12h" }
    );

    res.json({ 
      message: "Login successful!", 
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userGroup: user.userGroup,
        changePasswordNextLogin: needsPasswordChange
      }
    });

  } catch (error) {
    console.error("Error in Login Route:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;