import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function ManagerDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [managerName, setManagerName] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [menuState, setMenuState] = useState({
    employee: false,
    attendance: false,
    overtime: false,
  });

  const toggleMenu = (menu) => {
    setMenuState((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
    <div className="container-fluid d-flex p-0">
      {/* Sidebar */}
      <div
        className={`d-flex flex-column p-3 position-fixed top-0 start-0 h-100 shadow-sm ${sidebarOpen ? "d-block" : "d-none d-md-block"}`}
        style={{
          width: "250px",
          backgroundColor: "#2980B9",
          color: "#FFFFFF",
          overflowY: "auto",
          zIndex: 999,
          height: "100vh",
        }}
      >
        <h2 className="text-center mb-4">Manager Dashboard</h2>
        <nav className="nav flex-column">
          <Link to="/manager-dashboard" className={`nav-link ${location.pathname === "/manager-dashboard" ? "fw-bold" : ""}`} style={{ color: "#FFFFFF" }}>
            <i className="bi bi-house-door"></i> Dashboard
          </Link>

          {/* Employee Dropdown */}
          <div
            className="nav-link text-light d-flex justify-content-between align-items-center"
            onClick={() => toggleMenu("employee")}
            style={{ cursor: "pointer" }}
          >
            <span><i className="bi bi-person-fill"></i> Employee</span>
            <i className={`bi ${menuState.employee ? "bi-caret-up-fill" : "bi-caret-down-fill"}`} />
          </div>
          {menuState.employee && (
            <div className="ms-3">
              <Link to="/manager-dashboard/view-employeelist" className="nav-link" style={{ color: "#FFFFFF" }}>
                <i className="bi bi-person-lines-fill"></i> Employee List
              </Link>
              <Link to="/manager-dashboard/view-leave-balance" className="nav-link" style={{ color: "#FFFFFF" }}>
                <i className="bi bi-calendar-check"></i> Leave Balance
              </Link>
            </div>
          )}

          {/* Attendance Dropdown */}
          <div
            className="nav-link text-light d-flex justify-content-between align-items-center"
            onClick={() => toggleMenu("attendance")}
            style={{ cursor: "pointer" }}
          >
            <span><i className="bi bi-person-check"></i> Attendance</span>
            <i className={`bi ${menuState.attendance ? "bi-caret-up-fill" : "bi-caret-down-fill"}`} />
          </div>
          {menuState.attendance && (
            <div className="ms-3">
              <Link to="/manager-dashboard/attendance/manager-daily-attendance" className="nav-link" style={{ color: "#FFFFFF" }}>
                <i className="bi bi-alarm me-2"></i> Daily Attendance
              </Link>
              <Link to="/manager-dashboard/attendance/manager-attendance-record" className="nav-link" style={{ color: "#FFFFFF" }}>
                <i className="bi bi-file-earmark-text me-2"></i> Attendance Record
              </Link>
            </div>
          )}

          {/* Overtime Dropdown */}
          <div
            className="nav-link text-light d-flex justify-content-between align-items-center"
            onClick={() => toggleMenu("overtime")}
            style={{ cursor: "pointer" }}
          >
            <span><i className="bi bi-hourglass-split"></i> Overtime</span>
            <i className={`bi ${menuState.overtime ? "bi-caret-up-fill" : "bi-caret-down-fill"}`} />
          </div>
          {menuState.overtime && (
            <div className="ms-3">
              <Link to="/manager-dashboard/manager-ot-approval" className="nav-link" style={{ color: "#FFFFFF" }}>
                <i className="bi bi-eye me-2"></i> View Requests
              </Link>
              <Link to="/manager-dashboard/manager-ot-self" className="nav-link" style={{ color: "#FFFFFF" }}>
                <i className="bi bi-clock me-2"></i> Apply for OT
              </Link>
            </div>
          )}

          <Link to="/manager-dashboard/manager-leave" className="nav-link" style={{ color: "#FFFFFF" }}>
            <i className="bi bi-envelope me-2"></i> Leave
          </Link>
          <Link to="/manager-dashboard/profile" className="nav-link" style={{ color: "#FFFFFF" }}>
            <i className="bi bi-person-circle me-2"></i> Profile
          </Link>
          <Link to="/manager-dashboard/salary-hist" className="nav-link" style={{ color: "#FFFFFF" }}>
            <i className="bi bi-currency-dollar me-2"></i> Salary History
          </Link>

          <button onClick={handleLogout} className="btn btn-secondary mt-4">Logout</button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div
        className="flex-grow-1"
        style={{
          backgroundColor: "#f8f9fa",
          marginLeft: sidebarOpen ? "250px" : "0",
          transition: "margin-left 0.3s",
          minHeight: "100vh",
          overflowY: "hidden",
        }}
      >
        {/* Header */}
        <header
          className="d-flex justify-content-between align-items-center px-4 py-2 shadow-sm"
          style={{
            backgroundColor: "#2C3E50",
            height: "60px",
            position: "fixed",
            top: 0,
            left: sidebarOpen ? "250px" : "0",
            right: 0,
            zIndex: 1000,
            transition: "left 0.3s ease",
            color: "#ecf0f1",
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <button onClick={toggleSidebar} className="btn btn-outline-light d-md-none" style={{ border: "none" }}>
              <i className="bi bi-list fs-4"></i>
            </button>
            <div>
              <h6 className="mb-0 fw-semibold" style={{ fontSize: "1rem", color: "#ecf0f1" }}>
                <i className="bi bi-person-circle me-2"></i> {managerName}
              </h6>
              <small style={{ fontSize: "0.75rem", color: "#bdc3c7" }}>Manager Panel</small>
            </div>
          </div>
          <button onClick={handleLogout} className="btn btn-sm" style={{
            backgroundColor: "#E74C3C",
            color: "#fff",
            border: "none",
            borderRadius: "20px",
            padding: "6px 16px",
            fontSize: "0.875rem",
          }}>Logout</button>
        </header>

        {/* Dashboard Content */}
        <main className="container-fluid" style={{ padding: "80px 20px 20px 20px" }}>
          {location.pathname === "/manager-dashboard" && (
            <div className="row mb-4">
                <div className="mb-4">
        <div className="p-4 rounded shadow-sm" style={{ backgroundColor: "#ffffff", borderLeft: "5px solid #2980B9" }}>
          <h4 className="mb-1" style={{ color: "#2C3E50" }}>Welcome to the Manager Dashboard</h4>
          <p className="mb-0" style={{ color: "#7f8c8d" }}>
            Use the navigation panel to manage employees, review attendance, and oversee overtime requests efficiently.
          </p>
        </div>
      </div>
            </div>
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default ManagerDashboard;
