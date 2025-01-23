import React, { useState, useEffect } from "react";
import axios from "axios";

function EmployeeSalary() {
  const [salaries, setSalaries] = useState([]);
  const [userRole] = useState("employee"); 

  
  useEffect(() => {
    axios
      .get("/api/salaries")
      .then((response) => {
        setSalaries(response.data);
      })
      .catch((error) => {
        console.error("Error fetching salaries:", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Employee Salary Details</h2>

      
      <div className="card shadow p-4">
        <h4 className="mb-3">Salary List</h4>
        <table className="table table-bordered table-hover">
          <thead className="table-primary">
            <tr>
              <th>Salary ID</th>
              <th>Employee ID</th>
              <th>Basic Salary</th>
              <th>House Allowance</th>
              <th>Transportation Allowance</th>
              <th>Total Salary</th>
              {userRole !== "employee" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {salaries.map((salary) => (
              <tr key={salary.salaryId}>
                <td>{salary.salaryId}</td>
                <td>{salary.employeeId}</td>
                <td>{salary.basicSalary}</td>
                <td>{salary.houseAllowance}</td>
                <td>{salary.transportationAllowance}</td>
                <td>
                  {parseFloat(salary.basicSalary) +
                    parseFloat(salary.houseAllowance) +
                    parseFloat(salary.transportationAllowance)}
                </td>
                {userRole !== "employee" && (
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => console.log(`Editing salary ${salary.salaryId}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => console.log(`Deleting salary ${salary.salaryId}`)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeSalary;
