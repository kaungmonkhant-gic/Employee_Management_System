import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import leaveController from "../Manager/Controller/LeaveApprovalController";
import DataTable from "react-data-table-component"; // Using react-data-table-component here
import apiClient from "../api/apiclient";

const ConfirmedRequests = () => {
  const [confirmedRequests, setConfirmedRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, setApproved] = useState(0);
  const [, setRejected] = useState(0);
  const [, setPending] = useState(0);
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
    const fetchApprovedRequests = async () => {
      try {
        setIsLoading(true);
        const response = await leaveController.fetchLeaveRequests();
        setConfirmedRequests(
          response.filter((record) => record.status !== "PENDING")
        );
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApprovedRequests();
  }, []);

  const columns = [
    {
      name: "Employee ID",
      selector: (row) => row.employeeId,
      sortable: true,
      center: true,
      wrap: true,
    },
    {
      name: "Leave Type",
      selector: (row) => row.leaveType,
      center: true,
      wrap: true,
    },
    {
      name: "Start Date",
      selector: (row) => row.startDate,
      center: true,
      wrap: true,
    },
    {
      name: "End Date",
      selector: (row) => row.endDate,
      center: true,
      wrap: true,
    },
    {
      name: "Total Days",
      selector: (row) => row.totalDays,
      center: true,
      wrap: true,
    },
    {
      name: "Reason",
      selector: (row) => row.reason,
      wrap: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      center: true,
      wrap: true,
      cell: (row) => (
        <span className={`badge ${row.status === "APPROVED" ? "bg-success" : "bg-danger"}`}>
          {row.status}
        </span>
      ),
    },
    {
      name: "Employee Name",
      selector: (row) => row.employeeName,
      center: true,
      wrap: true,
    },
    {
      name: "Manager Name",
      selector: (row) => row.managerName,
      center: true,
      wrap: true,
    },
    {
      name: "Reject Reason",
      selector: (row) => row.rejectionReason,
      center: true,
      wrap: true,
      cell: (row) =>
        row.status === "REJECTED" ? (row.rejectionReason || "No reason given") : "N/A",
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#c3dbf7",
        color: "#495057",
        fontWeight: "bold",
        fontSize: "15px",
        borderBottom: "2px solid #dee2e6",
        whiteSpace: "nowrap", // Prevent text wrapping
        overflow: "visible", // Allow content overflow
        textOverflow: "unset", // Prevent ellipsis
      },
    },
    
    rows: {
      style: {
        minHeight: "70px",
        fontSize: "14px",
        borderBottom: "1px solid #dee2e6",
      },
    },
    
    cells: {
      style: {
        borderRight: "1px solid #dee2e6",
        paddingLeft: "12px",
        paddingRight: "12px",
      },
    },
    
    table: {
      style: {
        border: "1px solid #dee2e6",
      
      },
    },
  };

  return (
    <div className="container mt-4">
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

      {/* <div className="bg-white mt-4 p-3 border rounded shadow-sm"> */}
        <DataTable
          columns={columns}
          data={confirmedRequests}
          progressPending={isLoading}
          pagination
          responsive
          highlightOnHover
          fixedHeader
          fixedHeaderScrollHeight="300px"
          noDataComponent="No leave requests found"
          dense
          customStyles={customStyles}
        />
      {/* </div> */}
    </div>
  );
};

export default ConfirmedRequests;
