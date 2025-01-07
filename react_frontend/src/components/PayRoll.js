import React, { useState, useEffect, useCallback } from "react";

import "./Payroll.css";

const Payroll = () => {
  const [payrolls, setPayrolls] = useState([
    {
      id: 1,
      employeeName: "John Doe",
      role: "Manager",
      date: "2023-12-01",
      salary: 5000,
      otFee: 500,
      bonus: 1000,
      status: "Completed",
    },
    {
      id: 2,
      employeeName: "Jane Smith",
      role: "Designer",
      date: "2023-12-02",
      salary: 4500,
      otFee: 300,
      bonus: 700,
      status: "Pending",
    },
  ]);

  const [payrollCosts, setPayrollCosts] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [pendingPayments, setPendingPayments] = useState(0);
  const [totalPayrolls, setTotalPayrolls] = useState(0);

  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPayroll, setCurrentPayroll] = useState(null);

  // Function to calculate metrics
  const calculateMetrics = useCallback(() => {
    const costs = payrolls.reduce(
      (sum, payroll) => sum + payroll.salary + payroll.otFee + payroll.bonus,
      0
    );
    const expenses = payrolls
      .filter((payroll) => payroll.status === "Completed")
      .reduce(
        (sum, payroll) => sum + payroll.salary + payroll.otFee + payroll.bonus,
        0
      );
    const pending = payrolls
      .filter((payroll) => payroll.status === "Pending")
      .reduce(
        (sum, payroll) => sum + payroll.salary + payroll.otFee + payroll.bonus,
        0
      );

    setPayrollCosts(costs);
    setTotalExpense(expenses);
    setPendingPayments(pending);
    setTotalPayrolls(payrolls.length);
  }, [payrolls]); // Dependencies of the function

  useEffect(() => {
    calculateMetrics();
  }, [calculateMetrics]);

  // Handle Edit
  const handleEdit = (payroll) => {
    setIsEditMode(true);
    setCurrentPayroll({ ...payroll });
  };

  // Handle Save after Editing or Adding
  const handleSave = () => {
    setPayrolls((prev) => {
      const isExistingPayroll = prev.some((p) => p.id === currentPayroll.id);
      if (isExistingPayroll) {
        return prev.map((p) =>
          p.id === currentPayroll.id ? currentPayroll : p
        );
      } else {
        return [...prev, currentPayroll];
      }
    });
    setIsEditMode(false);
    setCurrentPayroll(null);
  };

  // Handle Input Change during Editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPayroll((prev) => ({
      ...prev,
      [name]:
        name === "salary" || name === "otFee" || name === "bonus"
          ? parseFloat(value)
          : value,
    }));
  };

  // Handle Delete
  const handleDelete = (id) => {
    setPayrolls((prev) => prev.filter((payroll) => payroll.id !== id));
  };

  // Handle Add New Payroll
  const handleAddPayroll = () => {
    const newPayroll = {
      id: payrolls.length + 1,
      employeeName: "",
      role: "",
      date: "",
      salary: 0,
      otFee: 0,
      bonus: 0,
      status: "Pending",
    };
    setIsEditMode(true);
    setCurrentPayroll(newPayroll);
  };

  return (
    <div className="payroll-container">
      <div className="payroll-header">
        <h1>Payroll Management</h1>
        <button className="new-payroll-btn" onClick={handleAddPayroll}>
          New Payroll
        </button>
      </div>

      {/* Metrics Section */}
      <div className="payroll-metrics">
        <div className="metric">
          <h3>Payroll Costs</h3>
          <p>${payrollCosts.toLocaleString()}</p>
        </div>
        <div className="metric">
          <h3>Total Expense</h3>
          <p>${totalExpense.toLocaleString()}</p>
        </div>
        <div className="metric">
          <h3>Pending Payments</h3>
          <p>${pendingPayments.toLocaleString()}</p>
        </div>
        <div className="metric">
          <h3>Total Payrolls</h3>
          <p>{totalPayrolls}</p>
        </div>
      </div>

      {/* Payroll List */}
      <div className="payroll-list">
        <h2>Payroll List</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee Name</th>
              <th>Role</th>
              <th>Date</th>
              <th>Salary</th>
              <th>OT Fee</th>
              <th>Bonus</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payrolls.map((payroll) => (
              <tr key={payroll.id}>
                <td>{payroll.id}</td>
                <td>{payroll.employeeName}</td>
                <td>{payroll.role}</td>
                <td>{payroll.date}</td>
                <td>${payroll.salary}</td>
                <td>${payroll.otFee}</td>
                <td>${payroll.bonus}</td>
                <td>
                  $
                  {(
                    payroll.salary +
                    payroll.otFee +
                    payroll.bonus
                  ).toLocaleString()}
                </td>
                <td
                  className={
                    payroll.status === "Completed"
                      ? "status-completed"
                      : "status-pending"
                  }
                >
                  {payroll.status}
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="action-btn edit-btn"
                      onClick={() => handleEdit(payroll)}
                    >
                      Edit
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(payroll.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Edit or New Payroll */}
      {isEditMode && (
        <div className="modal">
          <div className="modal-content">
            <h2>
              {currentPayroll.id > payrolls.length
                ? "Add Payroll"
                : "Edit Payroll"}
            </h2>
            <label>Employee Name</label>
            <input
              type="text"
              name="employeeName"
              value={currentPayroll.employeeName}
              onChange={handleInputChange}
            />
            <label>Role</label>
            <select
              name="role"
              value={currentPayroll.role}
              onChange={handleInputChange}
            >
              <option value="">Select a role</option>
              <option value="Manager">Manager</option>
              <option value="Designer">Designer</option>
              <option value="Intern">Intern</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="Junior Developer">Junior Developer</option>
            </select>
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={currentPayroll.date}
              onChange={handleInputChange}
            />
            <label>Salary</label>
            <input
              type="number"
              name="salary"
              value={currentPayroll.salary}
              onChange={handleInputChange}
            />
            <label>OT Fee</label>
            <input
              type="number"
              name="otFee"
              value={currentPayroll.otFee}
              onChange={handleInputChange}
            />
            <label>Bonus</label>
            <input
              type="number"
              name="bonus"
              value={currentPayroll.bonus}
              onChange={handleInputChange}
            />
            <label>Status</label>
            <select
              name="status"
              value={currentPayroll.status}
              onChange={handleInputChange}
            >
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
            <div className="modal-actions">
              <button onClick={() => setIsEditMode(false)}>Cancel</button>
              <button onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payroll;
