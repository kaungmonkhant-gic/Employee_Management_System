import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserService from "../services/UserService";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); // State to store validation errors
  const [error, setError] = useState(""); // State for general server errors

  const navigate = useNavigate();

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!username) newErrors.username = "Username is required.";
    else if (!emailPattern.test(username))
      newErrors.username = "Enter a valid Gmail address.";

    if (!password) newErrors.password = "Password is required.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="text-center">Welcome Back</h2>
            <p className="text-center text-muted">Please login to your account</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter your Gmail"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`form-control ${errors.username ? "is-invalid" : ""}`}
                />
                {errors.username && (
                  <div className="invalid-feedback">{errors.username}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>

              {error && (
                <div className="alert alert-danger text-center">{error}</div>
              )}

              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>
            </form>
            <div className="text-center mt-3">
              <Link to="/forgot-password" className="text-decoration-none">
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;