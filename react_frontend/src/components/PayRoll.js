import React, { useState, useEffect, useCallback } from "react";

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
  }, [payrolls]);

  useEffect(() => {
    calculateMetrics();
  }, [calculateMetrics]);

  const handleEdit = (payroll) => {
    setIsEditMode(true);
    setCurrentPayroll({ ...payroll });
  };

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

  const handleDelete = (id) => {
    setPayrolls((prev) => prev.filter((payroll) => payroll.id !== id));
  };

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
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Payroll Management</h1>
        <button className="btn btn-primary" onClick={handleAddPayroll}>
          New Payroll
        </button>
      </div>

      {/* Metrics Section */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Payroll Costs</h5>
              <p className="card-text">${payrollCosts.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Expense</h5>
              <p className="card-text">${totalExpense.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Pending Payments</h5>
              <p className="card-text">${pendingPayments.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Total Payrolls</h5>
              <p className="card-text">{totalPayrolls}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payroll List */}
      <table className="table table-striped">
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
                className={`text-${
                  payroll.status === "Completed" ? "success" : "danger"
                }`}
              >
                {payroll.status}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(payroll)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(payroll.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isEditMode && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {currentPayroll.id > payrolls.length
                    ? "Add Payroll"
                    : "Edit Payroll"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsEditMode(false)}
                ></button>
              </div>
              <div className="modal-body">
                <label>Employee Name</label>
                <input
                  type="text"
                  name="employeeName"
                  className="form-control mb-2"
                  value={currentPayroll.employeeName}
                  onChange={handleInputChange}
                />
                <label>Role</label>
                <select
                  name="role"
                  className="form-select mb-2"
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
                  className="form-control mb-2"
                  value={currentPayroll.date}
                  onChange={handleInputChange}
                />
                <label>Salary</label>
                <input
                  type="number"
                  name="salary"
                  className="form-control mb-2"
                  value={currentPayroll.salary}
                  onChange={handleInputChange}
                />
                <label>OT Fee</label>
                <input
                  type="number"
                  name="otFee"
                  className="form-control mb-2"
                  value={currentPayroll.otFee}
                  onChange={handleInputChange}
                />
                <label>Bonus</label>
                <input
                  type="number"
                  name="bonus"
                  className="form-control mb-2"
                  value={currentPayroll.bonus}
                  onChange={handleInputChange}
                />
                <label>Status</label>
                <select
                  name="status"
                  className="form-select"
                  value={currentPayroll.status}
                  onChange={handleInputChange}
                >
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsEditMode(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payroll;
