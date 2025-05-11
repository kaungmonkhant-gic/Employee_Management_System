import  { useState, useEffect } from "react";
import {  Button } from "react-bootstrap";
import DataTable from "../common/DataTable.js";
import EmpAttendanceService from "../Employee/Service/EmpAttendanceService.js";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [, setCheckInTime] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [, setLateTimeDisplay] = useState(null);
  const [isOnLeave, setIsOnLeave] = useState(false); // Track leave status

  // Loa=d Check-in State from Local Storage on Component Mount
  useEffect(() => {
    const savedCheckInStatus = localStorage.getItem("isCheckedIn");
    const savedCheckInTime = localStorage.getItem("checkInTime");
    const savedLateTime = localStorage.getItem("lateTime");
    const savedLeaveStatus = localStorage.getItem("isOnLeave"); // Get Leave status from Local Storage

    if (savedCheckInStatus === "true" && savedCheckInTime) {
      setIsCheckedIn(true);
      setCheckInTime(savedCheckInTime);
    }

    if (savedLateTime) {
      setLateTimeDisplay(savedLateTime);
    }

    if (savedLeaveStatus === "true") {
      setIsOnLeave(true); // Disable check-in if the user is on leave
    }

    // Fetch Attendance Data
    const fetchAttendanceData = async () => {
      try {
        const data = await EmpAttendanceService.getAllAttendance();
        setAttendanceData(data); // Set the data in the state
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchAttendanceData();
  }, []);

  // Helper function to format late time
    const formatMinutesToHours = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  // Handle check-in
  const handleCheckIn = async () => {
  if (isCheckingIn || isOnLeave) return; // Prevent check-in if user is on leave or already checking in
  setIsCheckingIn(true);

  const now = new Date();
  const formattedTime = now.toLocaleTimeString("en-US", { hour12: false });

  let officialCheckInTime = new Date();
  
  // Check if the user is on "Morning Half Leave" and adjust check-in time
  if (isOnLeave === "Morning Half Leave") {
    officialCheckInTime.setHours(13, 30, 0, 0); // 1:30 PM check-in time
  } else {
    officialCheckInTime.setHours(9, 0, 0, 0); // 9:00 AM check-in time
  }

  // Calculate late minutes
  const lateMin = now > officialCheckInTime ? Math.floor((now - officialCheckInTime) / 60000) : 0;

  // Format late time for display
  const lateTimeFormatted = formatMinutesToHours(lateMin);

  try {
    console.log("Attempting Check-in:", { formattedTime, lateMin });

    // Send check-in time & late minutes to backend
    await EmpAttendanceService.checkIn(formattedTime, lateMin);

    // Refresh attendance data after check-in
    const updatedData = await EmpAttendanceService.getAllAttendance();
    setAttendanceData(updatedData);

    setIsCheckedIn(true);
    setCheckInTime(formattedTime);

    // Save late time and check-in status for local storage
    setLateTimeDisplay(lateTimeFormatted);
    localStorage.setItem("isCheckedIn", "true");
    localStorage.setItem("checkInTime", formattedTime);
    localStorage.setItem("lateTime", lateTimeFormatted);
  } catch (error) {
    console.error("Check-in failed:", error.response?.data || error.message);
  } finally {
    setIsCheckingIn(false);
  }
};

  

  // Handle check-out
  const handleCheckOut = async () => {
    if (isCheckingOut || isOnLeave) return; // Prevent check-in if user is on leave or already checking in
    setIsCheckingOut(true);


    const now = new Date();
    const formattedTime = now.toLocaleTimeString("en-US", { hour12: false });

    try {
      console.log("Attempting Check-out:", { formattedTime });

      // Send check-out time to backend
      const updatedAttendance = await EmpAttendanceService.checkOut(formattedTime);
      console.log("Check-out Successful:", updatedAttendance);

      // Use spread operator to add the updated attendance to the existing state
      setAttendanceData((prevData) => [...prevData, updatedAttendance]);
      setIsCheckedIn(false);

      // Remove check-in data from local storage
      localStorage.removeItem("isCheckedIn");
      localStorage.removeItem("checkInTime");
      localStorage.removeItem("lateTime");
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
    {
      field: "lateMin",
      headerName: "Late Minutes",
      minWidth: 80,
      flex: 0.5,
      cellClassName: "text-center",
      renderCell: ({ value }) => formatMinutesToHours(value || 0),
    },
    { field: "hasOT",headerName: "Over Time", minWidth: 50, flex: 0.5, cellClassName: "text-center",
      render: (row) => (
        <span className={row.hasOT ? "text-success fw-bold" : "text-danger fw-bold"}>
          {row.hasOT ? "Yes" : "No"}
        </span>
      ),
     },
     { field: "status", headerName: "Status", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
  ];

  return (
    <div className="container mx-auto mt-4 px-4 sm:px-6 lg:px-8">
  <h2 className="text-lg sm:text-xl font-bold text-center">Daily Attendance</h2>

  {/* Disable check-in button if user is on leave */}
  <div className="flex justify-center mt-4">
    <Button
      variant={isCheckedIn ? "danger" : "primary"}
      onClick={isCheckedIn ? handleCheckOut : handleCheckIn}
      disabled={isCheckingIn || isCheckingOut || isOnLeave}
      className={`w-full sm:w-auto px-4 py-2 font-semibold rounded text-white transition duration-300
        ${isCheckingIn || isCheckingOut ? "bg-gray-400 cursor-not-allowed" : isCheckedIn ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}`}
    >
      {isCheckingIn ? "Checking in..." : isCheckingOut ? "Checking out..." : isCheckedIn ? "Check Out" : "Check In"}
    </Button>
  </div>

  {/* Show leave message if user is on leave */}
  {isOnLeave && <p className="text-center text-red-500 mt-2">You are on leave today. You cannot check in.</p>}

  {/* Render the attendance data */}
  <div className="mt-4 overflow-x-auto">
    <DataTable 
      fetchData={EmpAttendanceService.getAllAttendance} 
      data={attendanceData} 
      columns={columns} 
      keyField="id" 
      className="min-w-full bg-white shadow-md rounded-lg overflow-hidden"
    />
  </div>
</div>
  );
};

export default Attendance;
