import salaryController from "./Employee/Controller/SalaryController";
import DataTable from "./common/DataTable";
import  { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function SalaryHistoryAdmin() {

  const [columns] = useState([
    { 
      field: "salaryMonth", 
      headerName: "Date", 
      minWidth: 120,  // Ensure the minWidth is enough
      flex: 1, 
      cellClassName: "text-center", 
      renderCell: (params) => (
        <span className="date-cell">{new Date(params.value).toLocaleDateString()}</span>
      )
    },
    { field: "employeeName", headerName: "Employee Name", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { field: "basicSalary", headerName: "Basic Salary", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { field: "houseAllowance", headerName: "House Allowance", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { field: "transportation", headerName: "Transportation", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { field: "otFee", headerName: "OT Fee", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { field: "lateOverFee", headerName: "Late Over", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { field: "leaveOverFee", headerName: "Leave Over", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { field: "manualAdjustment", headerName: "Manual Adjustment", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { field: "bonus", headerName: "Bonus", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { field: "finalSalary", headerName: "Total Salary", minWidth: 100, flex: 1, cellClassName: "text-center" },
  ]);

  return (
    
    <div className="container mt-5 vh-100">
      <h2 className="text-center mb-4">Salary History</h2>
    
      <DataTable
          fetchData={salaryController.fetchSalaryHistory}
          columns={columns}
          keyField="id"
          responsive
          fixedHeader
          fixedHeaderScrollHeight="400px"
          noDataComponent="No salary records found"
          highlightOnHover
          pagination
        />
    </div>
   

   
    
  );
}

export default SalaryHistoryAdmin;
