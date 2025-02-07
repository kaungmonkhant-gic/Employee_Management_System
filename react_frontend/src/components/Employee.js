import React, { useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import employeeController from "../Controller/employeeController";
import DataTable from "./common/DataTable";
import EmployeeForm from "./EmployeeForm.js";
import { FaEdit, FaTrash } from "react-icons/fa";

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isRegisterScreen, setIsRegisterScreen] = useState(false);
  const [headerText, setHeaderText] = useState("Register New Employee");
  employees.map((employee) => (
    <p key={employee.id}>{employee.name}</p>
  ))
   
    const columns = [
      { field: "number", headerName: "No.", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
      { field: "name", headerName: "Name", minWidth: 150, flex: 1, cellClassName: "text-center" },
      { field: "email", headerName: "Email", minWidth: 200, flex: 1.5, cellClassName: "text-center" },
      { field: "positionName", headerName: "Position", minWidth: 150, flex: 1, cellClassName: "text-center" },
      { field: "id", headerName: "Emp ID", minWidth: 120, flex: 0.8, cellClassName: "text-center" },
      { field: "dob", headerName: "DOB", minWidth: 120, flex: 0.8, cellClassName: "text-center" },
      { field: "nrc", headerName: "NRC", minWidth: 150, flex: 1, cellClassName: "text-center" },
      { field: "gender", headerName: "Gender", minWidth: 100, flex: 0.7, cellClassName: "text-center" },
      { field: "maritalStatus", headerName: "Marital Status", minWidth: 130, flex: 1, cellClassName: "text-center" },
      { field: "phone", headerName: "Phone", minWidth: 150, flex: 1, cellClassName: "text-center" },
      { field: "address", headerName: "Address", minWidth: 200, flex: 2, cellClassName: "text-center" },
      { field: "education", headerName: "Education", minWidth: 180, flex: 1.2, cellClassName: "text-center" },
      { field: "workExp", headerName: "Work Exp", minWidth: 130, flex: 1, cellClassName: "text-center" },
      { field: "departmentName", headerName: "Department", minWidth: 150, flex: 1, cellClassName: "text-center" },
      { field: "roleName", headerName: "Role", minWidth: 130, flex: 1, cellClassName: "text-center" },
      { field: "basicSalary", headerName: "Basic Salary", minWidth: 150, flex: 1, cellClassName: "text-center" },
      { field: "houseAllowance", headerName: "House Allowance", minWidth: 150, flex: 1, cellClassName: "text-center" },
      { field: "transportation", headerName: "Transportation", minWidth: 150, flex: 1, cellClassName: "text-center" },
      { field: "annualLeave", headerName: "Annual Leave", minWidth: 130, flex: 1, cellClassName: "text-center" },
      { field: "casualLeave", headerName: "Casual Leave", minWidth: 130, flex: 1, cellClassName: "text-center" },
      { field: "medicalLeave", headerName: "Medical Leave", minWidth: 130, flex: 1, cellClassName: "text-center" },
      { field: "joinDate", headerName: "Join Date", minWidth: 150, flex: 1, cellClassName: "text-center" },
      {
        field: "resignDate",
        headerName: "Resign Date",
        minWidth: 150,
        flex: 1,
        cellClassName: "text-center",
        render: (row) => (row.resignDate ? row.resignDate : <span className="text-muted">Not Set</span>),
      },
      {
        field: "actions",
        headerName: "Actions",
        minWidth: 120,
        flex: 0.8,
        cellClassName: "text-center",
        render: (row) => (
          <div className="d-flex justify-content-center gap-2"> {/* Center actions */}
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
    
  
  const handleRegisterClick = () => {
    setEditingEmployee(null);
    setIsRegisterScreen(true);
  };

  const handleEdit = (employee) => {
    setHeaderText("Edit Employee");
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
          responsive
          fixedHeader
          fixedHeaderScrollHeight="400px"
          noDataComponent="No employees found"
          highlightOnHover
          pagination
        />
        </>
      ) : (
        <EmployeeForm onSubmit={handleSubmit} onCancel={() => setIsRegisterScreen(false)} editingEmployee={editingEmployee} headerText={headerText} />
      )}
    </div>
  );
}

export default Employee;
