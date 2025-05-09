import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import employeeController from "../Controller/employeeController";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [employeeName, setEmployeeName] = useState("Admin");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [menuState, setMenuState] = useState({
    employee: false,
    attendance: false,
    overtime: false,
    salary: false,
  });

  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalDepartments, setTotalDepartments] = useState(0);
  const [totalManagers, setTotalManagers] = useState(0);

  const toggleMenu = (menu) => {
    setMenuState((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu],
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem("employeeName");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const storedName = localStorage.getItem("employeeName");
    setEmployeeName(storedName || "Admin");

    const loadCounts = async () => {
      try {
        const employees = await employeeController.fetchEmployeeCount();
        const departments = await employeeController.fetchDepartmentCount();
        const managers = await employeeController.fetchManagerCount();

        setTotalEmployees(employees || 0);
        setTotalDepartments(departments || 0);
        setTotalManagers(managers || 0);
      } catch (error) {
        console.error("Failed to fetch counts:", error);
      }
    };

    loadCounts();
  }, []);

  const attendanceData = {
    labels: ["Present", "Absent", "Late"],
    datasets: [
      {
        label: "Attendance Summary",
        data: [130, 20, 5],
        backgroundColor: ["rgba(76, 175, 80, 0.7)", "rgba(255, 87, 51, 0.7)", "rgba(255, 193, 7, 0.7)"],
        borderColor: ["#4CAF50", "#FF5733", "#FFC107"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container-fluid d-flex p-0">

      {/* Sidebar */}
      <div
  className={`d-flex flex-column p-3 position-fixed top-0 start-0 h-100 shadow-sm ${
    sidebarOpen ? "d-block" : "d-none d-md-block"
  }`}
  style={{
    width: "250px",
    backgroundColor: "#2980B9",
    color: "#FFFFFF",
    overflowY: "auto",  // Makes the sidebar scrollable
    zIndex: 999,
    height: "100vh",  // Ensures the sidebar takes up the full height
    scrollbarWidth: "none",  // For Firefox to hide scrollbar
  }}
>
  <style>
    {`
      /* Hide scrollbar in WebKit browsers (Chrome, Safari, etc.) */
      .sidebar::-webkit-scrollbar {
        display: none;
      }
    `}
  </style>
        <h2 className="text-center mb-4">Admin Dashboard</h2>
        <nav className="nav flex-column">
          <Link
            to="/admin-dashboard"
            className={`nav-link ${location.pathname === "/admin-dashboard" ? "fw-bold" : ""}`}
            style={{ color: "#FFFFFF" }}
          >
            <i className="bi bi-house-door"></i> Dashboard
          </Link>

          {/* Employee Dropdown */}
          <div
            className="nav-link text-light d-flex justify-content-between align-items-center"
            onClick={() => toggleMenu("employee")}
            style={{ cursor: "pointer" }}
          >
            <span>
              <i className="bi bi-person-fill"></i> Employee
            </span>
            <i className={`bi ${menuState.employee ? "bi-caret-up-fill" : "bi-caret-down-fill"}`} />
          </div>
          {menuState.employee && (
            <div className="ms-3">
              <Link to="/admin-dashboard/employee" className="nav-link" style={{ color: "#FFFFFF" }}>
                <i className="bi bi-person-lines-fill"></i> Employee List
              </Link>
              <Link to="/admin-dashboard/showleave" className="nav-link" style={{ color: "#FFFFFF" }}>
                <i className="bi bi-calendar-check"></i> Show Leave
              </Link>
              <Link to="/admin-dashboard/salary" className="nav-link" style={{ color: "#FFFFFF" }}>
                <i className="bi bi-cash"></i> Show Salary
              </Link>
            </div>
          )}

          {/* Attendance Dropdown */}
          <div
            className="nav-link text-light d-flex justify-content-between align-items-center"
            onClick={() => toggleMenu("attendance")}
            style={{ cursor: "pointer" }}
          >
            <span>
              <i className="bi bi-person-check"></i> Attendance
            </span>
            <i className={`bi ${menuState.attendance ? "bi-caret-up-fill" : "bi-caret-down-fill"}`} />
          </div>
          {menuState.attendance && (
            <div className="ms-3">
              <Link to="/admin-dashboard/attendance/daily-attendance" className="nav-link" style={{ color: "#FFFFFF" }}>
                <i className="bi bi-alarm me-2"></i> Daily Attendance
              </Link>
              <Link to="/admin-dashboard/attendance/attendance-record" className="nav-link" style={{ color: "#FFFFFF" }}>
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
            <span>
              <i className="bi bi-hourglass-split"></i> Overtime
            </span>
            <i className={`bi ${menuState.overtime ? "bi-caret-up-fill" : "bi-caret-down-fill"}`} />
          </div>
          {menuState.overtime && (
            <div className="ms-3">
              <Link to="/admin-dashboard/ot" className="nav-link" style={{ color: "#FFFFFF" }}>
                <i className="bi bi-arrow-repeat me-2"></i> Incoming Request
              </Link>
              <Link to="/admin-dashboard/submit-ot" className="nav-link" style={{ color: "#FFFFFF" }}>
                <i className="bi bi-pencil-square me-2"></i> Apply for OT
              </Link>
            </div>
          )}

          <Link to="/admin-dashboard/admin-Leave" className="nav-link" style={{ color: "#FFFFFF" }}>
            <i className="bi bi-calendar-x me-2"></i> Leave
          </Link>

          <Link to="/admin-dashboard/profile" className="nav-link" style={{ color: "#FFFFFF" }}>
            <i className="bi bi-person-circle me-2"></i> Profile
          </Link>

          {/* Salary Dropdown */}
          <div
            className="nav-link text-light d-flex justify-content-between align-items-center"
            onClick={() => toggleMenu("salary")}
            style={{ cursor: "pointer" }}
          >
            <span>
              <i className="bi bi-coin"></i> Salary
            </span>
            <i className={`bi ${menuState.salary ? "bi-caret-up-fill" : "bi-caret-down-fill"}`} />
          </div>
          {menuState.salary && (
            <div className="ms-3">
              <Link to="/admin-dashboard/salary-history" className="nav-link" style={{ color: "#FFFFFF" }}>
                <i className="bi bi-bar-chart-line me-2"></i> Salary History
              </Link>
              <Link to="/admin-dashboard/calculate-salary" className="nav-link" style={{ color: "#FFFFFF" }}>
                <i className="bi bi-cash-stack me-2"></i> Calculate Salary
              </Link>
            </div>
          )}

          <button onClick={handleLogout} className="btn btn-secondary mt-4">
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className="flex-grow-1"
        style={{
          backgroundColor: "#f8f9fa",
          marginLeft: sidebarOpen ? "250px" : "0",
          transition: "margin-left 0.3s",
          minHeight: "100vh",
          overflowY: "hidden",  // Hide the vertical scrollbar
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
  {/* Left Section: Menu + User Info */}
  <div className="d-flex align-items-center gap-3">
    {/* Sidebar Toggle (visible on small screens) */}
    <button
      onClick={toggleSidebar}
      className="btn btn-outline-light d-md-none"
      style={{ border: "none" }}
    >
      <i className="bi bi-list fs-4"></i>
    </button>

    <div>
      <h6 className="mb-0 fw-semibold" style={{ fontSize: "1rem", color: "#ecf0f1" }}>
        <i className="bi bi-person-circle me-2"></i>{employeeName}
      </h6>
      <small style={{ fontSize: "0.75rem", color: "#bdc3c7" }}>Admin Panel</small>
    </div>
  </div>

  {/* Right Section: Logout Button */}
  <button
    onClick={handleLogout}
    className="btn btn-sm"
    style={{
      backgroundColor: "#E74C3C",
      color: "#fff",
      border: "none",
      borderRadius: "20px",
      padding: "6px 16px",
      fontSize: "0.875rem",
    }}
  >
    Logout
  </button>
</header>


        {/* Dashboard Content */}
        <main className="container-fluid" style={{ padding: "80px 20px 20px 20px" }}>

          {location.pathname === "/admin-dashboard" && (
            <>
          <div className="row mb-4">
  <div className="col-sm-12 col-md-4 mb-3">
    <div className="card shadow-sm p-3 text-center h-100">
      <h5>👥 Total Employees</h5>
      <h3>{totalEmployees}</h3>
    </div>
  </div>
  <div className="col-sm-12 col-md-4 mb-3">
  <div className="card shadow-sm p-3 text-center h-100">
                    <h5>🏢 Total Departments</h5>
                    <h3>{totalDepartments}</h3>
                  </div>
                </div>
                <div className="col-sm-12 col-md-4 mb-3">
    <div className="card shadow-sm p-3 text-center h-100">
                    <h5>👨‍💼 Total Managers</h5>
                    <h3>{totalManagers}</h3>
                  </div>
                </div>
              </div>

              {/* Attendance Chart */}
              <div className="card shadow-sm p-4">
                <h5 className="text-center mb-3">📊 Attendance Overview</h5>
                <div style={{ height: "300px" }}>
                  <Bar data={attendanceData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
              </div>
            </>
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
