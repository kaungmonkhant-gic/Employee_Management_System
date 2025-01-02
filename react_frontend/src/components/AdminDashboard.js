import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom"; 
import "./AdminDashboard.css"; 

function AdminDashboard() {
  const navigate = useNavigate(); 
  const location = useLocation(); 

  const handleLogout = () => {
  
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
   
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Admin Dashboard</h2>
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/admin-dashboard" className="sidebar-item">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/employee" className="sidebar-item">
              Employee
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/attendance" className="sidebar-item">
              Attendance
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/ot" className="sidebar-item">
              OT (Overtime)
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/profile" className="sidebar-item">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/admin-dashboard/payroll" className="sidebar-item">
              PayRoll
            </Link>
          </li>
          <li>
          
            <button onClick={handleLogout} className="sidebar-item logout-button">
              Logout
            </button>
          </li>
        </ul>
      </div>

      <div className="main-content">
      
        {location.pathname === "/admin-dashboard" && (
          <header className="header">
            <h1>Welcome to the Admin Dashboard</h1>
          </header>
        )}

      
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
