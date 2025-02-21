import React, { useState, useEffect } from "react";
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
      console.log("Fetched Overtime Requests Data Structure:", response);
      setOvertimeRecords(response);
    } catch (error) {
      console.error("Error fetching overtime requests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOvertimeRequests();
  }, []);

  // Update the status of an overtime request (approved/rejected)
  const updateRequestStatus = async (id, status) => {
    try {
      const response = await fetch(`/api/overtime/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error("Failed to update request status.");
      }
      const updatedRequest = await response.json();
      console.log("Updated Request:", updatedRequest);
      fetchOvertimeRequests();
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };

  // Filter records based on status
  const filteredRecords =
    filteredStatus === "All"
      ? overtimeRecords
      : overtimeRecords.filter(
          (record) =>
            (filteredStatus === "Approved" && record.isApproved) ||
            (filteredStatus === "Pending" && !record.isApproved) ||
            (filteredStatus === "Rejected" && !record.isApproved && record.status === "Rejected")
        );

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Overtime Management - Admin Dashboard</h1>

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
                    <th>Approved</th>
                    <th>Paid</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRecords.map((record) => (
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
                          className={`badge ${record.isApproved ? "bg-success" : "bg-danger"}`}
                        >
                          {record.isApproved ? "Yes" : "No"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${record.isPaid ? "bg-success" : "bg-danger"}`}
                        >
                          {record.isPaid ? "Yes" : "No"}
                        </span>
                      </td>
                      <td>
                        {!record.isApproved && (
                          <>
                            <button
                              className="btn btn-success btn-sm me-2"
                              onClick={() => updateRequestStatus(record.id, "Approved")}
                            >
                              Approve
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => updateRequestStatus(record.id, "Rejected")}
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
          )}
        </div>
      </div>
   
  );
};

export default ManagerOtApproval;
