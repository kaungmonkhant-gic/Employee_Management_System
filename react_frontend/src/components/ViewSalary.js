import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import salaryController from "../Controller/salaryController";
import { useNavigate } from "react-router-dom";

import DataTable from "./common/DataTable";

function Salary() {
  const navigate = useNavigate(); // Initialize the navigate function

  const [columns] = useState([
    { field: "employeeId", headerName: "Emp ID", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "employeeName", headerName: "Emp Name", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "basicSalary", headerName: "Basic Salary", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "houseAllowance", headerName: "house Allowance", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "transportation", headerName: "transportation", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "totalSalary", headerName: "Total Salary", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
  ]);


  return (
    <div className="container mt-5 vh-100">

      <h2 className="text-center mb-4">Salary Management</h2>
    
      <DataTable
          fetchData={salaryController.fetchSalaryData}
          columns={columns}
          keyField="employeeId"
          responsive
          fixedHeader
          fixedHeaderScrollHeight="400px"
          noDataComponent="No employees found"
          highlightOnHover
          pagination
        />

    </div>
  );
}

export default Salary;
