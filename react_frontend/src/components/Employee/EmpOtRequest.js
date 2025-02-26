import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ClockFill, FileTextFill } from "react-bootstrap-icons";

const EmpOtRequestForm = () => {
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    duration: "",
    reason: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/overtime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Overtime request submitted successfully.");
        setFormData({ date: "", startTime: "", endTime: "", duration: "", reason: "" });
        setShowModal(false);
      } else {
        alert("Failed to submit the request.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit the request.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="d-flex align-items-center p-3 border rounded shadow-sm bg-white">
            <ClockFill size={32} color="blue" />
            <div className="ms-3">
              <p className="text-muted mb-1">Total OT Requests</p>
              <p className="fw-bold mb-0">5</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="d-flex align-items-center p-3 border rounded shadow-sm bg-white">
            <FileTextFill size={32} color="green" />
            <div className="ms-3">
              <p className="text-muted mb-1">Approved Requests</p>
              <p className="fw-bold mb-0">3</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 border rounded shadow-sm bg-white">
        <h5 className="mb-3">Overtime Request</h5>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Apply for Overtime
        </Button>
      </div>

      {/* Overtime Request Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Overtime Request Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Start Time</label>
              <input type="time" name="startTime" value={formData.startTime} onChange={handleInputChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">End Time</label>
              <input type="time" name="endTime" value={formData.endTime} onChange={handleInputChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Duration (in hours)</label>
              <input type="number" name="duration" value={formData.duration} onChange={handleInputChange} className="form-control" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Reason</label>
              <textarea name="reason" value={formData.reason} onChange={handleInputChange} className="form-control" required />
            </div>
            <Button variant="success" type="submit">Submit Request</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EmpOtRequestForm;
