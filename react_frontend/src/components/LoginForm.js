import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import UserService from "../services/UserService";
import { FaEnvelope, FaLock } from "react-icons/fa";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!username) newErrors.username = "Email is required.";
    else if (!emailPattern.test(username))
      newErrors.username = "Enter a valid Gmail address.";

    if (!password) newErrors.password = "Password is required.";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    setErrors({}); // Clear errors if validation passes
  
    try {
      const userData = await UserService.login(username, password);
      console.log(userData);
  
      if (userData.token && userData.roleName) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("roleName", userData.roleName);
  
        // Navigate based on the role
        switch (userData.roleName.toLowerCase()) {
          case "admin":
            navigate("/admin-dashboard");
            break;
          case "employee":
            navigate("/employee-dashboard");
            break;
          case "manager":
            navigate("/manager-dashboard");
            break;
          default:
            setError("Unknown role. Please contact support.");
        }
      } else {
        setError(userData.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setError("Login failed. Please check your credentials.");
      setTimeout(() => setError(""), 5000);
    }
  };
  
  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, #EAF3FA, #D4E4F2)",
        color: "#3B4A59",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container className="d-flex justify-content-center">
        <Card
          className="shadow-lg p-5 w-100"
          style={{
            maxWidth: "420px",
            borderRadius: "16px",
            background: "#ffffff",
          }}
        >
          <Card.Body>
            <h2 className="text-center fw-bold mb-3">Welcome Back</h2>
            <p className="text-center text-muted mb-4">Sign in to your account</p>

            {error && <Alert variant="danger" className="text-center">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              {/* Email Input */}
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">
                    <FaEnvelope className="text-secondary" />
                  </span>
                  <Form.Control
                    type="text"
                    placeholder="Enter your Gmail"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    isInvalid={!!errors.username}
                    className="rounded-end"
                  />
                </div>
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Password Input */}
              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-0">
                    <FaLock className="text-secondary" />
                  </span>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!errors.password}
                    className="rounded-end"
                  />
                </div>
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Login Button */}
              <Button
                variant="primary"
                type="submit"
                className="w-100 mt-2"
                style={{
                  padding: "12px",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  background: "#007bff",
                  borderColor: "#007bff",
                  transition: "0.3s",
                }}
              >
                Login
              </Button>
            </Form>

            {/* Forgot Password & Sign Up Links */}
            <div className="text-center mt-4">
              <Link to="/forgot-password" className="text-decoration-none text-primary">
                Forgot Password?
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default LoginForm;
