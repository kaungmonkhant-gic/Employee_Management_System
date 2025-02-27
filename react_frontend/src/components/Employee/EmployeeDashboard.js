import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function EmployeeDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [employeeName, setEmployeeName] = useState("");

  useEffect(() => {
    // Retrieve the employee's name from local storage or an API
    const storedEmployeeName = localStorage.getItem("employeeName");
    setEmployeeName(storedEmployeeName || "Employee"); // Fallback to "Employee" if no name is found
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("employeeName"); // Clear employee name on logout
    navigate("/login");
  };

  return (
    <div className="d-flex min-vh-100" style={{ overflowY: "hidden", height: "100vh" }}>
      {/* Sidebar */}
      <div
        className="d-flex flex-column bg-dark text-light p-3"
        style={{
          width: "250px",
          minHeight: "100vh",
          overflowY: "auto",
        }}
      >
        <h2 className="text-center mb-4">Employee Dashboard</h2>
        <nav className="nav flex-column">
          <Link to="/employee-dashboard" className="nav-link text-light">
            Dashboard
          </Link>

          <div
            className="nav-link text-light"
            onClick={() => setShowSubMenu(!showSubMenu)}
            style={{ cursor: "pointer" }}
          >
            Overtime
            <i
              className={`bi ms-2 ${showSubMenu ? "bi-caret-up-fill" : "bi-caret-down-fill"}`}
              style={{ color: "white" }}
            />
          </div>

       {/* Dropdown Submenu  */}
       {showSubMenu && (
        <div className="ms-3">
          <Link to="/employee-dashboard/overtime/otrequest" className="nav-link text-light">
            Overtime Request
          </Link>
          <Link to="/employee-dashboard/overtime/otrecord" className="nav-link text-light">
            Overtime Record
          </Link>
        </div>
      )} 
      
       
               
                <Link to="/employee-dashboard/profile" className="nav-link text-light">
                  Profile
                </Link>
                <Link to="/employee-dashboard/attendance" className="nav-link text-light">
                  Attendance
                </Link>
                <Link to= "/employee-dashboard/leave" className = "nav-link text-light">
                Leave
                </Link>
                <Link to="/employee-dashboard/profile" className="nav-link text-light">
                  Profile
                </Link>
                <Link to="/employee-dashboard/payroll" className="nav-link text-light">
                  Payroll
                </Link>
          
          <button onClick={handleLogout} className="btn btn-danger mt-4">
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1" style={{ overflowY: "auto" }}>
        {/* Top Bar */}
        <header className="bg-primary text-white p-3 d-flex justify-content-between align-items-center">
          <h4 className="m-0">Welcome, {employeeName}</h4>
          <button
            onClick={handleLogout}
            className="btn btn-light btn-sm"
            style={{ fontWeight: "bold" }}
          >
            Logout
          </button>
        </header>

        {location.pathname === "/employee-dashboard" && (
          <header className="bg-light p-3 border-bottom">
            <h1>Welcome to the Employee Dashboard</h1>
          </header>
        )}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
