const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Initialize app first
const app = express();

// Configurations
dotenv.config();
connectDB();

// Middleware - must come before routes
app.use(cors());
app.use(express.json());

// Route imports
const authRoutes = require('./routes/authRoutes');
const facilityRoutes = require('./routes/facilityRoutes');

// Routes - must come after middleware
app.use('/api/auth', authRoutes);
app.use('/api/facilities', facilityRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));