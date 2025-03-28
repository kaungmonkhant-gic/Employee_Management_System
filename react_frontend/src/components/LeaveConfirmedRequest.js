import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "./common/DataTable";
import leaveController from "../Controller/LeaveApprovalController";


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
    <div className="container-fluid mt-4">
  <h3 className="mb-3 text-center">Confirmed Leave Requests</h3>

  {/* Buttons Container */}
  <div className="d-flex flex-wrap gap-2 mb-3">
    <button 
      className="btn btn-secondary" 
      onClick={() => navigate("/admin-dashboard/admin-leave")}
    >
      Return
    </button>
    
    <button 
      className="btn btn-secondary" 
      onClick={() => navigate("/admin-dashboard/admin-leave-approval")}
    >
      View Pending Requests
    </button>
  </div>

  {/* DataTable Wrapper */}
  <div className="table-responsive">
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
</div>

  );
};

export default ConfirmedRequests;