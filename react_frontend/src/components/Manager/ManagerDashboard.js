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

          {/* Employee Dropdown */}
          <div
            className="nav-link text-white"
            onClick={() => toggleMenu("employee")}
            style={{ cursor: "pointer" }}
          >
           <i className="bi bi-person-fill"></i> Employee
            <i
              className={`bi ms-2 ${
                menuState.employee ? "bi-caret-up-fill" : "bi-caret-down-fill"
              }`}
              style={{ color: "white" }}
            />
          </div>
          {menuState.employee && (
            <div className="ms-3">
              <Link to="/manager-dashboard/view-employeelist" className="nav-link text-white">
              <i className="bi bi-person-lines-fill"></i>Employee List
              </Link>
              <Link to="/manager-dashboard/view-leave-balance" className="nav-link text-white">
              <i className="bi bi-calendar-check"></i>View Leave Balance
              </Link>
              {/* <Link to="/manager-dashboard/employee-leave-record" className="nav-link text-white">
                Employee Leave
              </Link> */}
            </div>
          )}

          {/* Attendance Dropdown */}
          <div
            className="nav-link text-white"
            onClick={() => toggleMenu("attendance")}
            style={{ cursor: "pointer" }}
          >
           <i className="bi bi-journal-text"></i> Attendance
            <i
              className={`bi ms-2 ${
                menuState.attendance ? "bi-caret-up-fill" : "bi-caret-down-fill"
              }`}
              style={{ color: "white" }}
            />
          </div>
          {menuState.attendance && (
            <div className="ms-3">
              <Link to="/manager-dashboard/attendance/daily-attendance" className="nav-link text-white">
                Daily Attendance
              </Link>
              <Link to="/manager-dashboard/attendance/attendance-Record" className="nav-link text-white">
                Attendance Record
              </Link>
            </div>
          )}

          {/* Overtime Dropdown */}
          <div
            className="nav-link text-white"
            onClick={() => toggleMenu("overtime")}
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-clock"></i> Overtime
            <i
              className={`bi ms-2 ${
                menuState.overtime ? "bi-caret-up-fill" : "bi-caret-down-fill"
              }`}
              style={{ color: "white" }}
            />
          </div>
          {menuState.overtime && (
            <div className="ms-3">
              <Link to="/manager-dashboard/manager-ot-approval" className="nav-link text-white">
              <i className="bi bi-eye"></i>View Overtime Requests
              </Link>
              <Link to="/manager-dashboard/manager-ot-self" className="nav-link text-white">
              <i className="bi bi-clock"></i> Request Overtime
              </Link>
              {/* <Link to="/manager-dashboard/confirm-ot-request" className="nav-link text-white">
                Confirmed Requests
              </Link> */}
            </div>
          )}

          <Link to="/manager-dashboard/manager-leave" className="nav-link text-white">
          <i className="bi bi-envelope"></i>Leave
          </Link>
          <Link to="/manager-dashboard/profile" className="nav-link text-white">
          <i className="bi bi-person-circle"></i> Profile
          </Link>
          <Link to="/manager-dashboard/payroll" className="nav-link text-white">
          <i className="bi bi-briefcase"></i> Payroll
          </Link>
          <Link to="/manager-dashboard/salary-hist" className="nav-link text-white">
          <i className="bi bi-currency-dollar"></i> Salary History
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
                Welcome, {managerName}
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
