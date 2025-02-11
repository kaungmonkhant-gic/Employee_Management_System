import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "./common/DataTable";
import { FaClock, FaSignOutAlt, FaUserClock } from "react-icons/fa";
import moment from "moment";
import AttendanceController from "../Controller/attendanceController";

const currentDate = moment().format("YYYY-MM-DD");
const currentTime = moment().format("HH:mm:ss");

function DailyAttendance() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  const handleCheckIn = () => {
    const checkInTime = moment();
    const checkInHour = checkInTime.hour();
    const checkInMinute = checkInTime.minute();
    const formattedCheckInTime = checkInTime.format("HH:mm:ss");

    let lateMinutes = 0;
    let status = "";

    if (checkInHour < 8 || (checkInHour === 8 && checkInMinute === 0)) {
      status = "On time";
    } else if (checkInHour < 12) {
      // Late check-in before lunch break
      lateMinutes = checkInTime.diff(moment(`${currentDate} 08:00:00`), 'minutes');
      status = "Late Check-In";
    } else if (checkInHour >= 12 && checkInHour < 13) {
      status = "Afternoon Check-In";
    } else {
      // Late afternoon check-in after 1 PM
      status = "Late Afternoon Check-In";
      lateMinutes = checkInTime.diff(moment(`${currentDate} 13:00:00`), 'minutes');
    }

    const newRecord = {
      id: attendanceRecords.length + 1,
      name: "Employee Name", // Replace with dynamic employee name if available
      Date: currentDate,
      start_time: formattedCheckInTime,
      late_min: lateMinutes,
      status: status,
      manager_id: "MGR001", // Example manager ID
      is_approved: false,
      reason: ""
    };

    console.log("Check-In time: ", formattedCheckInTime);
    console.log("Status: ", status, ", Late Minutes: ", lateMinutes);

    setAttendanceRecords((prev) => [...prev, newRecord]);
  };

  const handleCheckOut = (recordId) => {
    const checkOutTime = moment();
    const checkOutHour = checkOutTime.hour();
    const formattedCheckOutTime = checkOutTime.format("HH:mm:ss");

    let status = "On time";

    if (checkOutHour >= 14 && checkOutHour < 16) {
      status = "Early Check-Out";
    } else if (checkOutHour < 17) {
      status = "Very Early Check-Out";
    }

    setAttendanceRecords((prev) =>
      prev.map((record) =>
        record.id === recordId
          ? { ...record, end_time: formattedCheckOutTime, status: status }
          : record
      )
    );
  };

  const handleOvertime = (recordId) => {
    setAttendanceRecords((prev) =>
      prev.map((record) =>
        record.id === recordId
          ? { ...record, reason: "Worked extra hours for urgent task" }
          : record
      )
    );
  };

  const columns = [
    { field: "id", headerName: "ID", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "name", headerName: "Employee Name", minWidth: 150, flex: 1, cellClassName: "text-center" },
    { field: "Date", headerName: "Date", minWidth: 150, flex: 1, cellClassName: "text-center" },
    { field: "start_time", headerName: "Start Time", minWidth: 120, flex: 1, cellClassName: "text-center" },
    { field: "end_time", headerName: "End Time", minWidth: 120, flex: 1, cellClassName: "text-center" },
    { field: "late_min", headerName: "Late (min)", minWidth: 100, flex: 0.7, cellClassName: "text-center" },
    { field: "status", headerName: "Status", minWidth: 150, flex: 1, cellClassName: "text-center" },
    { field: "manager_id", headerName: "Manager ID", minWidth: 150, flex: 1, cellClassName: "text-center" },
    { field: "is_approved", headerName: "Approved", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { field: "reason", headerName: "Reason", minWidth: 200, flex: 1.5, cellClassName: "text-center" },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 200,
      flex: 1,
      cellClassName: "text-center",
      render: (row) => (
        <div className="d-flex justify-content-center gap-2">
          <button onClick={() => handleCheckOut(row.id)} className="btn btn-outline-success btn-sm">
            <FaSignOutAlt /> Check-Out
          </button>
          <button onClick={() => handleOvertime(row.id)} className="btn btn-outline-warning btn-sm">
            <FaUserClock /> Overtime
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-5 vh-100">
      <h2 className="text-center mb-4">Daily Attendance</h2>
      <button className="btn btn-primary mb-4" onClick={handleCheckIn}>
        <FaClock /> Check-In
      </button>
      <DataTable
        fetchData={() =>
          AttendanceController.fetchAttendance().then(data =>
            Array.isArray(data) ? data.map((record, index) => ({ ...record, id: index + 1 })) : []
          )
        }
        columns={columns}       
        keyField={"id"}
        responsive
        fixedHeader
        fixedHeaderScrollHeight="400px"
        noDataComponent="No attendance records found"
        highlightOnHover
        pagination
      />
    </div>
  );
}

export default DailyAttendance;
