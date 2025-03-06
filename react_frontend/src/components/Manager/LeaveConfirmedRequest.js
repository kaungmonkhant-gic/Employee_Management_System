import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import leaveController from "../Manager/Controller/LeaveApprovalController";
import DataTable from "../common/DataTable";

const ConfirmedRequests = () => {
  const [confirmedRequests, setConfirmedRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApprovedRequests = async () => {
      try {
        setIsLoading(true);
        const response = await leaveController.fetchLeaveRequests();
        setConfirmedRequests(response.filter((record) => record.otStatus !== "PENDING"));
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApprovedRequests();
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
    { field: "rejectionReason", headerName: "Reject Reason", minWidth: 120, flex: 1, cellClassName: "text-center" },
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
    <div className="container mt-4">
      <h3 className="mb-3">Confirmed Leave Requests</h3>
      <button className="btn btn-secondary mb-3 ms-3 mt-3" onClick={() => navigate("/manager-dashboard/manager-leave")}>
        Apply for Leave
      </button>
      <button className="btn btn-secondary mb-3 ms-3 mt-3" onClick={() => navigate("/manager-dashboard/manager-leave-approval")}>
        View Pending Requests
      </button>

      <DataTable
        fetchData={() =>
          leaveController.fetchLeaveRequests().then((data) =>
            Array.isArray(data) ? data.filter((request) => request.status !== "PENDING") : []
          )
        }
        columns={columns}
        keyField="id"
        responsive
        fixedHeader
        fixedHeaderScrollHeight="400px"
        noDataComponent="No confirmed overtime requests"
        progressPending={isLoading}
        highlightOnHover
        pagination
      />
    </div>
  );
};

export default ConfirmedRequests;