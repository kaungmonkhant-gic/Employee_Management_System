import React, { useState } from "react";
import './Employee.css';

function Employee() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "山田", email: "yamada@gmail.com", position: "Manager" },
    { id: 2, name: "小林", email: "kobayashi@gmail.com", position: "Developer" },
  ]);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    position: "",
  });

  const [editingEmployee, setEditingEmployee] = useState(null);

  const positions = ["Manager", "Developer", "Designer", "Tester", "HR", "Intern"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingEmployee) {
      setEditingEmployee({ ...editingEmployee, [name]: value });
    } else {
      setNewEmployee({ ...newEmployee, [name]: value });
    }
  };

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

  const handleDelete = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
  };

  const handleEdit = (id) => {
    const employeeToEdit = employees.find((employee) => employee.id === id);
    setEditingEmployee(employeeToEdit);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (editingEmployee.name && editingEmployee.email && editingEmployee.position) {
      const updatedEmployees = employees.map((employee) =>
        employee.id === editingEmployee.id ? editingEmployee : employee
      );
      setEmployees(updatedEmployees);
      setEditingEmployee(null);
    } else {
      alert("Please fill all fields!");
    }
  };

  return (
    <div className="container">
      <h2>Employee Management System</h2>

      <div className="form-container">
        <h3>{editingEmployee ? "Edit Employee" : "Register New Employee"}</h3>
        <form onSubmit={editingEmployee ? handleUpdate : handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={editingEmployee ? editingEmployee.name : newEmployee.name}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={editingEmployee ? editingEmployee.email : newEmployee.email}
            onChange={handleChange}
            className="input-field"
          />
          <select
            name="position"
            value={editingEmployee ? editingEmployee.position : newEmployee.position}
            onChange={handleChange}
            className="input-field"
          >
            <option value="" disabled>Select Position</option>
            {positions.map((position, index) => (
              <option key={index} value={position}>
                {position}
              </option>
            ))}
          </select>
          <button type="submit" className="btn primary">
            {editingEmployee ? "Update Employee" : "Register Employee"}
          </button>
        </form>
      </div>

      <div className="table-container">
        <h3>Employee List</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                <td>
                  <button className="btn secondary" onClick={() => handleEdit(employee.id)}>Edit</button>
                  <button className="btn danger" onClick={() => handleDelete(employee.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employee;
