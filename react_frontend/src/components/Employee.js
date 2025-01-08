import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Employee() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "山田", email: "yamada@gmail.com", position: "Manager" },
    {
      id: 2,
      name: "小林",
      email: "kobayashi@gmail.com",
      position: "Developer",
    },
  ]);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    position: "",
  });

  const [editingEmployee, setEditingEmployee] = useState(null);

  const positions = [
    "Manager",
    "Developer",
    "Designer",
    "Tester",
    "HR",
    "Intern",
  ];

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
    if (
      editingEmployee.name &&
      editingEmployee.email &&
      editingEmployee.position
    ) {
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
    <div className="container mt-5">
      <h2 className="text-center mb-4">Employee Management System</h2>

      <div className="card p-4 mb-4">
        <h3>{editingEmployee ? "Edit Employee" : "Register New Employee"}</h3>
        <form onSubmit={editingEmployee ? handleUpdate : handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter name"
              value={editingEmployee ? editingEmployee.name : newEmployee.name}
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
              value={
                editingEmployee ? editingEmployee.email : newEmployee.email
              }
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
              value={
                editingEmployee
                  ? editingEmployee.position
                  : newEmployee.position
              }
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
          <button type="submit" className="btn btn-primary">
            {editingEmployee ? "Update Employee" : "Register Employee"}
          </button>
        </form>
      </div>

      <div>
        <h3>Employee List</h3>
        <table className="table table-striped">
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
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEdit(employee.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </button>
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
