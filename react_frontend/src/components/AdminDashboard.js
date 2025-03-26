import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import employeeController from "../Controller/employeeController";

// Import Chart.js and React-Chart.js-2
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
  const [employeeName, setEmployeeName] = useState("");

 
  const [menuState, setMenuState] = useState({
    employee: false,
    attendance: false,
    overtime: false,
    salary: false, // Added for Salary dropdown
  });
  
  const toggleMenu = (menu) => {
    setMenuState((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu], // Toggle only the clicked menu
    }));
  };
  
  useEffect(() => {
    const storedEmployeeName = localStorage.getItem("employeeName");
    setEmployeeName(storedEmployeeName || "Admin");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("employeeName");
    navigate("/login");
  };

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

  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalDepartments, setTotalDepartments] = useState(0);
  const [totalManagers, setTotalManagers] = useState(0);

  useEffect(() => {
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

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className="d-flex flex-column p-3"
        style={{
          width: "250px",
          backgroundColor: "#2980B9",
          color: "#FFFFFF",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          overflowY: "auto",
        }}
      >
        <h2 className="text-center mb-4">Admin Dashboard</h2>
      <nav className="nav flex-column">
          <Link to="/admin-dashboard" className="nav-link" style={{ color: "#FFFFFF" }}>
          <i className="bi bi-house-door"></i> Dashboard</Link>
          {/* Employee Dropdown */}
          <div className="nav-link text-light d-flex justify-content-between align-items-center" onClick={() => toggleMenu("employee")}
           style={{ cursor: "pointer" }}>
          <span>
            <i className="bi bi-person-fill"></i> Employee
          </span>
          <i className={`bi ${menuState.employee ? "bi-caret-up-fill" : "bi-caret-down-fill"}`} style={{ color: "white" }}/>
          </div>

          {menuState.employee && (
            <div className="ms-3">
              <Link to="/admin-dashboard/employee" className="nav-link" style={{ color: "#FFFFFF" }}>
              <i className="bi bi-person-lines-fill"></i>Employee List</Link>
              <Link to="/admin-dashboard/showleave" className="nav-link" style={{ color: "#FFFFFF" }}>
              <i className="bi bi-calendar-check "></i>Show Leave</Link>
              <Link to="/admin-dashboard/salary" className="nav-link" style={{ color: "#FFFFFF" }}>
              <i className="bi bi-cash"></i>Show Salary</Link>
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
              <Link to="/admin-dashboard/attendance/daily-attendance" className="nav-link" style={{ color: "#FFFFFF" }}>
              <i className="bi bi-alarm me-2"></i>
              Daily Attendance
              </Link>
              <Link to="/admin-dashboard/attendance/attendance-Record" className="nav-link" style={{ color: "#FFFFFF" }}>
              <i className="bi bi-file-earmark-text me-2"></i>
              Attendance Record
              </Link>
            </div>
          )}

    
          {/* Overtime Dropdown */}

          <div className="nav-link text-light d-flex justify-content-between align-items-center" onClick={() => toggleMenu("overtime")}
           style={{ cursor: "pointer" }}>
          <span>
          <i className="bi bi-hourglass-split"></i> Overtime
          </span>
          <i className={`bi ${menuState.overtime ? "bi-caret-up-fill" : "bi-caret-down-fill"}`} style={{ color: "white" }}/>
          </div>
              {menuState.overtime && (
                <div className="ms-3">
                  <Link to="/admin-dashboard/ot" className="nav-link" style={{ color: "#FFFFFF" }}>
                  <i className="bi bi-arrow-repeat me-2"></i>Incoming Request</Link>
                  <Link to="/admin-dashboard/submit-ot" className="nav-link" style={{ color: "#FFFFFF" }}>
                  <i className="bi bi-pencil-square me-2"></i>

                  Apply for OT</Link>
                </div>
            )}
              
          <Link to="/admin-dashboard/admin-Leave" className="nav-link" style={{ color: "#FFFFFF" }}>
          <i className="bi bi-calendar-x me-2"></i>
          Leave</Link>

          <Link to="/admin-dashboard/profile" className="nav-link" style={{ color: "#FFFFFF" }}>
          <i className="bi bi-person-circle me-2"></i>
          Profile</Link>

          {/* Salary Dropdown */}

          <div className="nav-link text-light d-flex justify-content-between align-items-center" onClick={() => toggleMenu("salary")}
           style={{ cursor: "pointer" }}>
          <span>
          <i className="bi bi-coin"></i> Salary
          </span>
          <i className={`bi ${menuState.salary ? "bi-caret-up-fill" : "bi-caret-down-fill"}`} style={{ color: "white" }}/>
          </div>
          {menuState.salary && (
                <div className="ms-3">

                  <Link to="/admin-dashboard/salary-history" className="nav-link" style={{ color: "#FFFFFF" }}>
                <i className="bi bi-bar-chart-line me-2"></i>
              Salary History</Link>

                  <Link to="/admin-dashboard/calculate-salary" className="nav-link" style={{ color: "#FFFFFF" }}>
                  <i className="bi bi-cash-stack" style={{ marginRight: '8px' }}></i>
                Calculate Salary</Link>

                </div>
          )}
              
          <button onClick={handleLogout} className="btn btn-secondary mt-4">Logout</button>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className="flex-grow-1 p-4"
        style={{
          backgroundColor: "#f8f9fa",
          marginLeft: "250px",
          width: "calc(100% - 250px)",
          minHeight: "100vh",
        }}
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
              {employeeName?.charAt(0)}
            </div>
            <div>
              <h5 className="mb-0" style={{ fontSize: "1.2rem", fontWeight: "600", color: "white" }}>
                <i className="bi bi-person-check"></i> {employeeName}
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

        {/* Dashboard Content */}
        {location.pathname === "/admin-dashboard" && (
          <>
            <div className="row my-4">
              <div className="col-md-4">
                <div className="card shadow-sm p-3 text-center">
                  <h5>👥 Total Employees</h5>
                  <h3>{totalEmployees}</h3>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow-sm p-3 text-center">
                  <h5>🏢 Total Departments</h5>
                  <h3>{totalDepartments}</h3>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow-sm p-3 text-center">
                  <h5>👨‍💼 Total Managers</h5>
                  <h3>{totalManagers}</h3>
                </div>
              </div>
            </div>

            {/* Attendance Chart */}
            <div className="card shadow-sm p-3">
              <h5 className="text-center">📊 Attendance Overview</h5>
              <Bar data={attendanceData} />
            </div>
          </>
        )}

        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboard;
