import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { BellFill, CheckCircleFill } from "react-bootstrap-icons";
import leavecontroller from "../Manager/Controller/LeaveApprovalController";
import DataTable from "../common/DataTable";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiclient";

const PendingRequests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [headerText, setHeaderText] = useState("Pending Requests");
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState(0);
  const navigate = useNavigate();

  //fetching leave-status-count
  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await apiClient.get("/leave/role-status-count"); //  actual API endpoint
        setPending(response.data.PENDING);
        setApproved(response.data.APPROVED);
        setRejected(response.data.REJECTED);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };

    fetchLeaveRequests();
  }, []);

  //fetching the pending requests
  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        setIsLoading(true);
        const response = await leavecontroller.fetchLeaveRequests();
        setPendingRequests(response.filter((record) => record.status === "PENDING"));
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaveRequests();
  }, []);

  // Approve request
  const approveRequest = async (id) => {
    try {
      await leavecontroller.approveRequest(id);
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
      await leavecontroller.rejectRequest(id, comment);
      setPendingRequests((prev) => prev.filter((record) => record.id !== id)); // Remove from pending
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "Employee ID", minWidth: 150, flex: 1, cellClassName: "text-center" },
    { field: "leaveType", headerName: "Leave Type", minWidth: 150, flex: 1, cellClassName: "text-center" },
    { field: "startDate", headerName: "Start Date", minWidth: 150, flex: 1, cellClassName: "text-center" },
    { field: "endDate", headerName: "End Date", minWidth: 120, flex: 1, cellClassName: "text-center" },
    { field: "totalDays", headerName: "Total Days", minWidth: 120, flex: 1, cellClassName: "text-center" },
    { field: "reason", headerName: "Reason", minWidth: 200, flex: 2, cellClassName: "text-center" },
    { field: "status", headerName: "Status", minWidth: 120, flex: 1, cellClassName: "text-center" },
    { field: "employeeName", headerName: "Employee Name", minWidth: 120, flex: 1, cellClassName: "text-center" },
    { field: "managerName", headerName: "Manager Name", minWidth: 120, flex: 1, cellClassName: "text-center" },
    { field: "rejectionReason", headerName: "Reject Reason", minWidth: 120, flex: 1, cellClassName: "text-center" },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 1,
      cellClassName: "text-center",
      render: (row) => (
        <div className="d-flex justify-content-center gap-2">
          <button onClick={() => approveRequest(row.id)} className="btn btn-outline-success btn-sm">
            <FaCheckCircle /> Approve
          </button>
          <button onClick={() => rejectRequest(row.id)} className="btn btn-outline-danger btn-sm">
            <FaTimesCircle /> Reject
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <h1>{headerText}</h1>
      <button className="btn btn-secondary mb-3" onClick={() => navigate("/manager-dashboard/manager-leave")}> Return</button>
      <div className="row mb-4">
              <div className="col-md-4">
                <div className="d-flex align-items-center p-3 border rounded shadow-sm" style={{ backgroundColor: "#fff" }}>
                  <BellFill size={32} color="orange" />
                  <div className="ms-3">
                    <p className="text-muted mb-1">Pending Requests</p>
                    <p className="fw-bold mb-0">{pending}</p>
                  </div>
                </div>
              </div>
      
              <div className="col-md-4">
                <div className="d-flex align-items-center p-3 border rounded shadow-sm" style={{ backgroundColor: "#fff" }}>
                  <CheckCircleFill size={32} color="green" />
                  <div className="ms-3">
                    <p className="text-muted mb-1">Approved Requests</p>
                    <p className="fw-bold mb-0">{approved}</p>
                  </div>
                </div>
              </div>
      
              <div className="col-md-4">
                <div className="d-flex align-items-center p-3 border rounded shadow-sm" style={{ backgroundColor: "#danger" }}>
                  <CheckCircleFill size={32} color="red" />
                  <div className="ms-3">
                    <p className="text-muted mb-1">Rejected Requests</p>
                    <p className="fw-bold mb-0">{rejected}</p>
                  </div>
                </div>
              </div>
            </div>
      
      {/* DataTable */}
      <DataTable
        fetchData={() =>
          leavecontroller.fetchLeaveRequests().then((data) =>
            Array.isArray(data) ? data.filter((request) => request.status === "PENDING") : []
          )
        }
        columns={columns}
        keyField="id"
        responsive
        fixedHeader
        fixedHeaderScrollHeight="400px"
        noDataComponent="No pending Leave requests"
        progressPending={isLoading}
        highlightOnHover
        pagination
      />
    </div>
  );
};

export default PendingRequests;
