import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "./common/DataTable"; // Ensure this path is correct

const AttendanceRecord = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  // Fetch all attendance records from the backend
  const fetchAttendanceRecords = async () => {
    try {
      const response = await axios.get("/api/attendance/records"); // Ensure this endpoint exists
      setAttendanceRecords(response.data);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
    }
  };

  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  // Define columns for DataTable
  const columns = [
    { field: "id", headerName: "ID", minWidth: 50, flex: 0.5 },
    { field: "date", headerName: "Date", minWidth: 100, flex: 1 },
    { field: "employeeName", headerName: "Employee Name", minWidth: 150, flex: 1.5 },
    { field: "checkInTime", headerName: "Check-In Time", minWidth: 120, flex: 1 },
    { field: "checkOutTime", headerName: "Check-Out Time", minWidth: 120, flex: 1 },
    { field: "lateMinutes", headerName: "Late Minutes", minWidth: 100, flex: 0.5 },
    { field: "status", headerName: "Status", minWidth: 100, flex: 0.8 },
  ];

  return (
    <div className="container mt-4">
      <h2>All Employee Attendance Records</h2>
      <div className="mt-3">
        <DataTable fetchData={fetchAttendanceRecords} data={attendanceRecords} columns={columns} keyField="id" />
      </div>
    </div>
  );
};

export default AttendanceRecord;
