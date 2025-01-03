import React from "react";
import "./Salary.css";

function Salary() {
  return (
    <div className="salary-container">
      <h2>Salary Details</h2>
      <div className="salary-card">
        <p>
          <strong>Basic Salary:</strong> $5,000
        </p>
        <p>
          <strong>Bonuses:</strong> $1,200
        </p>
        <p>
          <strong>Deductions:</strong> $500
        </p>
        <hr />
        <p className="salary-total">
          <strong>Total:</strong> $5,700
        </p>
      </div>
    </div>
  );
}

export default Salary;
