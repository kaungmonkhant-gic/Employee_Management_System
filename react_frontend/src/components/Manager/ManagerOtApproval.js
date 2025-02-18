import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "../common/DataTable";

const ManagerOtApproval = () => {
  const [overtimeRequests, setOvertimeRequests] = useState([]);

  useEffect(() => {
    fetch("/api/overtime/all")
      .then((response) => response.json())
      .then((data) => setOvertimeRequests(data))
      .catch((error) => console.error("Error fetching overtime requests:", error));
  }, []);

  const handleStatusChange = (id, newStatus) => {
    fetch(`/api/overtime/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then(() => {
        setOvertimeRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === id ? { ...request, status: newStatus } : request
          )
        );
      })
      .catch((error) => console.error("Error updating status:", error));
  };

  const columns = [
    {
      name: "Employee",
      selector: (row) => row.employeeName,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Start Time",
      selector: (row) => row.startTime,
    },
    {
      name: "End Time",
      selector: (row) => row.endTime,
    },
    {
      name: "Duration",
      selector: (row) => row.duration,
      sortable: true,
    },
    {
      name: "Reason",
      selector: (row) => row.reason,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <span
          className={`badge ${
            row.status === "Pending"
              ? "bg-warning"
              : row.status === "Approved"
              ? "bg-success"
              : "bg-danger"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row) =>
        row.status === "Pending" ? (
          <>
            <button
              className="btn btn-success btn-sm me-2"
              onClick={() => handleStatusChange(row.id, "Approved")}
            >
              Approve
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleStatusChange(row.id, "Rejected")}
            >
              Reject
            </button>
          </>
        ) : (
          <span className="text-muted">No Actions</span>
        ),
    },
  ];

  return (
    <div className="container mt-4">
      <h2>Overtime Approval</h2>
      <DataTable
        columns={columns}
        data={overtimeRequests}
        pagination
        highlightOnHover
        striped
        noDataComponent="No overtime requests found"
      />
    </div>
  );
};

export default ManagerOtApproval;
