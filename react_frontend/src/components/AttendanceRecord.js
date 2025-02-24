// src/pages/attendanceRecord.js
import React, { useEffect, useState } from "react";
import attendanceRecordController from "../Controller/attendanceRecordController";
import DataTable from "./common/DataTable";
import AttendanceForm from "./common/AttendanceForm";
import { FaEdit, FaTrash } from "react-icons/fa";

const AttendanceRecord = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [editingAttendance,setEditingAttendance] = useState(null);
  const [HeaderText,setHeaderText] = useState();

  attendanceData.map((data, index) => { data.id = index + 1; return data; });

  const handleEdit = (attendance) => {
    setHeaderText("Edit Attendance");
    setEditingAttendance(attendance);
  };


  // Define columns for DataTable
  const columns = [
    { field: "id", headerName: "No.", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "date", headerName: "Date", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { field: "employeeName", headerName: "Employee Name", minWidth: 150, flex: 1, cellClassName: "text-center" },
    { field: "checkInTime", headerName: "Check-In Time", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { field: "checkOutTime", headerName: "Check-Out Time", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { field: "lateMin", headerName: "Late Minutes", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { field: "lunchBreak", headerName: "Lunch Break", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { field: "status", headerName: "Status", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { field: "actions",
      headerName: "Actions",
      minWidth: 120,
      flex: 0.8,
      cellClassName: "text-center",
      render: (row) => (
      <div className="d-flex justify-content-center gap-2"> {/* Center actions */}
      <button onClick={handleEdit(row)}>
      <FaEdit />
      </button>
      <button >
      <FaTrash />
      </button>
      </div>
            ),
          },
  ];

  return (
    <div className="container mt-4">
      <h2>Attendance Record</h2>
      <div className="mt-3">
        
        <DataTable fetchData={attendanceRecordController.fetchAttendance} columns={columns} keyField="id" />
        <AttendanceForm/>
      </div>
    </div>
  );
};

export default AttendanceRecord;
