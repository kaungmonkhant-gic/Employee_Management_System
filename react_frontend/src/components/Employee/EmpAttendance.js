import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function EmpAttendance() {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Attendance</h2>
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2025-01-01</td>
            <td>
              <span className="badge bg-success">Present</span>
            </td>
          </tr>
          <tr>
            <td>2025-01-02</td>
            <td>
              <span className="badge bg-danger">Absent</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default EmpAttendance;
