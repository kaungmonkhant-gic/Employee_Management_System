import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";


function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSubMenu, setShowSubMenu] = React.useState(false);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div
      className="d-flex min-vh-100"
      style={{
        overflowY: "hidden", // Prevent vertical scroll on the main layout
        height: "100vh", // Make sure the container takes full height of the viewport
      }}
    >
      {/* Sidebar */}
      <div
        className="d-flex flex-column bg-dark text-light p-3"
        style={{
          width: "250px",
          minHeight: "100vh", // Ensure the sidebar covers full height
          overflowY: "auto", // Allow vertical scrolling within sidebar if needed
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
          
          <div className="nav-link text-light" 
        onClick={() => setShowSubMenu(!showSubMenu)} 
        style={{ cursor: "pointer" }}
      >
        Attendance
        <i
          className={`bi ms-2 ${
            showSubMenu ? "bi-caret-up-fill" : "bi-caret-down-fill"
          }`}
          style={{ color: "white" }}
        />
      </div>

      {/* Dropdown Submenu */}
      {showSubMenu && (
        <div className="ms-3">
          <Link to="/admin-dashboard/attendance/daily-attendance" className="nav-link text-light">
            Daily Attendance
          </Link>
          <Link to="/admin-dashboard/attendance/attendance-Record" className="nav-link text-light">
            Attendance Record
          </Link>
        </div>
      )}
    
          
          <Link to="/admin-dashboard/leave" className="nav-link text-light">
            Leave
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
      <div
        className="flex-grow-1"
        style={{
          overflowY: "auto", // Allow vertical scrolling within the content area if needed
        }}
      >
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