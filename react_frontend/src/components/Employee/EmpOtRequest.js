import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EmpOtRequestForm = () => {
  const [formData, setFormData] = useState({
    date: "",
    startTime: "",
    endTime: "",
    duration: "",
    reason: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit to API
    fetch("/api/overtime", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Overtime request submitted successfully.");
        setFormData({
          date: "",
          startTime: "",
          endTime: "",
          duration: "",
          reason: "",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to submit the request.");
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Overtime Request Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Start Time</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">End Time</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Duration (in hours)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Reason</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default EmpOtRequestForm;
