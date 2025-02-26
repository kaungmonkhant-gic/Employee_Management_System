import React, { useState, useEffect } from "react";
import { BellFill, CheckCircleFill } from "react-bootstrap-icons";

const LeaveRequests = () => {
  // Mock state for leave counts (Replace with API data)
  const [pending, setPending] = useState(5);
  const [approved, setApproved] = useState(12);

  useEffect(() => {
    // Fetch real-time leave request data here (Example API call)
    // Example: fetch("/api/leave-requests").then(response => response.json()).then(data => { setPending(data.pending); setApproved(data.approved); });
  }, []);

  return (
    <div className="container mt-4">
      {/* Top Section - Status Cards */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div
            className="d-flex align-items-center p-3 border rounded shadow-sm"
            style={{ cursor: "pointer", backgroundColor: "#fff" }}
          >
            <BellFill size={32} color="orange" />
            <div className="ms-3">
              <p className="text-muted mb-1" style={{ fontSize: "14px" }}>
                Pending Requests
              </p>
              <p className="fw-bold mb-0" style={{ fontSize: "20px" }}>
                {pending}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div
            className="d-flex align-items-center p-3 border rounded shadow-sm"
            style={{ cursor: "pointer", backgroundColor: "#fff" }}
          >
            <CheckCircleFill size={32} color="green" />
            <div className="ms-3">
              <p className="text-muted mb-1" style={{ fontSize: "14px" }}>
                Approved Requests
              </p>
              <p className="fw-bold mb-0" style={{ fontSize: "20px" }}>
                {approved}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leave Requests Table Placeholder */}
      <div className="p-3 border rounded shadow-sm bg-white">
        <h5 className="mb-3">Leave Requests</h5>
        <p className="text-muted" style={{ fontSize: "14px" }}>
         <button className="btn btn-secondary">Apply for leave</button>
        </p>
      </div>
    </div>
  );
};

export default LeaveRequests;
