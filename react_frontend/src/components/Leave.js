import React, { useState, useEffect } from "react";
import { BellFill, CheckCircleFill } from "react-bootstrap-icons";
import leaveService from "../services/leaveService"; // Import the leave service

const Leave = () => {
  // State to hold the leave data and counts for pending and approved
  const [leaves, setLeaves] = useState([]);
  const [pending, setPending] = useState(0);
  const [approved, setApproved] = useState(0);

  useEffect(() => {
    // Fetch leave data when the component mounts
    const fetchData = async () => {
      const leavesData = await leaveService.fetchLeaves();
      setLeaves(leavesData);

      // Calculate pending and approved requests
      const pendingRequests = leavesData.filter(leave => leave.status === "pending").length;
      const approvedRequests = leavesData.filter(leave => leave.status === "approved").length;

      setPending(pendingRequests);
      setApproved(approvedRequests);
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once after initial render

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

        {/* Render the leave data here */}
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Employee</th>
              <th>Leave Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td colSpan="4">No leave requests available.</td>
              </tr>
            ) : (
              leaves.map((leave, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{leave.employeeName}</td>
                  <td>{leave.leaveType}</td>
                  <td>{leave.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leave;
