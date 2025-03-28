import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import employeeController from "../../Controller/employeeController";
import DataTable from "../common/DataTable";
import EmployeeForm from "../EmployeeForm";
import { FaEdit } from "react-icons/fa";

function Employee() {
  const [activeEmployees, setActiveEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [headerText, setHeaderText] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const activeData = await employeeController.fetchActiveUsers();

        if (Array.isArray(activeData)) {
          const employeesWithNumbers = activeData.map((employee, index) => ({
            ...employee,
            number: index + 1,
          }));
          setActiveEmployees(employeesWithNumbers);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleEdit = (employee) => {
    setHeaderText("Edit Employee");
    setEditingEmployee(employee);
  };

  const handleCancelEdit = () => {
    setEditingEmployee(null);
  };

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
    },{
      field: "actions",
      headerName: "Actions",
      minWidth: 120,
      flex: 0.8,
      cellClassName: "text-center",
      render: (row) => (
        <button onClick={() => handleEdit(row)} className="btn btn-outline-primary btn-sm">
          <FaEdit />
        </button>
      ),
    },
  ];

  return (
    <div className="container mt-5 vh-100">
      {editingEmployee ? (
        <EmployeeForm
          onSubmit={(employeeData) => {
            console.log("Updating Employee Data:", employeeData);
            setEditingEmployee(null);
          }}
          onCancel={handleCancelEdit}
          editingEmployee={editingEmployee}
          headerText={headerText}
        />
      ) : (
        <>
          {loading ? (
            <p className="text-center">Loading active employees...</p>
          ) : (
            <DataTable
              fetchData={() => activeEmployees}
              columns={columns}
              keyField="number"
              responsive
              fixedHeader
              fixedHeaderScrollHeight="400px"
              noDataComponent="No active employees found"
              highlightOnHover
              pagination
            />
          )}
        </>
      )}
    </div>
  );
}

export default Employee;
