import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import salaryController from "../Controller/salaryController";
import { useNavigate } from "react-router-dom";

import DataTable from "./common/DataTable";

function Leave() {
  const navigate = useNavigate(); // Initialize the navigate function

  const [columns] = useState([
    { field: "employeeId", headerName: "Emp ID", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "employeeName", headerName: "Emp Name", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "annualLeave", headerName: "Annual Leave", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "casualLeave", headerName: "Casual Leave", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "medicalLeave", headerName: "Medical Leave", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "total", headerName: "Total", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
  ]);


  return (
    <div className="container mt-5 vh-100">

      <h2 className="text-center mb-4">Salary Management</h2>
      {/* <button className="btn btn-primary mb-4" onClick={handleButtonClick}>
            Add Leave
          </button> */}
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

export default Leave;
