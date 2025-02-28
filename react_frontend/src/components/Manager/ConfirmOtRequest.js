import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import otcontroller from "../Manager/Controller/otcontroller";
import DataTable from "../common/DataTable";

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

  const columns = [
    { field: "employeeName", headerName: "Employee", minWidth: 150, flex: 1, cellClassName: "text-center" },
    { field: "managerName", headerName: "Manager", minWidth: 150, flex: 1, cellClassName: "text-center" },
    { field: "date", headerName: "Date", minWidth: 120, flex: 1, cellClassName: "text-center" },
    { field: "startTime", headerName: "Start Time", minWidth: 120, flex: 1, cellClassName: "text-center" },
    { field: "endTime", headerName: "End Time", minWidth: 120, flex: 1, cellClassName: "text-center" },
    { field: "otTime", headerName: "OT Hours", minWidth: 120, flex: 1, cellClassName: "text-center" },
    { field: "reason", headerName: "Reason", minWidth: 200, flex: 2, cellClassName: "text-center" },
    {
      field: "otStatus",
      headerName: "Status",
      minWidth: 120,
      flex: 1,
      cellClassName: "text-center",
      render: (row) => (
        <span className={`badge ${row.otStatus === "APPROVED" ? "bg-success" : "bg-danger"}`}>
          {row.otStatus}
        </span>
      ),
    },
    {
      field: "rejectionReason",
      headerName: "Rejection Reason",
      minWidth: 200,
      flex: 2,
      cellClassName: "text-center",
      render: (row) => (row.otStatus === "REJECTED" ? row.rejectionReason || "No reason given" : "N/A"),
    },
  ];

  return (
    <div className="container mt-4">
      <h1>Confirmed Overtime Requests</h1>
      <button className="btn btn-secondary mb-3" onClick={() => navigate("/manager-dashboard/manager-ot-approval")}>
        View Pending Requests
      </button>

      <DataTable
        fetchData={() =>
          otcontroller.fetchOvertimeRequests().then((data) =>
            Array.isArray(data) ? data.filter((request) => request.otStatus !== "PENDING") : []
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
