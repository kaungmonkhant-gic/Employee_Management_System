import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function EmployeeDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
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
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        className="d-flex flex-column p-4 text-white"
        style={{
          width: "250px", // Fixed width for sidebar
          minHeight: "100vh", // Full height of the screen
          backgroundColor: "#2980B9",
          position: "fixed", // Fix the sidebar in place
          top: 0,
          left: 0,
        }}
      >
        <h2 className="text-center mb-4">Employee Dashboard</h2>
        <nav className="nav flex-column">
          <Link to="/employee-dashboard" className="nav-link text-white">
            <i className="bi bi-house-door"></i> Dashboard
          </Link>
          <Link to="/employee-dashboard/overtime/otrequest" className="nav-link text-white">
            <i className="bi bi-clock"></i> Overtime
          </Link>
          <Link to="/employee-dashboard/profile" className="nav-link text-white">
            <i className="bi bi-person"></i> Profile
          </Link>
          <Link to="/employee-dashboard/attendance" className="nav-link text-white">
            <i className="bi bi-journal-text"></i> Attendance
          </Link>
          <Link to="/employee-dashboard/leave" className="nav-link text-white">
            <i className="bi bi-envelope"></i> Leave
          </Link>
          <Link to="/employee-dashboard/payroll" className="nav-link text-white">
            <i className="bi bi-briefcase"></i> Payroll
          </Link>
          <Link to="/employee-dashboard/salary-history" className="nav-link text-white">
            <i className="bi bi-currency-dollar"></i> Salary History
          </Link>

          {/* Quick Links Section */}
          <h6 className="text-white mt-4">Quick Links</h6>
          <Link to="/employee-dashboard/overtime/otrequest" className="nav-link text-white">
            <i className="bi bi-clock"></i> Overtime Requests
          </Link>
          <Link to="/employee-dashboard/attendance" className="nav-link text-white">
            <i className="bi bi-journal-text"></i> Attendance
          </Link>

          {/* Help Section */}
          <Link to="/employee-dashboard/help" className="nav-link text-white">
            <i className="bi bi-question-circle"></i> Help
          </Link>

          <button onClick={handleLogout} className="btn btn-secondary mt-4">
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className="main-content flex-grow-1 p-4 bg-light"
        style={{ marginLeft: "250px" }} // Offset content to make space for the fixed sidebar
      >
        {/* Header */}
        <header className="d-flex justify-content-between align-items-center px-3 py-2 rounded shadow-sm mb-3" style={{ backgroundColor: "#2980B9", height: "60px" }}>
          <div className="d-flex align-items-center">
            <div className="avatar me-2 d-flex justify-content-center align-items-center" style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "white", color: "#2980B9", fontSize: "1rem", fontWeight: "bold" }}>
              {employeeName?.charAt(0)}
            </div>
            <div>
              <h5 className="mb-0" style={{ fontSize: "1.2rem", fontWeight: "600", color: "white" }}><i className="bi bi-person"></i>  {/* Employee */} {employeeName}</h5>
              <p className="mb-0" style={{ fontSize: "0.9rem", color: "#d1e8ff" }}>Your dashboard overview</p>
            </div>
          </div>
          <button onClick={handleLogout} className="btn btn-light btn-sm rounded-pill px-3">
            Logout
          </button>
        </header>

        {/* Dashboard Overview */}
        {location.pathname === "/employee-dashboard" && (
          <div className="row my-4">
            
            <div className="col-12 col-md-6 mb-4 mb-md-0">
              <div className="card shadow-sm border-light rounded p-3">
                <h5>🕒 Overtime Requests</h5>
                <p>Manage your overtime requests here.</p>
                <Link to="/employee-dashboard/overtime/otrequest" className="btn btn-primary">View Overtime</Link>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="card shadow-sm border-light rounded p-3">
                <h5>📝 Attendance</h5>
                <p>View your attendance records.</p>
                <Link to="/employee-dashboard/attendance" className="btn btn-primary">View Attendance</Link>
              </div>
            </div>
            <div className="mb-4">
     
      </div>
          </div>
          
        )}

        {/* Render the requested page */}
        <Outlet />
      </div>
    </div>
  );
}

export default EmployeeDashboard;
