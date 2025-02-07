import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function AttendanceForm() {
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [positions, setPositions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Mock data for positions and departments
    setPositions([
      { id: 1, name: "Software Engineer" },
      { id: 2, name: "Project Manager" },
      { id: 3, name: "HR Specialist" },
    ]);

    setDepartments([
      { id: 1, name: "IT Department" },
      { id: 2, name: "Operations" },
      { id: 3, name: "Human Resources" },
    ]);

    if (location.state) {
      const { employeeId, employeeName, position, department, checkIn, checkOut } = location.state;
      setEmployeeId(employeeId);
      setEmployeeName(employeeName);
      setPosition(position);
      setDepartment(department);
      setCheckIn(checkIn);
      setCheckOut(checkOut);
      setIsEditing(true);
    }
  }, [location.state]);

  // Fetch positions from backend
  // const fetchPositions = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/positions");
  //     setPositions(response.data);
  //   } catch (error) {
  //     console.error("Error fetching positions:", error);
  //   }
  // };

  // Fetch departments from backend
  // const fetchDepartments = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/departments");
  //     setDepartments(response.data);
  //   } catch (error) {
  //     console.error("Error fetching departments:", error);
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      employeeId,
      employeeName,
      position,
      department,
      checkIn,
      checkOut,
    };

    try {
      if (isEditing) {
        // await axios.put(`http://localhost:5000/attendance/${employeeId}`, formData);
        alert("Changes saved successfully!");
      } else {
        // await axios.post("http://localhost:5000/attendance", formData);
        alert("Attendance added successfully!");
      }
      navigate("/AttendanceRecord", { state: formData });
    } catch (error) {
      console.error("Error submitting attendance form:", error);
    }
  };

  const handleCancel = () => {
    setEmployeeId("");
    setEmployeeName("");
    setPosition("");
    setDepartment("");
    setCheckIn("");
    setCheckOut("");
    setIsEditing(false);
    alert("Changes have been canceled!");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-header text-white" style={{ backgroundColor: "#001F3F" }}>
              <h3 className="text-center mb-0">
                {isEditing ? "Edit Employee Attendance" : "Employee Attendance Form"}
              </h3>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                {[
                  { label: "Employee ID", value: employeeId, setValue: setEmployeeId, type: "text" },
                  { label: "Employee Name", value: employeeName, setValue: setEmployeeName, type: "text" },
                  { label: "Check-in Time", value: checkIn, setValue: setCheckIn, type: "time" },
                  { label: "Check-out Time", value: checkOut, setValue: setCheckOut, type: "time" },
                ].map(({ label, value, setValue, type }) => (
                  <div className="row align-items-center mb-3" key={label}>
                    <div className="col-4 text-muted">{label}:</div>
                    <div className="col-8">
                      <input
                        type={type}
                        className="form-control border-0 border-bottom"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                ))}

                <div className="row align-items-center mb-3">
                  <div className="col-4 text-muted">Position:</div>
                  <div className="col-8">
                    <select
                      className="form-select border-0 border-bottom"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                      required
                    >
                      <option value="">Select a Position</option>
                      {positions.map((pos) => (
                        <option key={pos.id} value={pos.name}>
                          {pos.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="row align-items-center mb-3">
                  <div className="col-4 text-muted">Department:</div>
                  <div className="col-8">
                    <select
                      className="form-select border-0 border-bottom"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      required
                    >
                      <option value="">Select a Department</option>
                      {departments.map((dep) => (
                        <option key={dep.id} value={dep.name}>
                          {dep.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="d-flex justify-content-end mt-4">
                  <button
                    type="submit"
                    className="btn"
                    style={{ backgroundColor: "#001F3F", color: "white", marginRight: "10px" }}
                  >
                    {isEditing ? "Save Changes" : "Submit"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttendanceForm;
