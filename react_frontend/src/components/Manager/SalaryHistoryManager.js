import salaryController from "../Employee/Controller/SalaryController";
import DataTable from "../common/DataTable";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button} from "antd";


function SalaryHistoryManager() {
  const [salaryData, setSalaryData] = useState([]);
  const fetchSalaryHistory = async () => {
    const data = await salaryController.fetchSalaryHistory();
    setSalaryData(data);  // Save for export
    return data;
  };

  const downloadExcel = () => {
    if (!salaryData || salaryData.length === 0) {
      alert("No data available to export.");
      return;
    }
  
    const worksheet = XLSX.utils.json_to_sheet(salaryData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Salary History");
  
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
  
    saveAs(blob, "Salary_History.xlsx");
  };
  
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
      <Button
  type="primary"
  onClick={downloadExcel}
  size="large"
  style={{
    width: "200px", // ✅ Set a fixed width (adjust as needed)
    background: "#2980B9",
    borderRadius: "50px",
    fontWeight: 600,
    transition: "all 0.3s ease-in-out",
    color: "white",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    border: "none",
  }}
>
  📥 Download Excel
</Button>

      <h2 className="text-center mb-4">Salary History</h2>
      <DataTable
          fetchData={fetchSalaryHistory}

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

export default SalaryHistoryManager;
