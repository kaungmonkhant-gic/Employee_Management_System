import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function EmployeeDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showOvertimeSubMenu, setShowOvertimeSubMenu] = useState(false);
  const [employeeName, setEmployeeName] = useState("");

  useEffect(() => {
    const storedEmployeeName = localStorage.getItem("employeeName");
    setEmployeeName(storedEmployeeName || "Employee"); // Fallback to "Employee" if no name is found
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("employeeName"); // Clear employee name on logout
    navigate("/login");
  };

  return (
    <div className="d-flex min-vh-100" style={{ overflowY: "hidden", height: "100vh" }}>
      {/* Sidebar */}
      <div className="d-flex flex-column p-3" style={{ width: "250px", backgroundColor: "#2980B9", color: "#FFFFFF" }}>
        <h2 className="text-center mb-4">Employee Dashboard</h2>
        <nav className="nav flex-column">
          <Link to="/employee-dashboard" className="nav-link" style={{ color: "#FFFFFF" }}>
            🏠 Dashboard
          </Link>

          <div
            className="nav-link"
            onClick={() => setShowOvertimeSubMenu(!showOvertimeSubMenu)}
            style={{ cursor: "pointer", color: "#FFFFFF" }}
          >
            🕒 Overtime
            <i
              className={`bi ms-2 ${showOvertimeSubMenu ? "bi-caret-up-fill" : "bi-caret-down-fill"}`}
              style={{ color: "white" }}
            />
          </div>

          {showOvertimeSubMenu && (
            <div className="ms-3">
              <Link to="/employee-dashboard/overtime/otrequest" className="nav-link" style={{ color: "#FFFFFF" }}>
                Overtime Request
              </Link>
              <Link to="/employee-dashboard/overtime/otrecord" className="nav-link" style={{ color: "#FFFFFF" }}>
                Overtime Record
              </Link>
            </div>
          )}

          <Link to="/employee-dashboard/profile" className="nav-link" style={{ color: "#FFFFFF" }}>
            👤 Profile
          </Link>
          <Link to="/employee-dashboard/attendance" className="nav-link" style={{ color: "#FFFFFF" }}>
            📝 Attendance
          </Link>
          <Link to="/employee-dashboard/leave" className="nav-link" style={{ color: "#FFFFFF" }}>
            ✉️ Leave
          </Link>
          <Link to="/employee-dashboard/payroll" className="nav-link" style={{ color: "#FFFFFF" }}>
            💼 Payroll
          </Link>

          <button onClick={handleLogout} className="btn btn-secondary mt-4">
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4" style={{ backgroundColor: "#f8f9fa" }}>
        {/* Header */}
        <header className="p-3 d-flex justify-content-between align-items-center rounded" style={{ backgroundColor: "#2980B9", color: "#FFFFFF" }}>
          <h4>👋 Welcome, {employeeName}</h4>
          <button onClick={handleLogout} className="btn btn-light btn-sm">Logout</button>
        </header>

        {/* Employee Dashboard Content */}
        {location.pathname === "/employee-dashboard" && (
          <>
            <div className="row my-4">
              <div className="col-md-6">
                <div className="card shadow-sm p-3">
                  <h5>🕒 Overtime Requests</h5>
                  <p>Manage your overtime requests here.</p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card shadow-sm p-3">
                  <h5>📝 Attendance</h5>
                  <p>View your attendance records.</p>
                </div>
              </div>
            </div>

            <div className="row my-4">
              <div className="col-md-6">
                <div className="card shadow-sm p-3">
                  <h5>📅 Upcoming Leave</h5>
                  <ul>
                    <li>John Doe - March 5</li>
                    <li>Jane Smith - March 10</li>
                  </ul>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card shadow-sm p-3">
                  <h5>💼 Payroll Overview</h5>
                  <p>Your latest payroll details will be displayed here.</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Show the requested page */}
        <Outlet />
      </div>
    </div>
  );
}

export default EmployeeDashboard;
