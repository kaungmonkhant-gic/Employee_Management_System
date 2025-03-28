import React, { useEffect, useState } from 'react';
import EmpAttendanceService from '../Employee/Service/EmpAttendanceService';
import DataTable from '../common/DataTable';
import { FaEdit, FaTrash } from 'react-icons/fa';


const AttendanceRecord = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [editingAttendance, setEditingAttendance] = useState(null);
  const [headerText, setHeaderText] = useState("Attendance Record");

  // Fetch attendance data from the backend on mount
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const data = await EmpAttendanceService.getAllAttendance();
        // Add ID to each record (if not already present)
        const updatedData = data.map((item, index) => {
          item.id = index + 1;
          return item;
        });
        setAttendanceData(updatedData);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchAttendance();
  }, []);

  // Handle Edit click
  const handleEdit = (attendance) => {
    setHeaderText("Edit Attendance");
    setEditingAttendance(attendance);
  };

  // Define columns for DataTable
  const columns = [
    { field: "id", headerName: "Att.ID", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "date", headerName: "Date", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { field: "employeeName", headerName: "Employee Name", minWidth: 150, flex: 1, cellClassName: "text-center" },
    { field: "checkInTime", headerName: "Check-In Time", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { field: "checkOutTime", headerName: "Check-Out Time", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { field: "lateMin", headerName: "Late Minutes", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { field: "lunchBreak", headerName: "Lunch Break", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { field: "status", headerName: "Status", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { 
      field: "actions",
      headerName: "Actions",
      minWidth: 120,
      flex: 0.8,
      cellClassName: "text-center",
      render: (row) => (
        <div className="flex justify-center gap-2"> {/* Center actions */}
          <button onClick={() => handleEdit(row)} className="text-blue-500 hover:text-blue-700">
            <FaEdit />
          </button>
          <button className="text-red-500 hover:text-red-700">
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <h2 className="text-2xl font-bold">{headerText}</h2>

      <div className="mt-3">
        {/* DataTable component to display attendance */}
        <DataTable 
          data={attendanceData} 
          columns={columns} 
          keyField="id" 
        />
      </div>
    </div>
  );
};

export default AttendanceRecord;
