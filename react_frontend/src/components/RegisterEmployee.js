import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterEmployee() {
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    position: "",
  });

  const positions = ["Manager", "Developer", "Designer", "Tester", "HR", "Intern"];
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newEmployee.name && newEmployee.email && newEmployee.position) {
      console.log("New employee registered:", newEmployee);
      setNewEmployee({ name: "", email: "", position: "" });
      navigate("/"); // Redirect back to the main page after registration
    } else {
      alert("Please fill all fields!");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Register New Employee</h2>
      <div className="card p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter name"
              value={newEmployee.name}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={newEmployee.email}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="position" className="form-label">
              Position
            </label>
            <select
              id="position"
              name="position"
              value={newEmployee.position}
              onChange={handleChange}
              className="form-select"
            >
              <option value="" disabled>
                Select Position
              </option>
              {positions.map((position, index) => (
                <option key={index} value={position}>
                  {position}
                </option>
              ))}
            </select>
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              Register Employee
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterEmployee;
