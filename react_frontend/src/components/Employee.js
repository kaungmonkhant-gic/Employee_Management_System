import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import employeeController from "../Controller/employeeController.js";
import DataTable from "./common/DataTable.js";
import EmployeeForm from "./EmployeeForm.js";
import { FaEdit, FaTrash } from "react-icons/fa";

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [activeEmployees, setActiveEmployees] = useState([]);
  const [resignedEmployees, setResignedEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isRegisterScreen, setIsRegisterScreen] = useState(false);
  const [headerText, setHeaderText] = useState("Register New Employee");
  const [showActive, setShowActive] = useState(true); // State for toggling tables
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true); // Start loading
        const activeData = await employeeController.fetchActiveUsers();
        const resignedData = await employeeController.fetchResignedUsers();
  
        if (Array.isArray(activeData)) {
          const activeEmployeesWithNumbers = activeData.map((employee, index) => ({
            ...employee,
            number: index + 1,
          }));
          setActiveEmployees(activeEmployeesWithNumbers);
        }
  
        if (Array.isArray(resignedData)) {
          const resignedEmployeesWithNumbers = resignedData.map((employee, index) => ({
            ...employee,
            number: index + 1,
          }));
          setResignedEmployees(resignedEmployeesWithNumbers);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
  
    fetchEmployees();
  }, []);
  
    

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
        <div className="d-flex justify-content-center gap-2">
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

  const handleDelete = async (employee) => {
    try {
      await employeeController.deleteEmployee(employee.id);
  
      // Remove the employee from both active and resigned lists
      setActiveEmployees((prev) => prev.filter((e) => e.id !== employee.id));
      setResignedEmployees((prev) => prev.filter((e) => e.id !== employee.id));
  
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete employee.");
    }
  };
  

  const handleSubmit = async (employeeData) => {
    if (editingEmployee) {
      try {
        const updatedEmployee = await employeeController.updateEmployee(editingEmployee.id, employeeData);
        setEmployees((prev) =>
          prev.map((emp) => (emp.number === editingEmployee.number ? updatedEmployee : emp))
        );
        setIsRegisterScreen(false);
      } catch (error) {
        console.error("Error updating employee:", error);
        alert("Failed to update employee.");
      }
    } else {
      try {
        setEmployees((prev) => [...prev, { ...employeeData, number: prev.length + 1 }]);
        setIsRegisterScreen(false);
      } catch (error) {
        console.error("Error adding employee:", error);
        alert("Failed to add new employee.");
      }
    }
  };

  return (
    <div className="container mt-5 vh-100">
      {!isRegisterScreen ? (
        <>
          <button className="btn btn-primary mb-4" onClick={handleRegisterClick}>
            Register New Employee
          </button>

          {/* Buttons to toggle active and resigned employees */}
          <div>
            {/* <button className="btn btn-outline-primary mb-3" onClick={() => setShowActive(true)}>
              Show Active Employees
            </button> */}
            {/* <button className="btn btn-outline-secondary mb-3" onClick={() => setShowActive(false)}>
              Show Resigned Employees
            </button> */}
          </div>          
          {/* Show Active Employees */}
          {showActive ? (
  loading ? ( // Show loading message while fetching data
    <p className="text-center">Loading active employees...</p>
  ) : (
    <DataTable
      fetchData={() => activeEmployees} // Pass active employees
      columns={columns}
      keyField="number"
      responsive
      fixedHeader
      fixedHeaderScrollHeight="400px"
      noDataComponent="No active employees found"
      highlightOnHover
      pagination
    />
  )
) : (
  loading ? ( // Show loading message while fetching resigned employees
    <p className="text-center">Loading resigned employees...</p>
  ) : (
    <DataTable
    fetchData={() => resignedEmployees} // Pass active employees
    columns={columns}
    keyField="number"
    responsive
    fixedHeader
    fixedHeaderScrollHeight="400px"
    noDataComponent="No active employees found"
    highlightOnHover
    pagination
  />
  )
)}
        </>
      ) : (
        <EmployeeForm onSubmit={handleSubmit} onCancel={() => setIsRegisterScreen(false)} editingEmployee={editingEmployee} headerText={headerText} />
      )}
    </div>
  );
}

export default Employee;
