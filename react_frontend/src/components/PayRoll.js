import React, { useState, useEffect, useCallback } from "react";
import DataTable from "./common/DataTable";
import payrollController from "../Controller/payRollController";

function Payroll() {

  const columns = [
    { field: "id", headerName: "Id", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "date", headerName: "Date", minWidth: 50, flex: 0.5, cellClassName: "text-center", valueGetter: (params) => dayjs(params.value).format("YYYY-MM"), },
    { field: "basicSalary", headerName: "Basic", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "houseAllowance", headerName: "House All.", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "ofFee", headerName: "OT", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "leaveOver", headerName: "Leave", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "lateOver", headerName: "Late", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "manualAdjustment", headerName: "M-A", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "bonus", headerName: "Bonus", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "paidby", headerName: "Paid By", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    ]

  const handlePayrollClick = () => {
    console.log("payroll click");
  };

  

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Payroll Management</h1>
        
      </div>
      <button className="btn btn-primary mb-4" onClick={handlePayrollClick}>
            Calculate new Payroll
          </button>
          <DataTable
          fetchData={() =>
            payrollController.fetchSalaryHistory().then(data =>
              Array.isArray(data) ? data.map((employee, index) => ({ ...employee, number: index + 1 })) : []
            )
          }
          columns={columns}
          keyField="number"
          responsive
          fixedHeader
          fixedHeaderScrollHeight="400px"
          noDataComponent="No employees found"
          highlightOnHover
          pagination
        />
      
    </div>
  );
};

export default Payroll;
