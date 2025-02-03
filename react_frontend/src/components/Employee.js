import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import employeeController from "../Controller/employeeController";
import DataTable from "./common/DataTable";
import RegisterEmployee from "./RegisterEmployee";
import { FaEdit, FaTrash } from "react-icons/fa";

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isRegisterScreen, setIsRegisterScreen] = useState(false);
  {employees.map((employee) => (
    <p key={employee.id}>{employee.name}</p>
  ))}
  
  const positions = ["Manager", "Developer", "Designer", "Tester", "HR", "Intern"];

  const columns = [
    { field: "number", headerName: "No." },
      { field: "name", headerName: "Name" },
      { field: "email", headerName: "Email" },
      { field: "positionName", headerName: "Position" },
      { field: "id", headerName: "Emp ID" },
      { field: "dob", headerName: "DOB" },
      { field: "nrc", headerName: "NRC" },
      { field: "gender", headerName: "Gender" },
      { field: "maritalStatus", headerName: "Marital Status" },
      { field: "phone", headerName: "Phone" },
      { field: "address", headerName: "Address" },
      { field: "education", headerName: "Education" },
      { field: "workExp", headerName: "WorkExp" },
      { field: "departmentName", headerName: "Department" },
      { field: "roleName", headerName: "Role" },
      { field: "joinDate", headerName: "Joined Date" },
      {
        field: "resignDate",
        headerName: "Resign Date",
        render: (row) => (row.resignDate ? row.resignDate : <span className="text-muted">Not Resigned Yet</span>),
      },
    {
      field: "actions",
      headerName: "Actions",
      render: (row) => (
        <div className="d-flex gap-2">
          <button onClick={() => handleEdit(row)} className="btn btn-outline-primary btn-sm">
            <FaEdit />
          </button>
          <button onClick={() => handleDelete(row)} className="btn btn-outline-danger btn-sm">
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchEmployees();
  }, []);
  
  const fetchEmployees = async () => {
    try {
      const data = await employeeController.fetchUsers();
      if (Array.isArray(data)) {
        setEmployees(data);
      } else {
        setEmployees([]); // Fallback to an empty array
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      setEmployees([]); // Avoid undefined state
    }
  };
  
  const handleRegisterClick = () => {
    setEditingEmployee(null);
    setIsRegisterScreen(true);
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setIsRegisterScreen(true);
  };

  const handleDelete = (employee) => {
    setEmployees((prev) => prev.filter((e) => e.number !== employee.number));
  };

  const handleSubmit = (employeeData) => {
    if (editingEmployee) {
      setEmployees((prev) =>
        prev.map((emp) => (emp.number === editingEmployee.number ? employeeData : emp))
      );
    } else {
      setEmployees((prev) => [...prev, { ...employeeData, number: prev.length + 1 }]);
    }
    setIsRegisterScreen(false);
  };

  return (
    <div className="container mt-5 vh-100">
      {!isRegisterScreen ? (
        <>
          <button className="btn btn-primary mb-4" onClick={handleRegisterClick}>
            Register New Employee
          </button>
          <DataTable
    fetchData={() => 
      employeeController.fetchUsers().then(data => 
        Array.isArray(data) ? data.map((employee, index) => ({ ...employee, number: index + 1 })) : []
      )
    }
    columns={columns}
    keyField="number"
  />

        </>
      ) : (
        <RegisterEmployee onSubmit={handleSubmit} onCancel={() => setIsRegisterScreen(false)} editingEmployee={editingEmployee} positions={positions} />
      )}
    </div>
  );
}

export default Employee;
