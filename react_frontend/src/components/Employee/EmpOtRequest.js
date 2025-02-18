import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeOvertimeRequestForm = () => {
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [reason, setReason] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !duration || !startTime || !endTime || !reason) {
      alert("All fields are required!");
      return;
    }

    const requestData = {
      date,
      duration,
      startTime,
      endTime,
      reason,
      status: "Pending",
    };
    console.log("Overtime Request Submitted:", requestData);

    setSuccessMessage("Your overtime request has been submitted successfully!");
    setDate("");
    setDuration("");
    setStartTime("");
    setEndTime("");
    setReason("");
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Overtime Request Form</h2>

      {successMessage && (
        <div className="alert alert-success text-center" role="alert">
          {successMessage}
        </div>
      )}

      <div className="card shadow-sm border-0 rounded-3" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            {/* Date Field */}
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date of Overtime
              </label>
              <input
                type="date"
                id="date"
                className="form-control rounded-2"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            {/* Duration Field */}
            <div className="mb-3">
              <label htmlFor="duration" className="form-label">
                Duration (Hours)
              </label>
              <input
                type="number"
                id="duration"
                className="form-control rounded-2"
                min="1"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </div>

            {/* Start Time Field */}
            <div className="mb-3">
              <label htmlFor="startTime" className="form-label">
                Start Time
              </label>
              <input
                type="time"
                id="startTime"
                className="form-control rounded-2"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>

            {/* End Time Field */}
            <div className="mb-3">
              <label htmlFor="endTime" className="form-label">
                End Time
              </label>
              <input
                type="time"
                id="endTime"
                className="form-control rounded-2"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>

            {/* Reason Field */}
            <div className="mb-3">
              <label htmlFor="reason" className="form-label">
                Reason for Overtime
              </label>
              <textarea
                id="reason"
                className="form-control rounded-2"
                rows="3"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-100 rounded-2"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeOvertimeRequestForm;
