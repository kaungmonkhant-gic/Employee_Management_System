import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Custom styles

function App() {
  return (
    <Container fluid className="app-container">
      <Row className="vh-100 d-flex align-items-center justify-content-center text-center">
        <Col xs={12} md={8} lg={6} className="p-4">
          <div className="card-container">
            {/* Heading Section with separate lines for animations */}
            <div className="welcome-line">Welcome to</div>
            <div className="employee-system-line">Employee Management System</div>
            
            {/* Description */}
            <p className="lead text-muted">
              A smart way to manage employees efficiently.
            </p>

            {/* Button Section */}
            <div className="mt-4">
              <Link to="/login">
              <button className="pulse-button">
              Login
            </button>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;