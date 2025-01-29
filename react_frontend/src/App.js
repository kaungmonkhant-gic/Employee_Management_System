import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css"; // Custom styles

function App() {
  return (
    <Container fluid className="app-container">
      <Row className="vh-100 d-flex align-items-center justify-content-center text-center">
        <Col md={8} lg={6} className="p-4">
          {/* Heading Section */}
          <h1 className="display-4 fw-bold text-dark">
            Welcome to{" "}
            <span className="text-primary">Employee Management System</span>
          </h1>
          <p className="lead text-muted">
            A smart way to manage  employees efficiently.
          </p>

          {/* Button Section */}
          <div className="mt-4">
            <Link to="/login">
              <Button className="custom-btn" size="lg">
                Go to Login
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
