import  { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import leaveController from "../Controller/leaveController";


import DataTable from "./common/DataTable";

function Leave() {
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

  return (
<div className="container">
  <div className="row">
    <div className="col-12 col-md-10 col-lg-12">
      <h2 className="text-center mb-4">Leave Balance</h2>

      <div className="table-responsive">
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
    </div>
  </div>
</div>

  );
}

export default Leave;