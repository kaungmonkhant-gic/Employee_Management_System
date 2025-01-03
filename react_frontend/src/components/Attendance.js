import React, { useState } from "react";
import "./Attendance.css";

// Sample data for employees (consider fetching from an API in a real scenario)
const employeesData = [
  { id: 1, name: "山田", email: "amada@gmail.com" },
  { id: 2, name: "小林", email: "kobayashi@gmail.com" },
  { id: 3, name: "岩永", email: "iwanaga@gmail.com" },
];

function Attendance() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [isMarked, setIsMarked] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);

  // Mark attendance for a selected employee on a given date
  const markAttendance = (employeeId) => {
    if (!selectedDate) {
      alert("Please select a date to mark attendance.");
      return;
    }

    const existingRecordIndex = attendanceRecords.findIndex(
      (record) => record.date === selectedDate && record.employeeId === employeeId
    );

    if (existingRecordIndex >= 0) {
      alert("Attendance is already marked for this employee on this date.");
      return;
    }

    const newAttendance = {
      date: selectedDate,
      employeeId,
      status: isMarked ? "Present" : "Absent",
    };

    setAttendanceRecords([...attendanceRecords, newAttendance]);
  };

  // Edit an existing attendance record
  const handleEdit = (record) => {
    setEditingRecord(record);
    setSelectedDate(record.date);
    setIsMarked(record.status === "Present");
  };

  // Save the updated attendance record
  const handleSaveEdit = () => {
    const updatedRecords = attendanceRecords.map((record) =>
      record.date === editingRecord.date && record.employeeId === editingRecord.employeeId
        ? { ...record, status: isMarked ? "Present" : "Absent" }
        : record
    );
    setAttendanceRecords(updatedRecords);
    setEditingRecord(null);
  };

  return (
    <div className="attendance-container">
      <h2>Attendance Management</h2>

      {/* Date Selection */}
      <div className="date-selector">
        <label htmlFor="date-picker">Select Date:</label>
        <input
          id="date-picker"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Attendance Status Selection */}
      <div className="mark-toggle">
        <label htmlFor="attendance-status">Mark Attendance as:</label>
        <select
          id="attendance-status"
          onChange={(e) => setIsMarked(e.target.value === "Present")}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </div>

      {/* Employee List */}
      <div className="employee-list">
        <h3>Employees</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employeesData.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>
                  <button
                    onClick={() => markAttendance(employee.id)}
                    className="mark-button"
                  >
                    Mark Attendance
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Attendance Records */}
      <div className="attendance-records">
        <h3>Attendance Records</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Employee Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record, index) => {
              const employee = employeesData.find((emp) => emp.id === record.employeeId);
              return (
                <tr key={index}>
                  <td>{record.date}</td>
                  <td>{employee ? employee.name : "Unknown"}</td>
                  <td>{record.status}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(record)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Edit Attendance Modal */}
      {editingRecord && (
        <div className="edit-modal">
          <div className="modal-content">
            <h3>Edit Attendance for {editingRecord.date}</h3>
            <div>
              <label htmlFor="status-select">Change Status to:</label>
              <select
                id="status-select"
                value={isMarked ? "Present" : "Absent"}
                onChange={(e) => setIsMarked(e.target.value === "Present")}
              >
                <option value="Present">Present</option>
                <option value="Absent">Absent</option>
              </select>
            </div>
            <button onClick={handleSaveEdit} className="save-button">
              Save Changes
            </button>
            <button
              onClick={() => setEditingRecord(null)}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Attendance;
