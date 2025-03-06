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
      <div className="d-flex flex-column p-3" style={{ width: "250px", backgroundColor: "#2980B9", color: "#FFFFFF" }}>
        <h2 className="text-center mb-4">Manager Dashboard</h2>
        <nav className="nav flex-column">

          <Link to="/manager-dashboard" className="nav-link text-light">
          🏠 Dashboard
          </Link>

          {/* Employee Dropdown */}
          <div className="nav-link text-light" onClick={() => toggleMenu("employee")} style={{ cursor: "pointer" }}>
            Employee
            <i className={`bi ms-2 ${menuState.employee ? "bi-caret-up-fill" : "bi-caret-down-fill"}`} style={{ color: "white" }} />
          </div>
          {menuState.employee && (
            <div className="ms-3">
              <Link to="/manager-dashboard/view-employeelist" className="nav-link text-light">Employee List</Link>
              <Link to="/manager-dashboard/employee-leave-record" className="nav-link text-light">Employee Leave</Link>
              <Link to="/manager-dashboard/salary" className="nav-link text-light">Salary</Link>
            </div>
          )}

          {/* Attendance Dropdown */}
          <div className="nav-link text-light" onClick={() => toggleMenu("attendance")} style={{ cursor: "pointer" }}>
            📝 Attendance
            <i className={`bi ms-2 ${menuState.attendance ? "bi-caret-up-fill" : "bi-caret-down-fill"}`} style={{ color: "white" }} />
          </div>
          {menuState.attendance && (
            <div className="ms-3">
              <Link to="/manager-dashboard/attendance/daily-attendance" className="nav-link text-light">Daily Attendance</Link>
              <Link to="/manager-dashboard/attendance/attendance-Record" className="nav-link text-light">Attendance Record</Link>
            </div>
          )}

          {/* Overtime Dropdown */}
          <div className="nav-link text-light" onClick={() => toggleMenu("overtime")} style={{ cursor: "pointer" }}>
            🕒 Overtime
            <i className={`bi ms-2 ${menuState.overtime ? "bi-caret-up-fill" : "bi-caret-down-fill"}`} style={{ color: "white" }} />
          </div>
          {menuState.overtime && (
            <div className="ms-3">
              <Link to="/manager-dashboard/manager-ot-approval" className="nav-link text-light">Pending Requests</Link>
              <Link to="/manager-dashboard/manager-ot-self" className="nav-link text-light">View OT</Link>
              <Link to="/manager-dashboard/confirm-ot-request" className="nav-link text-light">Confirmed Requests</Link>
            </div>
          )}

          <Link to="/manager-dashboard/manager-leave" className="nav-link text-light">📅 Leave</Link>
          <Link to="/manager-dashboard/profile" className="nav-link text-light">👤 Profile</Link>
          <Link to="/manager-dashboard/payroll" className="nav-link text-light">💼 Payroll</Link>

          <button onClick={handleLogout} className="btn btn-danger mt-4">Logout</button>
        </nav>
      </div>

      <div className="flex-grow-1 p-4" style={{ backgroundColor: "#f8f9fa" }}>
        {/* Header */}
        <header className="p-3 d-flex justify-content-between align-items-center rounded" style={{ backgroundColor: "#2980B9", color: "#FFFFFF" }}>
          <h4>👋 Welcome, {managerName}</h4>
          <button onClick={handleLogout} className="btn btn-light btn-sm">Logout</button>
        </header>

        {/* Show Dashboard Content ONLY on /manager-dashboard */}
        {location.pathname === "/manager-dashboard" && (
          <>
            <div className="row my-4">
              <div className="col-md-6">
                <div className="card shadow-sm p-3">
                  <h5 className="text-center">📊 Overtime Summary</h5>
                  <ul>
                    <li>Pending Requests: 10</li>
                    <li>Approved Requests: 20</li>
                    <li>Rejected Requests: 5</li>
                  </ul>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card shadow-sm p-3">
                  <h5>🔔 Recent Activities</h5>
                  <ul>
                    <li>✔ Manager approved an OT request</li>
                    <li>📢 New OT request submitted</li>
                  </ul>
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

export default ManagerDashboard;
