import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  // Form States
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    userGroup: "Data Entry Staff",
    facilities: [],
    facilityGroup: "",
    lastName: "",
    firstName: "",
    middleName: "",
    address: "",
    phone: "",
    phone2: "",
    email: "",
    county: "",
    birthDate: "",
    language: "",
    race: "",
    gender: "",
    title: "",
    education: "",
    ethnicity: "",
    deceased: false,
    changePasswordNextLogin: false,
  });

  const [passwordStrength, setPasswordStrength] = useState("Weak");
  const [error, setError] = useState("");

  // Facility Options
  const facilityOptions = [
    "Alton Mem Hospital",
    "Creekside Hospital",
    "Green River Medical",
    "JJA-Alton Mem Hospital",
    "Logan Regional Hospital",
    "Mountain View Medical Center",
    "UNKNOWN",
    "Z HT35 Conv.",
  ];

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        facilities: checked
          ? [...prev.facilities, value]
          : prev.facilities.filter((f) => f !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Check password strength
    if (name === "password") {
      const strength = value.length > 8 ? "Strong" : value.length > 5 ? "Medium" : "Weak";
      setPasswordStrength(strength);
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData);
      alert("Signup Successful! Please log in.");
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>
        {/* Profile Section */}
        <fieldset className="profile-section">
          <legend>Profile</legend>

          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />

          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          <span className={`password-strength ${passwordStrength.toLowerCase()}`}>{passwordStrength}</span>

          <label>Confirm Password:</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />

          <label>User Group:</label>
          <select name="userGroup" value={formData.userGroup} onChange={handleChange}>
            <option>Data Entry Staff</option>
            <option>Admin</option>
            <option>Doctor</option>
          </select>
        </fieldset>

        {/* Facility Access */}
        <fieldset className="facility-section">
          <legend>Facility Access</legend>

          {facilityOptions.map((facility, index) => (
            <label key={index}>
              <input
                type="checkbox"
                name="facilities"
                value={facility}
                checked={formData.facilities.includes(facility)}
                onChange={handleChange}
              />
              {facility}
            </label>
          ))}

          <label>Facility Group:</label>
          <input type="text" name="facilityGroup" value={formData.facilityGroup} onChange={handleChange} />
        </fieldset>

        {/* Demographics */}
        <fieldset className="demographics-section">
          <legend>Demographics</legend>

          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />

          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />

          <label>Middle Name:</label>
          <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} />

          <label>Birth Date:</label>
          <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required />

          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">-Blank-</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <label>Race:</label>
          <input type="text" name="race" value={formData.race} onChange={handleChange} />

          <label>Ethnicity:</label>
          <input type="text" name="ethnicity" value={formData.ethnicity} onChange={handleChange} />

          <label>Education:</label>
          <select name="education" value={formData.education} onChange={handleChange}>
            <option value="">[blank]</option>
            <option>High School</option>
            <option>Bachelor's</option>
            <option>Master's</option>
          </select>

          <label>Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>
            <input type="checkbox" name="changePasswordNextLogin" checked={formData.changePasswordNextLogin} onChange={(e) => setFormData({ ...formData, changePasswordNextLogin: e.target.checked })} />
            Require user to change password at next login
          </label>
        </fieldset>

        {/* Buttons */}
        <div className="form-buttons">
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Save</button>
          <button type="button" onClick={() => navigate("/")}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
