import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
function Tasks() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Assigned Tasks</h2>
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Complete Project A Documentation
          <span className="badge bg-warning text-dark">Pending</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Fix Issue #12345
          <span className="badge bg-success">Completed</span>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Prepare for Team Meeting
          <span className="badge bg-primary">In Progress</span>
        </li>
      </ul>
    </div>
  );
}

export default Tasks;
