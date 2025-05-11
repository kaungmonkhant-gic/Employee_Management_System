import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import apiClient from "../api/apiclient";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

const OvertimeRequestForm = ({ checkInTime, existingRequests }) => {
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    otTime: "",
    reason: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [previousDuration] = useState("120"); // Example previous OT
  const today = new Date().toISOString().split("T")[0];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Calculate overtime duration based on start and end time
  useEffect(() => {
    if (formData.startTime && formData.endTime) {
      const start = new Date(`1970-01-01T${formData.startTime}:00`);
      const end = new Date(`1970-01-01T${formData.endTime}:00`);

      if (start < end) {
        const diffMinutes = Math.floor((end - start) / (1000 * 60));
        setFormData((prevState) => ({ ...prevState, otTime: diffMinutes.toString() }));
      } else {
        setFormData((prevState) => ({ ...prevState, otTime: "" }));
      }
    } else {
      setFormData((prevState) => ({ ...prevState, otTime: "" }));
    }
  }, [formData.startTime, formData.endTime]);

  const validateOvertime = () => {
    const { date, startTime, endTime, otTime } = formData;
    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay();
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);

    if (!date || !startTime || !endTime || !formData.reason) {
      setErrorMessage("All fields are required.");
      return false;
    }

    if (date < today) {
      setErrorMessage("You cannot select a past date.");
      return false;
    }

    if (start >= end) {
      setErrorMessage("Start time must be before end time.");
      return false;
    }

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const officeStart = new Date("1970-01-01T08:00:00");
      const officeEnd = new Date("1970-01-01T17:00:00");

      if (start >= officeStart && end <= officeEnd) {
        setErrorMessage("Overtime is not allowed during office hours (8 AM - 5 PM).");
        return false;
      }
    }

    if (existingRequests) {
      for (const request of existingRequests) {
        if (request.date === date) {
          const existingStart = new Date(`1970-01-01T${request.startTime}:00`);
          const existingEnd = new Date(`1970-01-01T${request.endTime}:00`);
    
          const newStart = start.getTime();
          const newEnd = end.getTime();
          const existStart = existingStart.getTime();
          const existEnd = existingEnd.getTime();
    
          const isOverlap =
            (newStart >= existStart && newStart < existEnd) || // starts inside
            (newEnd > existStart && newEnd <= existEnd) ||     // ends inside
            (newStart <= existStart && newEnd >= existEnd);    // surrounds existing
    
          if (isOverlap) {
            setErrorMessage("Overlapping overtime request detected.");
            return false;
          }
        }
      }
    }
    
    // Check for duplicate OT duration
    if (otTime === previousDuration) {
      setErrorMessage("Please enter a different OT duration than the previous one.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateOvertime()) return;

    try {
      console.log("Submitting Overtime Request:", formData);
      const response = await apiClient.post("/ot/submit", formData);
      console.log("Overtime request submitted successfully:", response);
      alert("Overtime request submitted successfully.");
      setFormData({
        date: "",
        startTime: "",
        endTime: "",
        otTime: "",
        reason: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit the request. Please try again later.");
    }
  };

  return (
    <Card className="shadow-lg">
      <Card.Body className="p-5">
        <Form onSubmit={handleSubmit}>
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
                min={today}
                required
              />
            </Col>
          </Form.Group>

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

          <Form.Group as={Row} className="mb-3 align-items-center">
            <Form.Label column sm={4} className="text-muted">
              Overtime Duration (Minutes):
            </Form.Label>
            <Col sm={8}>
              <Form.Control type="text" name="otTime" value={formData.otTime} readOnly />
            </Col>
          </Form.Group>

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

          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}

          <div className="d-flex justify-content-end mt-4">
            <Button
              type="submit"
              className="me-2"
              style={{ backgroundColor: "#001F3F", borderColor: "#001F3F" }}
            >
              Submit
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() =>
                setFormData({
                  date: "",
                  startTime: "",
                  endTime: "",
                  otTime: "",
                  reason: "",
                })
              }
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default OvertimeRequestForm;
