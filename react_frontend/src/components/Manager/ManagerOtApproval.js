import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import managerOTController from "./Controller/managerOTController";

const ManagerOtApproval = () => {
  const [filteredStatus, setFilteredStatus] = useState("All");
  const [overtimeRecords, setOvertimeRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch overtime records
  const fetchOvertimeRequests = async () => {
    try {
      setIsLoading(true);
      const response = await managerOTController.fetchOvertimeRequests();
      console.log("Fetched Overtime Requests:", response);
      setOvertimeRecords(response);
    } catch (error) {
      console.error("Error fetching overtime requests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch("/api/overtime/all")
      .then((response) => response.json())
      .then((data) => setOvertimeRequests(data))
      .catch((error) => console.error("Error fetching overtime requests:", error));
  }, []);

  // Approve request
  const approveRequest = async (id) => {
    try {
      await managerOTController.approveRequest(id);
      setOvertimeRecords((prevRecords) =>
        prevRecords.map((record) =>
          record.id === id ? { ...record, status: "Approved" } : record
        )
      );
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  // Reject request
  const rejectRequest = async (id) => {
    try {
      await managerOTController.rejectRequest(id);
      setOvertimeRecords((prevRecords) =>
        prevRecords.map((record) =>
          record.id === id ? { ...record, status: "Rejected" } : record
        )
      );
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  // Filter records based on status
  const filteredRecords =
    filteredStatus === "All"
      ? overtimeRecords
      : overtimeRecords.filter(
          (record) =>
            record.status?.toLowerCase() === filteredStatus.toLowerCase()
        );

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Overtime Management - Manager Dashboard</h1>

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
      <div className="card-body">
        {isLoading ? (
          <div className="d-flex justify-content-center my-4">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="alert alert-warning">No overtime records available.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead className="table-primary">
                <tr>
                  <th>Employee Name</th>
                  <th>Manager Name</th>
                  <th>Date</th>
                  <th>Check-In Time</th>
                  <th>Check-Out Time</th>
                  <th>Overtime Hours</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => {
                  console.log("Rendering record:", record); // Debugging: Check record structure
                  return (
                    <tr key={record.id}>
                      <td>{record.employeeName || "N/A"}</td>
                      <td>{record.managerName || "N/A"}</td>
                      <td>{record.date || "N/A"}</td>
                      <td>{record.checkInTime || "N/A"}</td>
                      <td>{record.checkOutTime || "N/A"}</td>
                      <td>{record.otTime || "N/A"}</td>
                      <td>{record.reason || "N/A"}</td>
                      <td>
                        <span
                          className={`badge ${
                            record.status?.toLowerCase() === "approved"
                              ? "bg-success"
                              : record.status?.toLowerCase() === "rejected"
                              ? "bg-danger"
                              : "bg-warning"
                          }`}
                        >
                          {record.status || "Pending"}
                        </span>
                      </td>
                      <td>
                        {record.status?.toLowerCase() === "pending" && (
                          <>
                            <button
                              className="btn btn-success btn-sm me-2"
                              onClick={() => approveRequest(record.id)}
                            >
                              Approve
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => rejectRequest(record.id)}
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerOtApproval;
