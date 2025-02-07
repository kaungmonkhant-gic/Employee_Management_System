import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import UserService from "../../services/UserService";
import { FaEnvelope } from "react-icons/fa";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Validate email input
  const validate = () => {
    const newErrors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!email) newErrors.email = "Email is required.";
    else if (!emailPattern.test(email))
      newErrors.email = "Enter a valid Gmail address.";

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
      const response = await UserService.forgotPassword(email);
      setMessage(response.message);
      setError("");

      // Redirect after success
      setTimeout(() => navigate("/login"), 5000);
    } catch (error) {
      setMessage("");
      setError("Failed to send reset email. Please try again.");
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
            <h2 className="text-center fw-bold mb-3">Forgot Password</h2>
            <p className="text-center text-muted mb-4">
              Enter your email to receive a password reset link.
            </p>

            {message && <Alert variant="success" className="text-center">{message}</Alert>}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={!!errors.email}
                    className="rounded-end"
                  />
                </div>
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              {/* Submit Button */}
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
                Send Reset Link
              </Button>
            </Form>

            {/* Back to Login */}
            <div className="text-center mt-4">
              <Button
                variant="link"
                onClick={() => navigate("/login")}
                className="text-decoration-none text-primary"
              >
                Back to Login
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default ForgotPassword;
