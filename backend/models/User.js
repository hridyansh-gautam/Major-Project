const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userGroup: { 
    type: String, 
    enum: ["Data Entry Staff", "Admin", "Doctor"], 
    default: "Data Entry Staff" 
  },
  facilities: { type: [String], default: [] }, // Array of facility names
  facilityGroup: { type: String },
  phone: { type: String },
  birthDate: { type: Date },
  gender: { 
    type: String, 
    enum: ["Male", "Female", "Transgender", "Rather not say"] 
  },
  address: { type: String },
  country: { type: String },
  pin: { type: String }, // Changed from Number to String to accommodate alphanumeric postal codes
  race: { type: String },
  ethnicity: { type: String },
  education: { type: String },
  changePasswordNextLogin: { type: Boolean, default: false },
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;