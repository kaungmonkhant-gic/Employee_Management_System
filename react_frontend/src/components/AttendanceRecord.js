import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Details() {
  const location = useLocation();
  const navigate = useNavigate();

  const { state } = location;
  const {
    employeeId,
    employeeName,
    position,
    department,
    checkIn,
    checkOut,
  } = state || {};

  if (!state) {
    return (
      <div className="text-center mt-5">
        <h2>No attendance data available</h2>
        <button
          className="btn btn-primary mt-3"
          style={{ backgroundColor: "#001F3F" }}
          onClick={() => navigate("/")}
        >
          Go Back to Form
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-header text-white" style={{ backgroundColor: "#001F3F" }}>
              <h3 className="text-center mb-0">Attendance Details</h3>
            </div>
            <div className="card-body p-4">
              {[
                { label: "Employee ID", value: employeeId },
                { label: "Employee Name", value: employeeName },
                { label: "Position", value: position },
                { label: "Department", value: department },
                { label: "Check-in Time", value: checkIn },
                { label: "Check-out Time", value: checkOut },
              ].map(({ label, value }) => (
                <div className="row mb-3" key={label}>
                  <div className="col-4 text-muted">{label}:</div>
                  <div className="col-8">
                    <strong>{value}</strong>
                  </div>
                </div>
              ))}

              <div className="d-flex justify-content-end mt-4">
                <button
                  className="btn"
                  style={{ backgroundColor: "#001F3F", color: "white" }}
                  onClick={() => navigate("/")}
                >
                  Back to Form
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
