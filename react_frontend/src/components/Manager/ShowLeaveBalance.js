import  { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ManagerLeaveController from "../Manager/Controller/ManagerLeaveController";


import DataTable from "../common/DataTable";

function Leave() {
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

      <h2 className="text-center mb-4">Leave Balance</h2>
      {/* <button className="btn btn-primary mb-4" onClick={handleButtonClick}>
            Add Leave
          </button> */}
      <DataTable
          fetchData={ManagerLeaveController.fetchLeaveData}
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