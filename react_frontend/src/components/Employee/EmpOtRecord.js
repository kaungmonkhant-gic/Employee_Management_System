import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EmpOtRecord = () => {
  const [overtimeRecords, setOvertimeRecords] = useState([]);

  useEffect(() => {
    fetchEmpOtRecord();
  }, []);

  // Sample data fetching (replace with actual API call)
  const fetchEmpOtRecord = () => {
    const records = [
      {
        id: 1,
        date: "2025-02-10",
        hours: 3,
        reason: "Project deadline",
        status: "Approved",
      },
      {
        id: 2,
        date: "2025-02-12",
        hours: 2,
        reason: "Team meeting preparation",
        status: "Pending",
      },
      {
        id: 3,
        date: "2025-02-08",
        hours: 4,
        reason: "System upgrade",
        status: "Rejected",
      },
    ];
    setOvertimeRecords(records);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">My Overtime Records</h1>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title mb-0">Overtime History</h2>
        </div>
        <div className="card-body">
          {overtimeRecords.length > 0 ? (
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>Date</th>
                  <th>Hours</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {overtimeRecords.map((record) => (
                  <tr key={record.id}>
                    <td>{record.date}</td>
                    <td>{record.hours}</td>
                    <td>{record.reason}</td>
                    <td>
                      <span
                        className={`badge ${
                          record.status === "Pending"
                            ? "bg-warning"
                            : record.status === "Approved"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No overtime records found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmpOtRecord;
