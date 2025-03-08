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
   <div className="d-flex flex-column p-3" style={{ width: "250px", backgroundColor: "#2980B9", color: "#FFFFFF" }}>
     <h2 className="text-center mb-4">Employee Dashboard</h2>
     <nav className="nav flex-column">
          <Link to="/employee-dashboard" className="nav-link text-white">
            🏠 Dashboard
          </Link>
          {/* Overtime Section */}
          <Link to="/employee-dashboard/overtime/otrequest" className="nav-link text-white">
            🕒 Overtime 
          </Link>
          
          {/* Other Links */}
          <Link to="/employee-dashboard/profile" className="nav-link text-white">
            👤 Profile
          </Link>
          <Link to="/employee-dashboard/attendance" className="nav-link text-white">
            📝 Attendance
          </Link>
<<<<<<< HEAD
          <Link to="/employee-dashboard/leave" className="nav-link" style={{ color: "#FFFFFF" }}>
            📅 Leave
=======
          <Link to="/employee-dashboard/leave" className="nav-link text-white">
            ✉️ Leave
>>>>>>> 576afdd096a37513116f91d02b66d58eaab8b531
          </Link>
          <Link to="/employee-dashboard/payroll" className="nav-link text-white">
            💼 Payroll
          </Link>
          <button onClick={handleLogout} className="btn btn-secondary mt-4">
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content flex-grow-1 p-4 bg-light">
        {/* Header */}
        <header className="d-flex justify-content-between align-items-center bg-primary text-white p-3 rounded">
          <h4>👋 Welcome, {employeeName}</h4>
          {/* <button onClick={handleLogout} className="btn btn-light btn-sm">
            Logout
          </button> */}
        </header>

        {/* Dashboard Overview */}
        {location.pathname === "/employee-dashboard" && (
          <div className="row my-4">
            <div className="col-12 col-md-6 mb-4 mb-md-0">
              <div className="card shadow-sm p-3">
                <h5>🕒 Overtime Requests</h5>
                <p>Manage your overtime requests here.</p>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="card shadow-sm p-3">
                <h5>📝 Attendance</h5>
                <p>View your attendance records.</p>
              </div>
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
