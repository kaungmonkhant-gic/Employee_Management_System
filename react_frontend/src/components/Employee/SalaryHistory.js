import SalaryController from "./Controller/SalaryController";
import DataTable from "../common/DataTable";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


function SalaryHistory() {
 const [salaryData, setSalaryData] = useState([]);
  const fetchSalaryData = async () => {
    const data = await SalaryController.fetchSalaryHistory();
    setSalaryData(data);  // Save for Excel download
    return data;
  };
  
  const downloadExcel = () => {
    if (!salaryData || salaryData.length === 0) {
      alert("No data to export!");
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
      { field: "otFee", headerName: "OT Fee", minWidth: 100, flex: 1, cellClassName: "text-center" },
      { field: "lateOverFee", headerName: "Late Over", minWidth: 100, flex: 1, cellClassName: "text-center" },
      { field: "leaveOverFee", headerName: "Leave Over", minWidth: 100, flex: 1, cellClassName: "text-center" },
      { field: "manualAdjustment", headerName: "Manual Adjustment", minWidth: 100, flex: 1, cellClassName: "text-center" },
      { field: "bonus", headerName: "Bonus", minWidth: 100, flex: 1, cellClassName: "text-center" },
      { field: "finalSalary", headerName: "Total Salary", minWidth: 100, flex: 1, cellClassName: "text-center" },
    ]);
  

  return (
    <div className="container mt-5 vh-100">
      <div className="mb-3 text-start">
      <button
        className="btn btn-success"
        style={{ width: "180px", borderRadius: "30px", fontWeight: "600" }}
        onClick={downloadExcel}
      >
        📥 Download Excel
      </button>
    </div>
      <h2 className="text-center mb-4">Salary History</h2>
      <DataTable
          fetchData={fetchSalaryData}
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

export default SalaryHistory;
