import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function ManagerDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [managerName, setManagerName] = useState("");
  // Separate state for each submenu
  const [menuState, setMenuState] = useState({
    employee: false,
    attendance: false,
    overtime: false,
  });
  const toggleMenu = (menu) => {
    setMenuState((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu], // Toggle only the clicked menu
    }));
  };

  useEffect(() => {
    const storedManagerName = localStorage.getItem("managerName");
    setManagerName(storedManagerName || "Manager");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("managerName");
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
        <h2 className="text-center mb-4">Manager Dashboard</h2>
        <nav className="nav flex-column">
          <Link to="/manager-dashboard" className="nav-link text-white">
            <i className="bi bi-house-door"></i> Dashboard
          </Link>

        <div className="nav-link text-white d-flex justify-content-between align-items-center" onClick={() => toggleMenu("employee")} 
          style={{ 
                 cursor: "pointer", 
                 transition: "background 0.3s ease", 
                 padding: "10px", 
                 borderRadius: "5px" 
                }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
          <span><i className="bi bi-person-fill me-2"></i> Employee</span>
          <i className={`bi ${menuState.employee ? "bi-caret-up-fill" : "bi-caret-down-fill"}`} 
          style={{ color: "white", transition: "transform 0.3s ease" }}/>
        </div>

          {menuState.employee && (
            <div className="ms-3">
              <Link to="/manager-dashboard/view-employeelist" className="nav-link text-white">
              <i className="bi bi-person-lines-fill me-2"></i>Employee List
              </Link>
              <Link to="/manager-dashboard/view-leave-balance" className="nav-link text-white">
              <i className="bi bi-calendar-check me-2"></i>Leave Balance
              </Link>
             
            </div>
          )}

         
          {/* Attendance Dropdown */}
                    <div className="nav-link text-light d-flex justify-content-between align-items-center" onClick={() => toggleMenu("attendance")}
                     style={{ cursor: "pointer" }}>
                    <span>
                    <i className="bi bi-person-check"></i> Attendance
                    </span>
                    <i className={`bi ${menuState.attendance ? "bi-caret-up-fill" : "bi-caret-down-fill"}`} style={{ color: "white" }}/>
                    </div>
                    {menuState.attendance && (
                      <div className="ms-3">
                        <Link to="/manager-dashboard/attendance/manager-daily-attendance" className="nav-link" style={{ color: "#FFFFFF" }}>
                        <i className="bi bi-alarm me-2"></i>
                        Daily Attendance
                        </Link>
                        <Link to="/manager-dashboard/attendance/manager-attendance-record" className="nav-link" style={{ color: "#FFFFFF" }}>
                        <i className="bi bi-file-earmark-text me-2"></i>
                        Attendance Record
                        </Link>
                      </div>
                    )}

          <div className="nav-link text-white d-flex justify-content-between align-items-center" onClick={() => toggleMenu("overtime")} 
          style={{ 
                 cursor: "pointer", 
                 transition: "background 0.3s ease", 
                 padding: "10px", 
                 borderRadius: "5px" 
                }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
          <span><i className="bi bi-hourglass-split me-2"></i> Overtime</span>
          <i className={`bi ${menuState.overtime ? "bi-caret-up-fill" : "bi-caret-down-fill"}`} 
          style={{ color: "white", transition: "transform 0.3s ease" }}/>
        </div>
          {menuState.overtime && (
            <div className="ms-3">
              <Link to="/manager-dashboard/manager-ot-approval" className="nav-link text-white">
              <i className="bi bi-eye me-2"></i>View Requests
              </Link>
              <Link to="/manager-dashboard/manager-ot-self" className="nav-link text-white">
              <i className="bi bi-clock me-2"></i> Apply for OT
              </Link>
              
            </div>
          )}

          <Link to="/manager-dashboard/manager-leave" className="nav-link text-white">
          <i className="bi bi-envelope me-2"></i>Leave
          </Link>
          <Link to="/manager-dashboard/profile" className="nav-link text-white">
          <i className="bi bi-person-circle me-2"></i> Profile
          </Link>
          <Link to="/manager-dashboard/payroll" className="nav-link text-white">
          <i className="bi bi-briefcase me-2"></i> Payroll
          </Link>
          <Link to="/manager-dashboard/salary-hist" className="nav-link text-white">
          <i className="bi bi-currency-dollar me-2"></i> Salary History
          </Link>
          
        </nav>
      </div>

      {/* Main Content */}
      <div
        className="main-content flex-grow-1 p-4 bg-light"
        style={{ marginLeft: "250px" }} // Offset content to make space for the fixed sidebar
      >
        {/* Header */}
        <header
          className="d-flex justify-content-between align-items-center px-3 py-2 rounded shadow-sm mb-3"
          style={{ backgroundColor: "#2980B9", height: "60px" }}
        >
          <div className="d-flex align-items-center">
            <div
              className="avatar me-2 d-flex justify-content-center align-items-center"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "white",
                color: "#2980B9",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              {managerName?.charAt(0)}
            </div>
            <div>
              <h5 className="mb-0" style={{ fontSize: "1.2rem", fontWeight: "600", color: "white" }}>
              <i className="bi bi-person-check"></i>  {/* Manager */} {managerName}
              </h5>
              <p className="mb-0" style={{ fontSize: "0.9rem", color: "#d1e8ff" }}>
                Your dashboard overview
              </p>
            </div>
          </div>

          <button onClick={handleLogout} className="btn btn-light btn-sm rounded-pill px-3">
            Logout
          </button>
        </header>

        {/* Dashboard Overview */}
        {location.pathname === "/manager-dashboard" && (
          <div className="row my-4">
            <div className="col-12 col-md-6 mb-4 mb-md-0">
              <div className="card shadow-sm border-light rounded p-3">
                <h5>📊 Overtime Summary</h5>
                <ul>
                  <li>Pending Requests: 10</li>
                  <li>Approved Requests: 20</li>
                  <li>Rejected Requests: 5</li>
                </ul>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="card shadow-sm border-light rounded p-3">
                <h5>🔔 Recent Activities</h5>
                <ul>
                  <li>✔ Manager approved an OT request</li>
                  <li>📢 New OT request submitted</li>
                </ul>
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

export default ManagerDashboard;
