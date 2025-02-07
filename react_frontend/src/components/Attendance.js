import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AttendanceForm from "./common/AttendanceForm";

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
      (record) =>
        record.date === selectedDate && record.employeeId === employeeId
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
      record.date === editingRecord.date &&
      record.employeeId === editingRecord.employeeId
        ? { ...record, status: isMarked ? "Present" : "Absent" }
        : record
    );
    setAttendanceRecords(updatedRecords);
    setEditingRecord(null);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Attendance Management</h2>

      {/* Date Selection */}
      <div className="mb-3">
        <label htmlFor="date-picker" className="form-label">
          Select Date:
        </label>
        <input
          id="date-picker"
          type="date"
          className="form-control"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Attendance Status Selection */}
      <div className="mb-4">
        <label htmlFor="attendance-status" className="form-label">
          Mark Attendance as:
        </label>
        <select
          id="attendance-status"
          className="form-select"
          onChange={(e) => setIsMarked(e.target.value === "Present")}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </div>

      {/* <AttendanceForm employees={employeesData} markAttendance={markAttendance} /> */}
      <AttendanceForm employees={employeesData} markAttendance={markAttendance} />  

      {/* Employee List */}
      <div className="mb-5">
        <h3>Employees</h3>
        <table className="table table-bordered">
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
                    className="btn btn-primary"
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
      <div>
        <h3>Attendance Records</h3>
        <table className="table table-striped">
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
              const employee = employeesData.find(
                (emp) => emp.id === record.employeeId
              );
              return (
                <tr key={index}>
                  <td>{record.date}</td>
                  <td>{employee ? employee.name : "Unknown"}</td>
                  <td>{record.status}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(record)}
                      className="btn btn-warning me-2"
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
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Edit Attendance for {editingRecord.date}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditingRecord(null)}
                ></button>
              </div>
              <div className="modal-body">
                <label htmlFor="status-select" className="form-label">
                  Change Status to:
                </label>
                <select
                  id="status-select"
                  className="form-select"
                  value={isMarked ? "Present" : "Absent"}
                  onChange={(e) => setIsMarked(e.target.value === "Present")}
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={handleSaveEdit}>
                  Save Changes
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditingRecord(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Attendance;
