import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/login.css";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const { email, password } = formData;
    if (!email || !password) {
      setAlertMessage("Please fill out all fields");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setAlertMessage("Please enter a valid email");
      return false;
    }
    if (password.length < 6) {
      setAlertMessage("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAlertMessage("");
    if (!validateForm()) return;
    setLoading(true);
    try {
      const endpoint =
        role === "admin"
          ? "http://localhost:8080/admin/login"
          : "http://localhost:8080/user/login";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok)
        setAlertMessage(data.message || "Invalid login credentials");
      else {
        setAlertMessage("Login successfully");
        setFormData({ email: "", password: "" });
        navigate(role === "admin" ? "/admin/dashboard" : "/user/dashboard");
        // console.log("Login successful:", data);
        localStorage.setItem("token", data.token);
      }
    } catch (error) {
      setAlertMessage("An error occurred while logging in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <form onSubmit={handleLogin}>
          {/* Logo */}
          <div className="logo-container">
            <img src="signin.png" alt="logo" className="login-logo" />
          </div>

          {/* Title */}
          <h2 className="login-title">SIGN-IN</h2>

          {/* Alert */}
          {alertMessage && (
            <p
              className={`login-alert ${
                alertMessage === "Login successfully"
                  ? "alert-success"
                  : "alert-error"
              }`}
            >
              {alertMessage}
            </p>
          )}

          {/* Role Selection */}
          <div className="role-group">
            <label>
              <input
                type="radio"
                name="role"
                value="user"
                checked={role === "user"}
                onChange={() => setRole("user")}
              />
              User
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === "admin"}
                onChange={() => setRole("admin")}
              />
              Admin
            </label>
          </div>

          {/* Email input */}
          <div className="input-group">
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

          {/* Password input */}
          <div className="input-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label>Password</label>
            <span
              className="toggle-password"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* Login button */}
          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Signup link */}
          <p className="signup-text">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
