import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "./common/DataTable"; // Assuming DataTable is in the same folder
import { Button } from "react-bootstrap";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);

  // Fetch attendance records from backend
  const fetchAttendance = async () => {
    try {
      const response = await axios.get("/api/attendance");
      return response.data;
    } catch (error) {
      console.error("Error fetching attendance:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAttendance();
      setAttendanceData(data);
    };
    fetchData();
  }, []);

  // Handle Check-in
  const handleCheckIn = async () => {
    if (isCheckingIn) return; // Prevent duplicate clicks
    setIsCheckingIn(true);

    const now = new Date();
    const formattedTime = now.toLocaleTimeString("en-US", { hour12: false });

    // Determine late minutes
    const checkInLimit = new Date();
    checkInLimit.setHours(7, 45, 0, 0);
    const lateMinutes = now > checkInLimit ? Math.round((now - checkInLimit) / 60000) : 0;

    try {
      // Sending check-in request to backend
      const response = await axios.post("/api/attendance/checkin", {
        checkInTime: formattedTime,
        lateMinutes,
      });

      setAttendanceData([...attendanceData, response.data.record]);
      setIsCheckedIn(true);
      setCheckInTime(formattedTime);
    } catch (error) {
      console.error("Check-in failed:", error);
    } finally {
      setIsCheckingIn(false); // Ensure button is re-enabled on failure
    }
  };

  // Handle Check-out
  const handleCheckOut = async () => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString("en-US", { hour12: false });

    try {
      const response = await axios.post("/api/attendance/checkout", {
        checkOutTime: formattedTime,
      });

      setAttendanceData([...attendanceData, response.data.record]);
      setIsCheckedIn(false);
    } catch (error) {
      console.error("Check-out failed:", error);
    }
  };

  // Define columns for DataTable
  const columns = [
    { field: "id", headerName: "No.", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "date", headerName: "Date", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "employeeName", headerName: "Employee Name", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "checkInTime", headerName: "Check-In Time", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "checkOutTime", headerName: "Check-Out Time", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "lateMinutes", headerName: "Late Minutes", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "status", headerName: "Status", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
  ];

  return (
    <div className="container mt-4">
      <h2>Daily Attendance</h2>

      {!isCheckedIn ? (
        <button
          className="btn btn-primary"
          onClick={handleCheckIn}
          disabled={isCheckingIn} // Disable while processing
        >
          {isCheckingIn ? "Checking in..." : "Check In"}
        </button>
      ) : (
        <button className="btn btn-danger" onClick={handleCheckOut}>
          Check Out
        </button>
      )}

      <div className="mt-3">
        <DataTable fetchData={fetchAttendance} columns={columns} keyField="id" />
      </div>
    </div>
  );
};

export default Attendance;
