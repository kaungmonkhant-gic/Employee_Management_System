import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import otcontroller from "../Manager/Controller/otcontroller";

const PendingRequests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOvertimeRequests = async () => {
      try {
        setIsLoading(true);
        const response = await otcontroller.fetchOvertimeRequests();
        setPendingRequests(response.filter((record) => record.otStatus === "PENDING"));
      } catch (error) {
        console.error("Error fetching overtime requests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOvertimeRequests();
  }, []);

  // Approve request
  const approveRequest = async (id) => {
    try {
      await otcontroller.approveRequest(id);
      setPendingRequests((prev) => prev.filter((record) => record.id !== id)); // Remove from pending
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  // Reject request
  const rejectRequest = async (id) => {
    const comment = prompt("Enter rejection reason:");
    if (!comment) return;

    try {
      await otcontroller.rejectRequest(id, comment);
      setPendingRequests((prev) => prev.filter((record) => record.id !== id)); // Remove from pending
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h1>Pending Overtime Requests</h1>
      <button className="btn btn-primary mb-3" onClick={() => navigate("/manager-dashboard/confirm-ot-request")}>
        View Confirmed Requests
      </button>

      {isLoading ? (
        <div className="d-flex justify-content-center my-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : pendingRequests.length === 0 ? (
        <div className="alert alert-warning">No pending requests.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-primary">
              <tr>
                <th>Employee Name</th>
                <th>Manager Name</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Overtime Hours</th>
                <th>Reason</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingRequests.map((record) => (
                <tr key={record.id}>
                  <td>{record.employeeName || "N/A"}</td>
                  <td>{record.managerName || "N/A"}</td>
                  <td>{record.date || "N/A"}</td>
                  <td>{record.startTime || "N/A"}</td>
                  <td>{record.endTime || "N/A"}</td>
                  <td>{record.otTime || "N/A"}</td>
                  <td>{record.reason || "N/A"}</td>
                  <td>
                    <button className="btn btn-success btn-sm me-2" onClick={() => approveRequest(record.id)}>
                      <i className="bi bi-check-circle"></i> Approve
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => rejectRequest(record.id)}>
                      <i className="bi bi-x-circle"></i> Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingRequests;
