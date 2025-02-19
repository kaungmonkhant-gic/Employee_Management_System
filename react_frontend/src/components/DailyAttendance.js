import React, { useEffect, useState } from "react";
import DailyAttendanceService from "../services/dailyAttendanceService.js";
import DataTable from "./common/DataTable"; 
import { Button } from "react-bootstrap";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);

  // Fetch attendance records from backend
  useEffect(() => {
    const fetchData = async () => {
      const data = await DailyAttendanceService.getAllAttendance();
      setAttendanceData(data);
    };
    fetchData();
  }, []);

  // Handle Check-in
  const handleCheckIn = async () => {
    if (isCheckingIn) return;
    setIsCheckingIn(true);

    const now = new Date();
    const formattedTime = now.toLocaleTimeString("en-US", { hour12: false });

    // Determine late minutes
    const checkInLimit = new Date();
    checkInLimit.setHours(7, 45, 0, 0);
    const lateMinutes = now > checkInLimit ? Math.round((now - checkInLimit) / 60000) : 0;

    try {
      console.log("Attempting Check-in:", { formattedTime, lateMinutes });

      const newAttendance = await DailyAttendanceService.checkIn(formattedTime, lateMinutes);

      console.log("Check-in Successful:", newAttendance);

      setAttendanceData([...attendanceData, newAttendance]);
      setIsCheckedIn(true);
      setCheckInTime(formattedTime);
    } catch (error) {
      console.error("Check-in failed:", error.response?.data || error.message);
    } finally {
      setIsCheckingIn(false);
    }
  };

  // Handle Check-out
  const handleCheckOut = async () => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString("en-US", { hour12: false });

    try {
      const updatedAttendance = await DailyAttendanceService.checkOut(formattedTime);
      setAttendanceData([...attendanceData, updatedAttendance]);
      setIsCheckedIn(false);
    } catch (error) {
      console.error("Check-out failed:", error.response?.data || error.message);
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
        <Button variant="primary" onClick={handleCheckIn} disabled={isCheckingIn}>
          {isCheckingIn ? "Checking in..." : "Check In"}
        </Button>
      ) : (
        <Button variant="danger" onClick={handleCheckOut}>
          Check Out
        </Button>
      )}

      <div className="mt-3">
        <DataTable fetchData={DailyAttendanceService.getAllAttendance} columns={columns} keyField="id" />
      </div>
    </div>
  );
};

export default Attendance;
