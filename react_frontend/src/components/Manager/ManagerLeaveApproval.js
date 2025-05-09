import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { BellFill, CheckCircleFill } from "react-bootstrap-icons";
import leavecontroller from "../Manager/Controller/LeaveApprovalController";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiclient";

const PendingRequests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [headerText, setHeaderText] = useState("Pending Requests");
  const [pending, setPending] = useState(0);
  const [approved, setApproved] = useState(0);
  const [rejected, setRejected] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStatusCounts = async () => {
      try {
        const response = await apiClient.get("/leave/role-status-count");
        setPending(response.data.PENDING);
        setApproved(response.data.APPROVED);
        setRejected(response.data.REJECTED);
      } catch (error) {
        console.error("Error fetching leave status count:", error);
      }
    };

    fetchStatusCounts();
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setIsLoading(true);
        const response = await leavecontroller.fetchLeaveRequests();
        const pendingOnly = response.filter((record) => record.status === "PENDING");
        setPendingRequests(pendingOnly);
      } catch (error) {
        console.error("Error fetching pending requests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // const approveRequest = async (id) => {
  //   try {
  //     await leavecontroller.approveRequest(id);
  //     setPendingRequests((prev) => prev.filter((record) => record.id !== id));
  //   } catch (error) {
  //     console.error("Error approving request:", error);
  //   }
  // };

  // const rejectRequest = async (id) => {
  //   const comment = prompt("Enter rejection reason:");
  //   if (!comment || comment.trim() === "") {
  //     alert("Rejection reason is required.");
  //     return;
  //   }
  
  //   try {
  //     await leavecontroller.rejectRequest(id, comment.trim());
  //     setPendingRequests((prev) => prev.filter((record) => record.id !== id));
  //   } catch (error) {
  //     console.error("Error rejecting request:", error);
  //   }
  // };
  
  const columns = [
    {
      name: "Employee ID",
      selector: row => row.employeeId,
      sortable: true,
      center: true,
      wrap: true,
      maxWidth: "120px",
    },
    {
      name: "Leave Type",
      selector: row => row.leaveType,
      center: true,
      wrap: true,
      maxWidth: "120px",
    },
    {
      name: "Start Date",
      selector: row => row.startDate,
      center: true,
      wrap: true,
      maxWidth: "120px",
    },
    {
      name: "End Date",
      selector: row => row.endDate,
      center: true,
      wrap: true,
      maxWidth: "120px",
    },
    {
      name: "Total Days",
      selector: row => row.totalDays,
      center: true,
      wrap: true,
      maxWidth: "80px",
    },
    {
      name: "Reason",
      selector: row => row.reason,
      wrap: true,
      maxWidth: "150px",
    },
    {
      name: "Status",
      selector: row => row.status,
      center: true,
      wrap: true,
      cell: row => (
        <span className={`badge ${row.status === "APPROVED" ? "bg-success" : row.status === "REJECTED" ? "bg-danger" : "bg-warning text-dark"}`}>
          {row.status}
        </span>
      ),
      maxWidth: "100px",
    },
    {
      name: "Employee Name",
      selector: row => row.employeeName,
      center: true,
      wrap: true,
      maxWidth: "150px",
    },
    {
      name: "Manager Name",
      selector: row => row.managerName,
      center: true,
      wrap: true,
      maxWidth: "150px",
    },
    {
      name: "Reject Reason",
      selector: row => row.rejectionReason,
      center: true,
      wrap: true,
      cell: row =>
        row.status === "REJECTED" ? (row.rejectionReason || "No reason given") : "N/A",
      maxWidth: "150px",
    },
    {
      name: "Actions",
      center: true,
      cell: row => (
        <div className="d-flex flex-column gap-1">
          <button
            onClick={() => leavecontroller.approveRequest(row.id)}
            className="btn btn-outline-success btn-sm"
          >
            <FaCheckCircle /> Approve
          </button>
          <button
            onClick={() => leavecontroller.rejectRequest(row.id)}
            className="btn btn-outline-danger btn-sm"
          >
            <FaTimesCircle /> Reject
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      maxWidth: "120px",
    },
  ];
  
  
  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#c3dbf7",
        color: "#495057",
        fontWeight: "bold",
        fontSize: "13px",
        whiteSpace: "nowrap",
        padding: "8px",
      },
    },
    rows: {
      style: {
        fontSize: "14px",
        minHeight: "70px",
      },
    },
    cells: {
      style: {
        marginTop:"10px",
        marginBottom:"10px",
        padding: "6px 8px",
        whiteSpace: "normal",
      },
    },
  };
  

  return (
    <div className="container mt-4">
      {/* <h1>{headerText}</h1> */}
      <button className="btn btn-secondary mb-3" onClick={() => navigate("/manager-dashboard/manager-leave")}>
        Return
      </button>

      {/* <div className="row mb-4">
        <div className="col-md-4">
          <div className="d-flex align-items-center p-3 border rounded shadow-sm bg-white">
            <BellFill size={32} color="orange" />
            <div className="ms-3">
              <p className="text-muted mb-1">Pending Requests</p>
              <p className="fw-bold mb-0">{pending}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="d-flex align-items-center p-3 border rounded shadow-sm bg-white">
            <CheckCircleFill size={32} color="green" />
            <div className="ms-3">
              <p className="text-muted mb-1">Approved Requests</p>
              <p className="fw-bold mb-0">{approved}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="d-flex align-items-center p-3 border rounded shadow-sm bg-white">
            <CheckCircleFill size={32} color="red" />
            <div className="ms-3">
              <p className="text-muted mb-1">Rejected Requests</p>
              <p className="fw-bold mb-0">{rejected}</p>
            </div>
          </div>
        </div>
      </div> */}

      {/* <DataTable
        columns={columns}
        data={pendingRequests}
        progressPending={isLoading}
        noDataComponent="No pending leave requests"
        pagination
        highlightOnHover
        responsive
        fixedHeader
        fixedHeaderScrollHeight="400px"
        customStyles={customStyles}
      /> */}

<div className="bg-white mt-4 p-3 border rounded shadow-sm">
        <DataTable
          columns={columns}
          data={pendingRequests}
          progressPending={isLoading}
          pagination
          responsive
          highlightOnHover
          fixedHeader
          fixedHeaderScrollHeight="300px"
          noDataComponent="No employees found"
          dense
          customStyles={customStyles}
        />
      </div>
    </div>
  );
};

export default PendingRequests;