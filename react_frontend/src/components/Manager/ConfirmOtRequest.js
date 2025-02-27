import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import otcontroller from "../Manager/Controller/otcontroller";

const ConfirmedRequests = () => {
  const [confirmedRequests, setConfirmedRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOvertimeRequests = async () => {
      try {
        setIsLoading(true);
        const response = await otcontroller.fetchOvertimeRequests();
        setConfirmedRequests(response.filter((record) => record.otStatus !== "PENDING"));
      } catch (error) {
        console.error("Error fetching overtime requests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOvertimeRequests();
  }, []);

  return (
    <div className="container mt-4">
      <h1>Confirmed Overtime Requests</h1>
      <button className="btn btn-secondary mb-3" onClick={() => navigate("/manager-dashboard/manager-ot-approval")}>
        View Pending Requests
      </button>

      {isLoading ? (
        <div className="d-flex justify-content-center my-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : confirmedRequests.length === 0 ? (
        <div className="alert alert-info">No confirmed requests.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-success">
              <tr>
                <th>Employee Name</th>
                <th>Manager Name</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Overtime Hours</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Rejection Reason</th>
              </tr>
            </thead>
            <tbody>
              {confirmedRequests.map((record) => (
                <tr key={record.id}>
                  <td>{record.employeeName || "N/A"}</td>
                  <td>{record.managerName || "N/A"}</td>
                  <td>{record.date || "N/A"}</td>
                  <td>{record.startTime || "N/A"}</td>
                  <td>{record.endTime || "N/A"}</td>
                  <td>{record.otTime || "N/A"}</td>
                  <td>{record.reason || "N/A"}</td>
                  <td>
                    <span className={`badge ${record.otStatus === "APPROVED" ? "bg-success" : "bg-danger"}`}>
                      {record.otStatus}
                    </span>
                  </td>
                  <td>{record.otStatus === "REJECTED" ? record.rejectionReason || "No reason given" : "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ConfirmedRequests;
