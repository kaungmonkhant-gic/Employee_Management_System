import React, { useState, useEffect } from "react";
import { BellFill, CheckCircleFill } from "react-bootstrap-icons";
import { Modal, Button } from "react-bootstrap";
import LeaveForm from "../common/LeaveForm";
import apiClient from "../api/apiclient";
import DataTable from "../common/DataTable";
import { useNavigate } from "react-router-dom";
import AttendanceController from "../Employee/Controller/AttendanceController";
import EmpAttendanceService from "../Employee/Service/EmpAttendanceService.js";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);


    // Load Check-in State from Local Storage on Component Mount
    useEffect(() => {
      const savedCheckInStatus = localStorage.getItem("isCheckedIn");
      const savedCheckInTime = localStorage.getItem("checkInTime");
  
      if (savedCheckInStatus === "true" && savedCheckInTime) {
        setIsCheckedIn(true);
        setCheckInTime(savedCheckInTime);
      }
    }, []);
  
    // Handle Check-in
    const handleCheckIn = async () => {
      if (isCheckingIn) return;
      setIsCheckingIn(true);
  
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("en-US", { hour12: false });
  
      // Prevent multiple check-ins in a day
      const todayDate = now.toISOString().split("T")[0];
      const hasCheckedInToday = attendanceData.some(
        (entry) => entry.date === todayDate && entry.checkInTime
      );
  
      if (hasCheckedInToday) {
        alert("You have already checked in today.");
        setIsCheckingIn(false);
        return;
      }
  
      try {
        console.log("Attempting Check-in:", { formattedTime });
  
        const newAttendance = await EmpAttendanceService.checkIn(formattedTime, 0);
        console.log("Check-in Successful:", newAttendance);
  
        setAttendanceData((prevData) => [...prevData, newAttendance]);
        setIsCheckedIn(true);
        setCheckInTime(formattedTime);
  
        // ✅ Save Check-in State to Local Storage
        localStorage.setItem("isCheckedIn", "true");
        localStorage.setItem("checkInTime", formattedTime);
      } catch (error) {
        console.error("Check-in failed:", error.response?.data || error.message);
      } finally {
        setIsCheckingIn(false);
      }
    };
  
    // Handle Check-out
    const handleCheckOut = async () => {
      if (isCheckingOut) return;
      setIsCheckingOut(true);
  
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("en-US", { hour12: false });
  
      try {
        console.log("Attempting Check-out:", { formattedTime });
  
        const updatedAttendance = await EmpAttendanceService.checkOut(formattedTime);
        console.log("Check-out Successful:", updatedAttendance);
  
        setAttendanceData((prevData) => [...prevData, updatedAttendance]);
        setIsCheckedIn(false);
  
        // ✅ Remove Check-in State from Local Storage
        localStorage.removeItem("isCheckedIn");
        localStorage.removeItem("checkInTime");
      } catch (error) {
        console.error("Check-out failed:", error.response?.data || error.message);
      } finally {
        setIsCheckingOut(false);
      }
    };

  // Define columns for DataTable
  const columns = [
    { field: "id", headerName: "Att.ID", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
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

      <Button variant={isCheckedIn ? "danger" : "primary"} onClick={isCheckedIn ? handleCheckOut : handleCheckIn} disabled={isCheckingIn || isCheckingOut}>
        {isCheckingIn ? "Checking in..." : isCheckingOut ? "Checking out..." : isCheckedIn ? "Check Out": "Check In"}
      </Button>

      <div className="mt-3">
        <DataTable fetchData={EmpAttendanceService.getAllAttendance} columns={columns} keyField="id" />
      </div>
    </div>
  );
};

export default Attendance;
