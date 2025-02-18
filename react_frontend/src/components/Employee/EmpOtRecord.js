import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "../common/DataTable";

const EmpOtRecord = () => {
  const [overtimeRecords, setOvertimeRecords] = useState([]);

  useEffect(() => {
    fetch("/api/overtime/employee/1") // Replace with actual employee ID
      .then((response) => response.json())
      .then((data) => setOvertimeRecords(data))
      .catch((error) => console.error("Error fetching overtime records:", error));
  }, []);

  const columns = [
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Start Time",
      selector: (row) => row.startTime,
      sortable: true,
    },
    {
      name: "End Time",
      selector: (row) => row.endTime,
      sortable: true,
    },
    {
      name: "Duration (Hours)",
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
  ];

  return (
    <div className="container mt-4">
      <h2>My Overtime Records</h2>
      <DataTable
        columns={columns}
        data={overtimeRecords}
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
};

export default EmpOtRecord;
