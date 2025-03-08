import React, { useEffect, useState } from "react";
import leavecontroller from "./Controller/LeaveRequestController";
import DataTable from "../common/DataTable";

const EmployeeDashboard = () => {
  const [leaveRecords, setLeaveRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPending, setShowPending] = useState(true);

  useEffect(() => {
    fetchLeaveRecords();
  }, []);

  const fetchLeaveRecords = async () => {
    try {
      const response = await leavecontroller.fetchLeaveSelf();
      console.log("leave Records:", response);
      setLeaveRecords(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error("Error fetching leave records:", err);
      setError("Failed to load leave records.");
    } finally {
      setLoading(false);
    }
  };
   const filteredRecords = showPending
    ? leaveRecords.filter(record => record.status === "PENDING")
    : leaveRecords.filter(record => record.status === "APPROVED" || record.status === "REJECTED");
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
    <div className="container mt-4">
      <h2 className="mb-3">Leave Records</h2>

      

    
        {/* <DataTable
        fetchData={leavecontroller.fetchLeaveSelf}
        columns={columns}
        keyField="employeeId"
        responsive
        fixedHeader
        fixedHeaderScrollHeight="400px"
        noDataComponent="No employees found"
        highlightOnHover
        pagination
      /> */}
      {/* Buttons to toggle between Pending and Confirmed Overtime */}
      
      {/* Leave Records Table using DataTable */}
      {/* <div className="mt-4 p-3 border rounded shadow-sm bg-white">
        <h5 className="mb-3">{showPending ? "Pending Leave" : "Confirmed Leave"}</h5> */}

        {/* Only show DataTable once data is loaded */}
         {!loading ? (
          <DataTable
            fetchData={() => filteredRecords}
            columns={columns}
            keyField="number"
            responsive
            fixedHeader
            fixedHeaderScrollHeight="400px"
            noDataComponent="No Leave records found"
            highlightOnHover
            pagination
          />
        ) : (
          <p>Loading leave records...</p> 
        )}
      </div>
  );
};

export default EmployeeDashboard;
