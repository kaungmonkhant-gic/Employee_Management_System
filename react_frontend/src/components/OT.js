import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const OvertimeAdminDashboard = () => {
  const [overtimeRequests, setOvertimeRequests] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("All");

  useEffect(() => {
    fetchOvertimeRequests();
  }, []);

  // Sample data fetching (replace with actual API call)
  const fetchOvertimeRequests = () => {
    const requests = [
      { id: 1, employee: "John Doe", date: "2025-02-10", hours: 3, status: "Pending" },
      { id: 2, employee: "Jane Smith", date: "2025-02-05", hours: 5, status: "Approved" },
      { id: 3, employee: "Michael Brown", date: "2025-02-08", hours: 2, status: "Rejected" },
      { id: 4, employee: "Emma Wilson", date: "2025-02-11", hours: 4, status: "Pending" },
    ];
    setOvertimeRequests(requests);
  };

  const updateRequestStatus = (id, status) => {
    setOvertimeRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );
  };

  const filteredRequests =
    filteredStatus === "All"
      ? overtimeRequests
      : overtimeRequests.filter((request) => request.status === filteredStatus);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Overtime Management - Admin Dashboard</h1>

      {/* Metrics Section */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Requests</h5>
              <p className="card-text display-6">{overtimeRequests.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Pending Requests</h5>
              <p className="card-text display-6">
                {overtimeRequests.filter((req) => req.status === "Pending").length}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Approved Requests</h5>
              <p className="card-text display-6">
                {overtimeRequests.filter((req) => req.status === "Approved").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Filter */}
      <div className="mb-4">
        <label htmlFor="statusFilter" className="form-label">
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          className="form-select"
          value={filteredStatus}
          onChange={(e) => setFilteredStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Overtime Requests Table */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title mb-0">Overtime Requests</h2>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Employee</th>
                <th>Date</th>
                <th>Hours</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.employee}</td>
                  <td>{request.date}</td>
                  <td>{request.hours}</td>
                  <td>
                    <span
                      className={`badge ${
                        request.status === "Pending"
                          ? "bg-warning"
                          : request.status === "Approved"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td>
                    {request.status === "Pending" && (
                      <>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => updateRequestStatus(request.id, "Approved")}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => updateRequestStatus(request.id, "Rejected")}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OvertimeAdminDashboard;
