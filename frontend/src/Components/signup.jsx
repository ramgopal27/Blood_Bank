import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/signup.css";

const initialFormData = {
  role: "user", // 'user' or 'admin'
  fullName: "",
  dob: "",
  gender: "",
  contactNumber: "",
  city: "",
  state: "",
  zipCode: "",
  bloodGroup: "",
  weight: "",
  lastDonation: "",
  medicalConditions: "",
  medications: "",
  email: "",
  password: "",
  confirmPassword: "",
  emergencyName: "",
  emergencyPhone: "",
  idProof: null,
  agreeTerms: false,
};

export default function Signup() {
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const { role, email, password, confirmPassword } = formData;
    if (!email || !password || !confirmPassword) {
      setAlertMessage("Please fill all required fields.");
      return false;
    }
    if (password !== confirmPassword) {
      setAlertMessage("Passwords do not match.");
      return false;
    }

    if (role === "user") {
      if (
        !formData.fullName ||
        !formData.dob ||
        !formData.gender ||
        !formData.contactNumber
      ) {
        setAlertMessage("Please fill all required user fields.");
        return false;
      }
      if (!formData.agreeTerms) {
        setAlertMessage("You must agree to the terms and conditions.");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      let endpoint =
        formData.role === "admin" ? "/admin/register" : "/user/register";
      const payload = formData.role === "user" ? new FormData() : {};

      if (formData.role === "user") {
        for (const key in formData) {
          if (formData[key] !== null) payload.append(key, formData[key]);
        }
      } else {
        payload.email = formData.email;
        payload.password = formData.password;
      }

      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: "POST",
        body: formData.role === "user" ? payload : JSON.stringify(payload),
        headers:
          formData.role === "admin"
            ? { "Content-Type": "application/json" }
            : {},
      });

      const data = await response.json();
      if (!response.ok) {
        setAlertMessage(data.message || "Registration failed.");
      } else {
        setAlertMessage("Registered successfully");
        setFormData(initialFormData);
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setAlertMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="signup-card">
      <h2 className="card-title">Signup</h2>
      {alertMessage && <p className="alert">{alertMessage}</p>}

      {/* Role Selector */}
      <div className="role-group">
        <label className="role-option">
          <input
            type="radio"
            name="role"
            value="user"
            checked={formData.role === "user"}
            onChange={handleChange}
          />
          User
        </label>

        <label className="role-option">
          <input
            type="radio"
            name="role"
            value="admin"
            checked={formData.role === "admin"}
            onChange={handleChange}
          />
          Admin
        </label>
      </div>

      <form onSubmit={handleSubmit}>
        {/* User fields */}
        {formData.role === "user" && (
          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="inputbox">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <span>Full Name</span>
            </div>
            <div className="inputbox">
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
              <span>Date of Birth</span>
            </div>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                />{" "}
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                />{" "}
                Female
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={formData.gender === "other"}
                  onChange={handleChange}
                />{" "}
                Other
              </label>
            </div>
            <div className="inputbox">
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <span>Contact Number</span>
            </div>
            <div className="inputbox">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder=" "
              />
              <span>City</span>
            </div>
            <div className="inputbox">
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder=" "
              />
              <span>State</span>
            </div>
            <div className="inputbox">
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder=" "
              />
              <span>ZIP Code</span>
            </div>

            <h3>Medical & Blood Information</h3>
            <div className="inputbox">
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                required
              >
                <option value="">Select blood type</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
            <div className="inputbox">
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder=" "
              />
              <span>Weight (kg)</span>
            </div>
            <div className="inputbox">
              <input
                type="date"
                name="lastDonation"
                value={formData.lastDonation}
                onChange={handleChange}
              />
              <span>Last Donation Date (if applicable)</span>
            </div>
            <div className="inputbox">
              <textarea
                name="medicalConditions"
                value={formData.medicalConditions}
                onChange={handleChange}
                placeholder=" "
                rows="2"
              ></textarea>
              <span>Medical Conditions / Recent Surgeries</span>
            </div>
            <div className="inputbox">
              <textarea
                name="medications"
                value={formData.medications}
                onChange={handleChange}
                placeholder=" "
                rows="2"
              ></textarea>
              <span>Medications / Allergies</span>
            </div>

            <h3>Emergency Contact & ID</h3>
            <div className="inputbox">
              <input
                type="text"
                name="emergencyName"
                value={formData.emergencyName}
                onChange={handleChange}
                placeholder=" "
              />
              <span>Contact Name</span>
            </div>
            <div className="inputbox">
              <input
                type="text"
                name="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={handleChange}
                placeholder=" "
              />
              <span>Contact Phone</span>
            </div>
            <div className="inputbox">
              <input type="file" name="idProof" onChange={handleChange} />
              <span>ID Proof (Optional)</span>
            </div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
              />
              <label>I agree to the Terms of Service and Privacy Policy</label>
            </div>
          </div>
        )}

        {/* Email & Password Fields (common for both roles) */}
        <h3 className="section-title">Login Credentials</h3>

        <div className="form-field">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>Email</label>
        </div>

        <div className="form-field">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>Password</label>
        </div>

        <div className="form-field">
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder=" "
          />
          <label>Confirm Password</label>
        </div>

        <button type="submit" className="form-btn">
          Register
        </button>
      </form>
    </div>
  );
}
