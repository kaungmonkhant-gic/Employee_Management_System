import React from "react";
import "./Tasks.css";

function Tasks() {
  return (
    <div className="tasks-container">
      <h2>Assigned Tasks</h2>
      <ul className="tasks-list">
        <li className="task">
          <span>Complete Project A Documentation</span>
          <span className="task-status">Pending</span>
        </li>
        <li className="task">
          <span>Fix Issue #12345</span>
          <span className="task-status completed">Completed</span>
        </li>
        <li className="task">
          <span>Prepare for Team Meeting</span>
          <span className="task-status in-progress">In Progress</span>
        </li>
      </ul>
    </div>
  );
}

export default Tasks;
