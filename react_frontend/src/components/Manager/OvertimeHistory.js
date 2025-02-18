import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "../common/DataTable";

const ManagerOtHistory = () => {
  const [overtimeRequests, setOvertimeRequests] = useState([]);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [declinedRequests, setDeclinedRequests] = useState([]);

  useEffect(() => {
    fetch("/api/overtime/all")
      .then((response) => response.json())
      .then((data) => {
        setOvertimeRequests(data);
        filterRequests(data);
      })
      .catch((error) => console.error("Error fetching overtime requests:", error));
  }, []);

  const filterRequests = (data) => {
    setApprovedRequests(data.filter((request) => request.status === "Approved"));
    setDeclinedRequests(data.filter((request) => request.status === "Rejected"));
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
  ];

  return (
    <div className="container mt-4">
      <h2>Overtime History</h2>

      <h3 className="mt-4">Approved Overtime Requests</h3>
      <DataTable
        columns={columns}
        data={approvedRequests}
        pagination
        highlightOnHover
        striped
        noDataComponent="No approved overtime requests found"
      />

      <h3 className="mt-4">Declined Overtime Requests</h3>
      <DataTable
        columns={columns}
        data={declinedRequests}
        pagination
        highlightOnHover
        striped
        noDataComponent="No declined overtime requests found"
      />
    </div>
  );
};

export default ManagerOtHistory;
