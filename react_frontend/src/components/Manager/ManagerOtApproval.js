import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import otcontroller from "../Manager/Controller/otcontroller";
import DataTable from "../common/DataTable";
import { useNavigate } from "react-router-dom";

const PendingRequests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [headerText, setHeaderText] = useState("Manage Pending Requests");
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

  const columns = [
    { field: "employeeName", headerName: "Employee", minWidth: 150, flex: 1, cellClassName: "text-center" },
    { field: "managerName", headerName: "Manager", minWidth: 150, flex: 1, cellClassName: "text-center" },
    { field: "date", headerName: "Date", minWidth: 120, flex: 1, cellClassName: "text-center" },
    { field: "startTime", headerName: "Start Time", minWidth: 120, flex: 1, cellClassName: "text-center" },
    { field: "endTime", headerName: "End Time", minWidth: 120, flex: 1, cellClassName: "text-center" },
    { field: "otTime", headerName: "OT Hours", minWidth: 120, flex: 1, cellClassName: "text-center" },
    { field: "reason", headerName: "Reason", minWidth: 200, flex: 2, cellClassName: "text-center" },
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
      
      <button className="btn btn-primary mb-3" onClick={() => navigate("/manager-dashboard/confirm-ot-request")}>
        View Confirmed Requests
      </button>

      {/* DataTable */}
      <DataTable
        fetchData={() =>
          otcontroller.fetchOvertimeRequests().then((data) =>
            Array.isArray(data) ? data.filter((request) => request.otStatus === "PENDING") : []
          )
        }
        columns={columns}
        keyField="id"
        responsive
        fixedHeader
        fixedHeaderScrollHeight="400px"
        noDataComponent="No pending overtime requests"
        progressPending={isLoading}
        highlightOnHover
        pagination
      />
    </div>
  );
};

export default PendingRequests;
