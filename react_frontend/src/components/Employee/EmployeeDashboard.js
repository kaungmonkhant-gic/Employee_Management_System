import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function EmployeeDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
          <div className="sidebar-sticky pt-3">
            <h2 className="h5 text-center mb-4">Employee Dashboard</h2>
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link to="/employee-dashboard" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/employee-dashboard/profile" className="nav-link">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/employee-dashboard/attendance" className="nav-link">
                  Attendance
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/employee-dashboard/salary" className="nav-link">
                  Salary
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/employee-dashboard/tasks" className="nav-link">
                  Tasks
                </Link>
              </li>
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger w-100 mt-3"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          {location.pathname === "/employee-dashboard" && (
            <header className="py-3">
              <h1 className="h3">Welcome to the Employee Dashboard</h1>
            </header>
          )}

          <div className="content mt-3">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
