import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { FaEnvelope, FaLock } from "react-icons/fa";
import UserService from "../services/UserService";
function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [hovered, setHovered] = useState(false);
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
      <Container
        style={{
          animation: "fadeIn 1s ease-in-out",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          style={{
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
            padding: "2rem",
            borderRadius: "16px",
            maxWidth: "420px",
            width: "100%",
            transition: "box-shadow 0.3s ease-in-out",
          }}
        >
          <Card.Body>
            <h2 style={{ textAlign: "center", fontWeight: "bold" }}>Welcome Back</h2>
            <p style={{ textAlign: "center", color: "#6c757d" }}>Sign in to your account</p>

            {error && <Alert variant="danger" style={{ textAlign: "center" }}>{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ padding: "0.5rem", background: "#f8f9fa" }}>
                    <FaEnvelope style={{ color: "#6c757d" }} />
                  </span>
                  <Form.Control
                    type="text"
                    placeholder="Enter your Gmail"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    isInvalid={!!errors.username}
                    style={{
                      borderRadius: "0 4px 4px 0",
                      padding: "0.5rem",
                      borderColor: errors.username ? "red" : "#ced4da",
                    }}
                  />
                </div>
                {errors.username && (
                  <div style={{ color: "red", fontSize: "0.875rem" }}>{errors.username}</div>
                )}
              </Form.Group>

              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span style={{ padding: "0.5rem", background: "#f8f9fa" }}>
                    <FaLock style={{ color: "#6c757d" }} />
                  </span>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    isInvalid={!!errors.password}
                    style={{
                      borderRadius: "0 4px 4px 0",
                      padding: "0.5rem",
                      borderColor: errors.password ? "red" : "#ced4da",
                    }}
                  />
                </div>
                {errors.password && (
                  <div style={{ color: "red", fontSize: "0.875rem" }}>{errors.password}</div>
                )}
              </Form.Group>

              <Button
                type="submit"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                  width: "100%",
                  padding: "12px",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  background: hovered ? "#0056b3" : "#007bff",
                  border: "none",
                  transition: "background-color 0.3s ease, transform 0.2s ease",
                  transform: hovered ? "scale(1.05)" : "scale(1)",
                }}
              >
                Login
              </Button>
            </Form>

            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <Link to="/forgot-password" style={{ textDecoration: "none", color: "#007bff" }}>
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