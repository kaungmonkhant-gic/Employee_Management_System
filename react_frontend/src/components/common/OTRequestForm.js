import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import apiClient from "../api/apiclient";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

const OvertimeRequestForm = ({ checkInTime }) => { // assuming checkInTime is passed as a prop
  const [formData, setFormData] = useState({
    id: "",
    employeeName: "",
    date: "",
    startTime: "",
    endTime: "",
    otTime: "",
    reason: "",
    managerName: "",
    errorMessage: "",
  });
  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate that overtime start time is not earlier than check-in time
  const validateOvertime = () => {
    const { startTime } = formData;

    if (startTime && checkInTime) {
      const overtimeStart = new Date(`1970-01-01T${startTime}:00`);
      const checkIn = new Date(`1970-01-01T${checkInTime}:00`);

      if (overtimeStart < checkIn) {
        return "Overtime start time cannot be earlier than check-in time.";
      }
    }
    return ""; // No error
  }
  // Calculate duration based on startTime and endTime
  useEffect(() => {
    const error = validateOvertime();
    setFormData((prevData) => ({
      ...prevData,
      errorMessage: error,
    }));

    if (formData.startTime && formData.endTime && !error) {
      const start = new Date(`1970-01-01T${formData.startTime}:00`);
      const end = new Date(`1970-01-01T${formData.endTime}:00`);

      if (end >= start) {
        const otTimeInMinutes = (end - start) / 1000 / 60;
        setFormData((prevData) => ({
          ...prevData,
          otTime: `${otTimeInMinutes} min`,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          otTime: "Invalid Time Range",
        }));
      }
    }
  }, [formData.startTime, formData.endTime, checkInTime]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateOvertime();
    if (validationError) {
      alert(validationError);
      return;
    }

    try {
      console.log("Submitting Overtime Request:", formData);

      // Using ApiClient to submit the overtime request
      const response = await apiClient.post("/ot/submit", formData); // ApiClient handles the base URL

      console.log("Overtime request submitted successfully:", response);

      // Clear the form upon successful submission
      setFormData({
        date: "",
        startTime: "",
        endTime: "",
        otTime: "",
        reason: "",
        errorMessage: "",
      });

      alert("Overtime request submitted successfully.");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit the request. Please try again later.");
    }
  };
  
  // Handle cancel button
  const handleCancel = () => {
    setFormData({
      
      date: "",
      startTime: "",
      endTime: "",
      otTime: "",
      reason: "",
      errorMessage: "",
    });
  };

  return (
    <Card className="shadow-lg">
      {/* <Card.Header className="text-white text-center" style={{ backgroundColor: "#001F3F" }}>
        <h3 className="mb-0">Overtime Request Form</h3>
      </Card.Header> */}
      <Card.Body className="p-5">
        <Form onSubmit={handleSubmit}>
          
          {/* Overtime Date */}
          <Form.Group as={Row} className="mb-3 align-items-center">
            <Form.Label column sm={4} className="text-muted">
              Overtime Date:
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </Col>
          </Form.Group>

          {/* Start Time */}
          <Form.Group as={Row} className="mb-3 align-items-center">
            <Form.Label column sm={4} className="text-muted">
              Start Time:
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                required
              />
            </Col>
          </Form.Group>

          {/* End Time */}
          <Form.Group as={Row} className="mb-3 align-items-center">
            <Form.Label column sm={4} className="text-muted">
              End Time:
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                required
              />
            </Col>
          </Form.Group>

          {/* Duration */}
          <Form.Group as={Row} className="mb-3 align-items-center">
            <Form.Label column sm={4} className="text-muted">
              Overtime Duration:
            </Form.Label>
            <Col sm={8}>
              <Form.Control type="text" name="otTime" value={formData.otTime} readOnly />
            </Col>
          </Form.Group>

          {/* Reason */}
          <Form.Group as={Row} className="mb-3 align-items-center">
            <Form.Label column sm={4} className="text-muted">
              Reason:
            </Form.Label>
            <Col sm={8}>
              <Form.Control
                as="textarea"
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                rows={3}
                required
              />
            </Col>
          </Form.Group>

          {/* Error Message */}
          {formData.errorMessage && (
            <Row className="mb-3">
              <Col sm={12} className="text-danger text-center">
                {formData.errorMessage}
              </Col>
            </Row>
          )}

          {/* Submit and Cancel Buttons */}
          <div className="d-flex justify-content-end mt-4">
            <Button type="submit" className="me-2" style={{ backgroundColor: "#001F3F" }}>
              Submit
            </Button>
            <Button variant="outline-secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default OvertimeRequestForm;
