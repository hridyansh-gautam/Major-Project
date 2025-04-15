const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const facilityRoutes = require('./routes/facilityRoutes');

// Initialize app first
const app = express();

// Configurations
dotenv.config();
connectDB();

// Middleware - must come before routes
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/facilities', facilityRoutes); // Correct placement

app.get("/", (req, res) => {
  res.send("HiTrack Backend Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));