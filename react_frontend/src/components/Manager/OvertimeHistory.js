import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const OvertimeHistory = () => {
  const [overtimeRecords, setOvertimeRecords] = useState([]);

  useEffect(() => {
    fetchOvertimeRecords();
  }, []);

  // Sample data fetching (replace with actual API call)
  const fetchOvertimeRecords = () => {
    const records = [
      { id: 1, employee: "John Doe", date: "2025-02-10", hours: 3, status: "Approved" },
      { id: 2, employee: "Jane Smith", date: "2025-02-05", hours: 5, status: "Rejected" },
      { id: 3, employee: "Michael Brown", date: "2025-02-08", hours: 2, status: "Recommended Approval" },
      { id: 4, employee: "Emma Wilson", date: "2025-02-11", hours: 4, status: "Pending" },
    ];
    setOvertimeRecords(records);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Overtime Records</h1>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title mb-0">All Overtime Records</h2>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Employee</th>
                <th>Date</th>
                <th>Hours</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {overtimeRecords.map((record) => (
                <tr key={record.id}>
                  <td>{record.employee}</td>
                  <td>{record.date}</td>
                  <td>{record.hours}</td>
                  <td>
                    <span
                      className={`badge ${
                        record.status === "Pending"
                          ? "bg-warning"
                          : record.status === "Approved"
                          ? "bg-success"
                          : record.status === "Rejected"
                          ? "bg-danger"
                          : "bg-secondary"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OvertimeHistory;
