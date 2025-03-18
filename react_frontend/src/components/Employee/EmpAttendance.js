import React, { useState, useEffect } from "react";
import { BellFill, CheckCircleFill } from "react-bootstrap-icons";
import { Modal, Button } from "react-bootstrap";
import LeaveForm from "../common/LeaveForm";
import apiClient from "../api/apiclient";
import DataTable from "../common/DataTable";
import { useNavigate } from "react-router-dom";
import attendanceController from "../Employee/Controller/AttendanceController";

const EmpAttendance = () => {

  const columns = [
    { field: "id", headerName: "Employee ID", minWidth: 150, flex: 1, cellClassName: "text-center" },
    { field: "checkInTime", headerName: "Leave Type", minWidth: 150, flex: 1, cellClassName: "text-center" },
    { field: "checkOutTime", headerName: "Start Date", minWidth: 150, flex: 1, cellClassName: "text-center" },
    { field: "lateMin", headerName: "End Date", minWidth: 120, flex: 1, cellClassName: "text-center" },
    { field: "employeeName", headerName: "Total Days", minWidth: 120, flex: 1, cellClassName: "text-center" },
    { field: "managerName", headerName: "Reason", minWidth: 200, flex: 2, cellClassName: "text-center" },
    // { field: "status", headerName: "Status", minWidth: 120, flex: 1, cellClassName: "text-center" },
    // { field: "employeeName", headerName: "Employee Name", minWidth: 120, flex: 1, cellClassName: "text-center" },
    { field: "managerName", headerName: "Manager Name", minWidth: 120, flex: 1, cellClassName: "text-center" },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   minWidth: 120,
    //   flex: 1,
    //   cellClassName: "text-center",
    //   render: (row) => (
    //     <span className={`badge ${row.status === "APPROVED" ? "bg-success" : "bg-danger"}`}>
    //       {row.status}
    //     </span>
    //   ),
    // },
    // {
    //   field: "rejectionReason",
    //   headerName: "Rejection Reason",
    //   minWidth: 200,
    //   flex: 2,
    //   cellClassName: "text-center",
    //   render: (row) => (row.status === "REJECTED" ? row.rejectionReason || "No reason given" : "N/A"),
    // },
  ];
  return (
    <div>
      <h1>Employee Attendance</h1>
      <DataTable
        fetchData={attendanceController.fetchAttendanceRecords}
        columns={columns}
        keyField="employeeId"
        responsive
        fixedHeader
        fixedHeaderScrollHeight="400px"
        noDataComponent="No employees found"
        highlightOnHover
        pagination />
    </div>
  );
  
};

export default EmpAttendance;
