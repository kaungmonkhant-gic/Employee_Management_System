import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import leaveController from "../Controller/leaveController";
import { useNavigate } from "react-router-dom";

import DataTable from "./common/DataTable";

function Leave() {
  const navigate = useNavigate(); // Initialize the navigate function

  const [columns] = useState([
    { 
      field: "number", 
      headerName: "No.", 
      minWidth: 50, 
      flex: 0.5, 
      cellClassName: "text-center",  // Ensures text alignment in Bootstrap
      headerClassName: "text-center" // Centers the header text as well
    },
    
    { field: "employeeId", headerName: "Emp ID", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "employeeName", headerName: "Emp Name", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "annualLeave", headerName: "Annual Leave", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "casualLeave", headerName: "Casual Leave", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "medicalLeave", headerName: "Medical Leave", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "total", headerName: "Total", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
  ]);


  // Function to handle button click
  const handleButtonClick = () => {
    navigate("/admin-dashboard/addleave"); // Navigate to the "/details" route
  };
  

  return (
    <div className="container mt-5 vh-100">

      <h2 className="text-center mb-4">Leave Balance</h2>
      {/* <button className="btn btn-primary mb-4" onClick={handleButtonClick}>
            Add Leave
          </button> */}
      <DataTable
          fetchData={leaveController.fetchLeaveData}
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