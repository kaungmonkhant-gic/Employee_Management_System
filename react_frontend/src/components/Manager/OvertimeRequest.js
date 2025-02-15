import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const OvertimeRequest = () => {
  const [dailyRequests, setDailyRequests] = useState([]);

  useEffect(() => {
    fetchDailyRequests();
  }, []);

  // Sample data fetching (replace with actual API call)
  const fetchDailyRequests = () => {
    const requests = [
      { id: 1, employee: "John Doe", date: "2025-02-15", hours: 3, status: "Pending" },
      { id: 2, employee: "Jane Smith", date: "2025-02-15", hours: 2, status: "Pending" },
    ];
    setDailyRequests(requests);
  };

  const recommendApproval = (id) => {
    updateRequestStatus(id, "Recommended Approval");
  };

  const recommendRejection = (id) => {
    updateRequestStatus(id, "Recommended Rejection");
  };

  const updateRequestStatus = (id, status) => {
    setDailyRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Daily Overtime Requests</h1>
      <div className="card">
        <div className="card-header">
          <h2 className="card-title mb-0">Requests for Today</h2>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>Employee</th>
                <th>Date</th>
                <th>Hours</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dailyRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.employee}</td>
                  <td>{request.date}</td>
                  <td>{request.hours}</td>
                  <td>
                    <span
                      className={`badge ${
                        request.status === "Pending"
                          ? "bg-warning"
                          : request.status === "Recommended Approval"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td>
                    {request.status === "Pending" && (
                      <>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => recommendApproval(request.id)}
                        >
                          Recommend Approval
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => recommendRejection(request.id)}
                        >
                          Recommend Rejection
                        </button>
                      </>
                    )}
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

export default OvertimeRequest;
