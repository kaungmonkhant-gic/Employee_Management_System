import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import salaryController from "../Controller/salaryController";

import DataTable from "./common/DataTable";

function Salary() {
  
  const [columns] = useState([
    
    { field: "employeeId", headerName: "Emp ID", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "employeeName", headerName: "Emp Name", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "basicSalary", headerName: "Basic Salary", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "houseAllowance", headerName: "House Allowance", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "transportation", headerName: "Transportation", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
   
  ]);


  return (
    <div className="container">
  <div className="row">
    <div className="col-12 col-md-10 col-lg-12">

      <h2 className="text-center mb-4">Salary Allowlance</h2>
     
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
    </div>
</div>
  );
}

export default Salary;
