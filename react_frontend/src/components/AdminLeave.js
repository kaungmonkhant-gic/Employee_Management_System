import React, { useState, useEffect } from "react";
import { BellFill, CheckCircleFill } from "react-bootstrap-icons";
import { Modal, Button } from "react-bootstrap";
import LeaveForm from "./common/LeaveForm";
import apiClient from "./api/apiclient";
import { useNavigate } from "react-router-dom";
import DataTable from "./common/DataTable";
import leaveController from "../Controller/AdminLeaveController";

const LeaveRequests = () => {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [leaveRecords, setLeaveRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [availableLeaveDays, setAvailableLeaveDays] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await apiClient.get("/leave/status-count"); // pending / approved / rejected
        setPending(response.data.PENDING);
        setApproved(response.data.APPROVED);
        setRejected(response.data.REJECTED);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };

    fetchLeaveRequests();
  }, []);

  useEffect(() => {
    setLeaveRecords();
  }, []);



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
    // { field: "rejectionReason", headerName: "Reject Reason", minWidth: 120, flex: 1, cellClassName: "text-center" },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      flex: 1,
      cellClassName: "text-center",
      render: (row) => (
        <span className={`badge ${row.status === "APPROVED" ? "bg-success" : "bg-danger"}`}>
          {row.status}
        </span>
      ),
    },
    {
      field: "rejectionReason",
      headerName: "Rejection Reason",
      minWidth: 200,
      flex: 2,
      cellClassName: "text-center",
      render: (row) => (row.status === "REJECTED" ? row.rejectionReason || "No reason given" : "N/A"),
    },
  ];
  
  return (
    <div className="container mt-3 vh-100" >
      <div className="row mb-3">
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

      <div className="p-3 border rounded shadow-sm bg-white">
        <h5 className="mb-3">Leave Requests</h5>
        {/* <p>Available Leave Balance: {availableLeaveDays} days</p> */}
        <Button variant="secondary" onClick={() => setShowModal(true)}>
          Apply for leave
        </Button>
        {/* <button className="btn btn-primary mb-3">
        View Confirmed Requests
      </button> */}
        <Button variant="secondary" className="ms-3" onClick={() => navigate("/admin-dashboard/admin-leave-approval")}
        >
          Incoming Leave Requests
        </Button>
        <Button variant="secondary" className="ms-3" onClick={() => navigate("/admin-dashboard/leave-confirmed")}>
          Confirmed Requests
        </Button>

      </div>

      {/* Leave Form Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Leave Request Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LeaveForm/>
           {/* called the leave form in common file */}
        </Modal.Body>
      </Modal>

      <DataTable
          fetchData={leaveController.fetchLeaveRecords}
          columns={columns}
          keyField="employeeId"
          responsive
          fixedHeader
          fixedHeaderScrollHeight="400px"
          noDataComponent="No employees found"
          highlightOnHover
          pagination
        />
    </div>
  );
};

export default LeaveRequests;
