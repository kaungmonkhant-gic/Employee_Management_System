import React from "react";
import "./EmpAttendance.css";

function Attendance() {
  return (
    <div className="attendance-container">
      <h2>Attendance</h2>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2025-01-01</td>
            <td className="status present">Present</td>
          </tr>
          <tr>
            <td>2025-01-02</td>
            <td className="status absent">Absent</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;
