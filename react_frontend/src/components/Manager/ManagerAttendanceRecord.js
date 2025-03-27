import React, { useEffect, useState } from "react";
import AttendanceRecordService from "../../services/attendanceRecordService";
import DataTable from "../common/DataTable";


const ManagerAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const attendanceData = attendanceRecords.map((record) => ({
    id: record.id,
    date: record.date,
    employeeName: record.employeeName,
    checkInTime: record.checkInTime,
    checkOutTime: record.checkOutTime,
    lateMinutes: record.lateMin,
    status: record.status,
    is_ot: record.is_ot,
  }));

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const data = await AttendanceRecordService.fetchAllAttendance();
        setAttendanceRecords(data);
      } catch (error) {
        console.error("Error fetching attendance records:", error);
      }
    };

    fetchAttendance();
  }, []);

  // Table Columns
  const columns = [
    { field: "id", headerName: "Att.ID", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "date", headerName: "Date", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "employeeName", headerName: "Employee Name", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "checkInTime", headerName: "Check-In Time", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "checkOutTime", headerName: "Check-Out Time", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    {
      field: "lateMin",
      headerName: "Late Minutes",
      minWidth: 50,
      flex: 0.5,
      cellClassName: "text-center",
    //   renderCell: ({ value }) => formatMinutesToHours(value || 0),
    },
    // {  headerName: "Overtime", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "status", headerName: "Leave Status", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "hasOT",headerName: "Over Time", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
  ];

  return (
    <div className="container mt-4">
      <h2>Employee Attendance Records</h2>
      <DataTable fetchData={AttendanceRecordService.fetchAllAttendance} data={attendanceData} columns={columns} keyField="id" />
    </div>
  );
};

export default ManagerAttendance;
