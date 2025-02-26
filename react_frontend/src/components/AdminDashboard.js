import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [employeeName, setEmployeeName] = useState("");

  useEffect(() => {
    // Retrieve the user's name from local storage or an API
    const storedEmployeeName = localStorage.getItem("employeeName");
    setEmployeeName(storedEmployeeName || "Admin"); // Fallback to "Admin" if no name is found
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("employeeName"); // Clear user name on logout
    navigate("/login");
  };

  return (
    <div className="d-flex min-vh-100" style={{ overflowY: "hidden", height: "100vh" }}>
      {/* Sidebar */}
      <div
        className="d-flex flex-column text-dark p-3"
        style={{
          width: "250px",
          minHeight: "100vh",
          overflowY: "auto",
          backgroundColor: "rgb(144, 198, 242)",
        }}
      >
        <h2 className="text-center mb-4">Admin Dashboard</h2>
        <nav className="nav flex-column">
          <Link to="/admin-dashboard" className="nav-link text-dark">Dashboard</Link>

          <div
            className="nav-link text-dark"
            onClick={() => setShowSubMenu(!showSubMenu)}
            style={{ cursor: "pointer" }}
          >
            Employee
            <i
              className={`bi ms-2 ${showSubMenu ? "bi-caret-up-fill" : "bi-caret-down-fill"}`}
              style={{ color: "white" }}
            />
          </div>

          {showSubMenu && (
            <div className="ms-3">
              <Link to="/admin-dashboard/employee" className="nav-link text-dark">Employee List</Link>
              <Link to="/admin-dashboard/showleave" className="nav-link text-light">Show Leave</Link>
              <Link to="/admin-dashboard/salary" className="nav-link text-light">Show Salary</Link>
            </div>
          )}

          <div
            className="nav-link text-dark"
            onClick={() => setShowSubMenu(!showSubMenu)}
            style={{ cursor: "pointer" }}
          >
            Attendance
            <i
              className={`bi ms-2 ${showSubMenu ? "bi-caret-up-fill" : "bi-caret-down-fill"}`}
              style={{ color: "white" }}
            />
          </div>

          {showSubMenu && (
            <div className="ms-3">
              <Link to="/admin-dashboard/attendance/daily-attendance" className="nav-link text-dark">
                Daily Attendance
              </Link>
              <Link to="/admin-dashboard/attendance/attendance-Record" className="nav-link text-dark">
                Attendance Record
              </Link>
            </div>
          )}

          <Link to="/admin-dashboard/leave" className="nav-link text-dark">Leave</Link>
          <Link to="/admin-dashboard/ot" className="nav-link text-dark">OT (Overtime)</Link>
          <Link to="/admin-dashboard/profile" className="nav-link text-dark">Profile</Link>
          <Link to="/admin-dashboard/payroll" className="nav-link text-dark">Payroll</Link>

          <button onClick={handleLogout} className="btn btn-secondary mt-4">Logout</button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1" style={{ overflowY: "auto" }}>
        {/* Top Bar */}
        <header className="bg-primary text-white p-3 d-flex justify-content-between align-items-center">
          <h4 className="m-0">Welcome, {employeeName}</h4>
          <button
            onClick={handleLogout}
            className="btn btn-light btn-sm"
            style={{ fontWeight: "bold" }}
          >
            Logout
          </button>
        </header>

        {location.pathname === "/admin-dashboard" && (
          <header className="bg-light p-3 border-bottom">
            <h1>Welcome to the Admin Dashboard</h1>
          </header>
        )}

        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
