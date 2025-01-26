import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <div
        className="d-flex flex-column bg-dark text-light p-3"
        style={{
          width: "250px",
          minHeight: "100vh", // Ensure the sidebar is full height
        }}
      >
        <h2 className="text-center mb-4">Admin Dashboard</h2>
        <nav className="nav flex-column">
          <Link to="/admin-dashboard" className="nav-link text-light">
            Dashboard
          </Link>
          <Link to="/admin-dashboard/employee" className="nav-link text-light">
            Employee
          </Link>
          <Link
            to="/admin-dashboard/attendance"
            className="nav-link text-light"
          >
            Attendance
          </Link>
          <Link to="/admin-dashboard/ot" className="nav-link text-light">
            OT (Overtime)
          </Link>
          <Link to="/admin-dashboard/profile" className="nav-link text-light">
            Profile
          </Link>
          <Link to="/admin-dashboard/payroll" className="nav-link text-light">
            Payroll
          </Link>
          <button onClick={handleLogout} className="btn btn-danger mt-4">
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1">
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
