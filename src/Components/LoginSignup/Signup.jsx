import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
const Signup = () => {
  const navigate = useNavigate();

  // Form States
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    userGroup: "",
    facilities: [],
    facilityGroup: "",
    lastName: "",
    firstName: "",
    middleName: "",
    address: "",
    phone: "",
    email: "",
    country: "",
    pin: "",
    birthDate: "",
    race: "",
    gender: "",
    title: "",
    education: "",
    ethnicity: "",
    changePasswordNextLogin: false,
  });

  const [passwordStrength, setPasswordStrength] = useState("Weak");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Facility Options
  const facilityOptions = ["KMC Hospital Attavar", "KMC Hospital Mangalore"];

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
      const strength =
        value.length > 8 ? "Strong" : value.length > 5 ? "Medium" : "Weak";
      setPasswordStrength(strength);
    }
  };

    // Handle Phone Number Change
    const handlePhoneChange = (value, name) => {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    // Prepare data for backend (exclude confirmPassword)
    const { confirmPassword, ...dataToSend } = formData;

    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        dataToSend
      );
      alert("Signup Successful! Please log in.");
      navigate("/");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Signup failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>
        {/* Profile Section */}
        <fieldset className="profile-section">
          <legend>Profile</legend>
          <div className="two">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span className={`password-strength ${passwordStrength.toLowerCase()}`}>
              {passwordStrength}
            </span>
          </div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <label>User Group:</label>
          <select
            name="userGroup"
            value={formData.userGroup}
            onChange={handleChange}
          >
            <option value="" disabled>Please select</option>
            <option value="Doctor">Doctor</option>
            <option value="Administrative staff">Administrative staff</option>
            <option value="Support staff">Support Staff</option>
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
          <input
            type="text"
            name="facilityGroup"
            value={formData.facilityGroup}
            onChange={handleChange}
          />
        </fieldset>

        {/* Demographics */}
        <fieldset className="demographics-section">
          <legend>Demographics</legend>

          <div className="two">
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />

            <label>Middle Name:</label>
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />
          </div>

          <div className="two">
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />

            <label>Birth Date:</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="two">
            <label>Gender:</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="" disabled>Please select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Transgender">Transgender</option>
              <option value="Rather not say">Rather not say</option>
            </select>

            <label>Race:</label>
            <input
              type="text"
              name="race"
              value={formData.race}
              onChange={handleChange}
            />

            <label>Ethnicity:</label>
            <input
              type="text"
              name="ethnicity"
              value={formData.ethnicity}
              onChange={handleChange}
            />
          </div>

          <div className="two">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <label>City/State ZIP:</label>
            <input
              type="number"
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              required
            />
          </div>

          <div className="two">
            <label>Country:</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />

            <label>Education:</label>
            <select
              name="education"
              value={formData.education}
              onChange={handleChange}
            >
              <option value="" disabled>Please select</option>
              <option>High School</option>
              <option>Bachelor's</option>
              <option>Master's</option>
            </select>
          </div>

          <div className="two">
            <div className="phoneinp">
              <label>Phone:</label>
              <PhoneInput
                country={"in"}
                value={formData.phone}
                onChange={(value) => handlePhoneChange(value, "phone")}
                inputProps={{ name: "phone", required: true }}
              />
            </div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <label>
            <input
              type="checkbox"
              name="changePasswordNextLogin"
              checked={formData.changePasswordNextLogin}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  changePasswordNextLogin: e.target.checked,
                })
              }
            />
            Require user to change password at next login
          </label>
        </fieldset>

        {/* Buttons */}
        <div className="form-buttons">
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Saved"}
          </button>
          <button type="button" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;