import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./LoginForm.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 

  const validate = () => {
    const newErrors = {};

    // Username validation for gmail.com format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!username) newErrors.username = "Username is required.";
    else if (!emailPattern.test(username))
      newErrors.username = "Please enter a valid Gmail address.";

    // Password validation
    if (!password) newErrors.password = "Password is required.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log("Username:", username);
      console.log("Password:", password);

      navigate("/admin-dashboard");
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username (Gmail)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`input ${errors.username ? "input-error" : ""}`}
            />
            {errors.username && (
              <div className="error-message">{errors.username}</div>
            )}
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`input ${errors.password ? "input-error" : ""}`}
            />
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>

          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
