import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeOvertime = () => {
  // State for overtime form inputs
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");
  const [reason, setReason] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // State for overtime records
  const [overtimeRecords, setOvertimeRecords] = useState([]);

  useEffect(() => {
    fetchEmployeeOvertimeRecords();
  }, []);

  // Sample data fetching (replace with actual API call)
  const fetchEmployeeOvertimeRecords = () => {
    const records = [
      {
        id: 1,
        date: "2025-02-10",
        hours: 3,
        reason: "Project deadline",
        status: "Approved",
      },
      {
        id: 2,
        date: "2025-02-12",
        hours: 2,
        reason: "Team meeting preparation",
        status: "Pending",
      },
      {
        id: 3,
        date: "2025-02-08",
        hours: 4,
        reason: "System upgrade",
        status: "Rejected",
      },
    ];
    setOvertimeRecords(records);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !hours || !reason) {
      alert("All fields are required!");
      return;
    }

    // Simulate API call (replace with actual API integration)
    const newRecord = {
      id: overtimeRecords.length + 1,
      date,
      hours,
      reason,
      status: "Pending",
    };

    // Add new record to the list
    setOvertimeRecords([...overtimeRecords, newRecord]);

    // Show success message and clear the form
    setSuccessMessage("Your overtime request has been submitted successfully!");
    setDate("");
    setHours("");
    setReason("");
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Employee Overtime Management</h1>

      {/* Overtime Request Form */}
      <div className="card mb-4">
        <div className="card-header">
          <h2 className="card-title mb-0">Submit Overtime Request</h2>
        </div>
        <div className="card-body">
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {/* Date Input */}
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date of Overtime
              </label>
              <input
                type="date"
                id="date"
                className="form-control"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>

            {/* Hours Input */}
            <div className="mb-3">
              <label htmlFor="hours" className="form-label">
                Overtime Hours
              </label>
              <input
                type="number"
                id="hours"
                className="form-control"
                min="1"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                required
              />
            </div>

            {/* Reason Input */}
            <div className="mb-3">
              <label htmlFor="reason" className="form-label">
                Reason for Overtime
              </label>
              <textarea
                id="reason"
                className="form-control"
                rows="4"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary">
              Submit Request
            </button>
          </form>
        </div>
      </div>

      {/* Overtime Records Section */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title mb-0">My Overtime Records</h2>
        </div>
        <div className="card-body">
          {overtimeRecords.length > 0 ? (
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>Date</th>
                  <th>Hours</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {overtimeRecords.map((record) => (
                  <tr key={record.id}>
                    <td>{record.date}</td>
                    <td>{record.hours}</td>
                    <td>{record.reason}</td>
                    <td>
                      <span
                        className={`badge ${
                          record.status === "Pending"
                            ? "bg-warning"
                            : record.status === "Approved"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No overtime records found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeOvertime;
