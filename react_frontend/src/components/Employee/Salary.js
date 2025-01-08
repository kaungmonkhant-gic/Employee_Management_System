import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Salary() {
  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <h2 className="text-center mb-4">Salary Details</h2>
        <div className="mb-3">
          <p>
            <strong>Basic Salary:</strong> $5,000
          </p>
          <p>
            <strong>Bonuses:</strong> $1,200
          </p>
          <p>
            <strong>Deductions:</strong> $500
          </p>
        </div>
        <hr />
        <div className="text-center mt-3">
          <p className="fw-bold">
            <strong>Total:</strong> $5,700
          </p>
        </div>
      </div>
    </div>
  );
}

export default Salary;
