import salaryController from "./Employee/Controller/SalaryController";
import DataTable from "./common/DataTable";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";


function SalaryHistoryAdmin() {
  const navigate = useNavigate(); // Initialize the navigate function

  const [columns] = useState([
    
    { field: "employeeName", headerName: "Employee Name", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { field: "managerName", headerName: "Manager Name", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { field: "basicSalary", headerName: "Basic Salary", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { field: "houseAllowance", headerName: "House Allowance", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { field: "otFee", headerName: "OT Fee", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { field: "lateOver", headerName: "Late Over", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { field: "leaveOver", headerName: "Leave Over", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { field: "manualAdjustment", headerName: "Manual Adjustment", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { field: "bonus", headerName: "Bonus", minWidth: 100, flex: 1, cellClassName: "text-center" },
    { field: "date", headerName: "Date", minWidth: 100, flex: 1, cellClassName: "text-center", renderCell: (params) => new Date(params.value).toLocaleDateString() },
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
