import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import employeeController from "../Controller/employeeController";
import DataTable from "./common/DataTable";

function ResignedEmployees() {
  const [columns] = useState([
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
      render: (row) => row.resignDate || <span className="text-muted">Not Set</span>,
    },
  ]);

  return (
    <div className="container mt-4 vh-100">
      <h2 className="text-center mb-4">Resigned Employees</h2>
      <DataTable
        fetchData={employeeController.fetchResignedUsers}
        columns={columns}
        keyField="number"
        responsive
        fixedHeader
        fixedHeaderScrollHeight="400px"
        noDataComponent="No resigned employees found"
        highlightOnHover
        pagination
      />
    </div>
  );
}

export default ResignedEmployees; 