import salaryController from "./Employee/Controller/SalaryController";
import DataTable from "./common/DataTable";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Card } from "antd";

function SalaryHistoryAdmin() {
  const navigate = useNavigate(); // Initialize the navigate function

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
      <Card title="Salary Calculation Details" style={{ marginBottom: "20px" }}>
      <p><strong>Basic Salary:</strong> Fixed monthly salary of the employee.</p>
      <p><strong>OT Fee Calculation:</strong>OT Fee = (Basic Salary × 12 × 2 × OT Hours) / (52 × 44)</p>
      <p><strong>Leave Deduction:</strong> (Basic Salary × Unpaid Leave Days) ÷ Working Days</p>
      <p><strong>Late Deduction:</strong> Based on total late minutes:
        <ul>
          <li>≤30 min → 0.5-hour deduction</li>
          <li>≤60 min → 1-hour deduction</li>
          <li> greater than 60 min → 2-hour deduction</li>
        </ul>
      </p>
      <p><strong>Final Salary Calculation:</strong> Basic Salary + House Allowance + Transport + Bonus + Manual Adjustments + OT Fee - Leave Deduction - Late Deduction</p>
    </Card>
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
