import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./LoginForm.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!username) newErrors.username = "Username is required.";
    else if (!emailPattern.test(username))
      newErrors.username = "Enter a valid Gmail address.";

    if (!password) newErrors.password = "Password is required.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      if (username === "admin@gmail.com" && password === "admin123") {
        navigate("/admin-dashboard");
      } else if (username === "user@gmail.com" && password === "user123") {
        navigate("/employee-dashboard");
      } else {
        setErrors({ general: "Invalid username or password." });
      }
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-form-card">
        <h2>Welcome Back</h2>
        <p>Please login to your account</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter your Gmail"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`input ${errors.username ? "input-error" : ""}`}
            />
            {errors.username && (
              <small className="error-message">{errors.username}</small>
            )}
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`input ${errors.password ? "input-error" : ""}`}
            />
            {errors.password && (
              <small className="error-message">{errors.password}</small>
            )}
          </div>

          {errors.general && (
            <div className="error-message general-error">
              {errors.general}
            </div>
          )}

          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
        <Link to="/forgot-password" className="forgot-password-link">
          Forgot Password?
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
