import React, { useState } from "react";
import './Employee.css';

function Employee() {
  // State to store employee list
  const [employees, setEmployees] = useState([
    { id: 1, name: "山田", email: "yamada@gmail.com", position: "Manager" },
    { id: 2, name: "小林", email: "kobayashi@gmail.com", position: "Developer" },
    // You can add more employees here
  ]);

  // State to store new employee form data
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    position: "",
  });

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  // Handle form submit to add a new employee
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newEmployee.name && newEmployee.email && newEmployee.position) {
      const newEmployeeData = {
        id: employees.length + 1, 
        ...newEmployee,
      };
      setEmployees([...employees, newEmployeeData]);
      setNewEmployee({ name: "", email: "", position: "" }); 
    } else {
      alert("Please fill all fields!");
    }
  };

  return (
    <div>
      <h2>Employee Management</h2>

      {/* Employee Registration Form */}
      <div className="employee-form">
        <h3>Register New Employee</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newEmployee.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newEmployee.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            value={newEmployee.position}
            onChange={handleChange}
          />
          <button type="submit">Register Employee</button>
        </form>
      </div>

      {/* Employee List Table */}
      <div className="employee-list">
        <h3>Employee List</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employee;
