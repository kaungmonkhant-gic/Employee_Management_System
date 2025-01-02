import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample payroll data for employees
const payrollData = [
  { name: "Testing", salary: 5000 },
  { name: "Testing 02", salary: 4500 },
  { name: "Testing 03", salary: 6000 },
  { name: "Testing 04", salary: 5500 },
  { name: "Testing 05", salary: 4800 },
];

function PayRoll() {
  return (
    <div>
      <h2>Payroll Management</h2>
     
      {/* Payroll Chart Section */}
      <div style={{ width: "100%", height: 400 }}>
        <h3>Employee Salary Overview</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={payrollData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="salary" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Additional Payroll Information */}
      <div>
        <h3>Payroll Details</h3>
        <table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Salary</th>
              <th>Bonus</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {payrollData.map((employee, index) => {
              // Example calculation for bonus and total salary
              const bonus = employee.salary * 0.1; 
              const total = employee.salary + bonus;
              return (
                <tr key={index}>
                  <td>{employee.name}</td>
                  <td>{employee.salary}</td>
                  <td>{bonus}</td>
                  <td>{total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PayRoll;
