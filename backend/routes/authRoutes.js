const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

router.get('/verify-token', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        valid: false, 
        message: 'No token provided' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ 
        valid: false, 
        message: 'User not found' 
      });
    }

    res.json({ 
      valid: true,
      user: {
        id: user._id,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Token verification error:', err);
    
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ 
        valid: false, 
        message: 'Invalid token' 
      });
    }
    
    res.status(500).json({ 
      valid: false, 
      message: 'Server error during verification' 
    });
  }
});

// Register
router.post("/register", async (req, res) => {
  try {
    const { 
      username, password, userGroup, facilities, facilityGroup,
      lastName, firstName, middleName, address, phone, email,
      country, pin, birthDate, race, gender, title, education,
      ethnicity, changePasswordNextLogin
    } = req.body;

    // Validation
    if (!username || !password || !email || !firstName || !lastName) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // Check if user exists by username or email
    const userExists = await User.findOne({ 
      $or: [{ username }, { email }]
    });
    
    if (userExists) {
      return res.status(400).json({ message: "User already exists with this username or email" });
    }

    // Create the user - no need to hash the password here since the User model pre-save hook will do it
    const user = await User.create({ 
      username, password, userGroup, facilities, facilityGroup,
      lastName, firstName, middleName, address, phone, email,
      country, pin, birthDate, race, gender, title, education,
      ethnicity, changePasswordNextLogin
    });

    res.status(201).json({ 
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ 
      message: "Server Error",
      error: error.message 
    });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the input is email or username
    const user = await User.findOne({
      $or: [{ email }, { username: email }]
    });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Use bcrypt.compare for password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "secretkey", { expiresIn: "1h" });

    res.json({ 
      token, 
      user: { 
        id: user._id, 
        name: `${user.firstName} ${user.lastName}`,
        email: user.email, 
        username: user.username,
        userGroup: user.userGroup
      } 
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get current user
router.get("/me", async (req, res) => {
  try {
    // This route would typically use a middleware to verify the JWT token
    // and attach the user ID to the request object
    const userId = req.userId; // This would come from your auth middleware
    
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const user = await User.findById(userId).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userGroup: user.userGroup,
        facilities: user.facilities
      }
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Change password
router.post("/change-password", async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;
    
    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }
    
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    
    // Reset the change password flag
    user.changePasswordNextLogin = false;
    
    await user.save();
    
    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Forgot password
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    // 1. Generate a password reset token
    // 2. Save it to the user record with an expiration
    // 3. Send an email with a reset link
    
    // For this example, we'll just mark that they need to change password
    user.changePasswordNextLogin = true;
    await user.save();
    
    res.json({ message: "Password reset instructions sent to your email" });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;