import React, { useEffect, useState } from "react";
import otcontroller from "../Manager/Controller/otcontroller";
import DataTable from "react-data-table-component";

const ManagerDashboard = () => {
  const [otRecords, setOtRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  // State for Overtime Request Form
  const [newOTRequest, setNewOTRequest] = useState({
    date: "",
    startTime: "",
    endTime: "",
    reason: "",
  });

  useEffect(() => {
    fetchOTRecords();
  }, []);

  const fetchOTRecords = async () => {
    try {
      const response = await otcontroller.fetchOvertimeSelf();
      console.log("OT Records:", response);
      setOtRecords(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error("Error fetching OT records:", err);
      setError("Failed to load OT records.");
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOTRequest({ ...newOTRequest, [name]: value });
  };

  // Submit Overtime Request
  const submitOTRequest = async () => {
    try {
      await otcontroller.createOvertimeRequest(newOTRequest);
      alert("Overtime request submitted successfully!");
      setShowModal(false);
      fetchOTRecords(); // Refresh records
    } catch (err) {
      console.error("Error submitting OT request:", err);
      alert("Failed to submit overtime request.");
    }
  };

  const columns = [
    { name: "No.", selector: (_, index) => index + 1, width: "50px" },
    { name: "Date", selector: (row) => row.date, minWidth: "120px" },
    { name: "Start Time", selector: (row) => row.startTime, minWidth: "120px" },
    { name: "End Time", selector: (row) => row.endTime, minWidth: "120px" },
    { name: "Hours", selector: (row) => row.otTime, minWidth: "100px" },
    { name: "Status", selector: (row) => row.otStatus, minWidth: "120px" },
    { name: "Reason", selector: (row) => row.reason, minWidth: "150px" },
  ];

  return (
    <div className="container mt-4">
      <h2>Manager Dashboard - Employee OT Records</h2>

      <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
        Request Overtime
      </button>

      {loading ? (
        <p>Loading OT records...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <DataTable
          columns={columns}
          data={otRecords}
          keyField="id"
          responsive
          fixedHeader
          fixedHeaderScrollHeight="400px"
          noDataComponent="No overtime records available"
          highlightOnHover
          pagination
        />
      )}

      {/* Overtime Request Modal */}
      {showModal && (
        <div className="modal show" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Request Overtime</h5>
                <button className="close" onClick={() => setShowModal(false)}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <label>Date:</label>
                <input type="date" name="date" className="form-control" onChange={handleInputChange} />
                <label>Start Time:</label>
                <input type="time" name="startTime" className="form-control" onChange={handleInputChange} />
                <label>End Time:</label>
                <input type="time" name="endTime" className="form-control" onChange={handleInputChange} />
                <label>Reason:</label>
                <textarea name="reason" className="form-control" onChange={handleInputChange}></textarea>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
                <button className="btn btn-success" onClick={submitOTRequest}>
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerDashboard;
