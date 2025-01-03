import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "./EmployeeDashboard.css"; // Ensure you have appropriate styles for Employee Dashboard

function EmployeeDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Employee Dashboard</h2>
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/employee-dashboard" className="sidebar-item">
              Home
            </Link>
          </li>
          <li>
            <Link to="/employee-dashboard/profile" className="sidebar-item">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/employee-dashboard/attendance" className="sidebar-item">
              Attendance
            </Link>
          </li>
          <li>
            <Link to="/employee-dashboard/salary" className="sidebar-item">
              Salary
            </Link>
          </li>
          <li>
            <Link to="/employee-dashboard/tasks" className="sidebar-item">
              Tasks
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="sidebar-item logout-button"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      <div className="main-content">
        {location.pathname === "/employee-dashboard" && (
          <header className="header">
            <h1>Welcome to the Employee Dashboard</h1>
          </header>
        )}

        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
