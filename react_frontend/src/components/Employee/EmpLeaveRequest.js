import React, { useState, useEffect } from "react";
import { BellFill, CheckCircleFill } from "react-bootstrap-icons";
import { Modal, Button } from "react-bootstrap";
import LeaveForm from "../common/LeaveForm";
import apiClient from "../api/apiclient";

const LeaveRequests = () => {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [availableLeaveDays, setAvailableLeaveDays] = useState(0);


  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await apiClient.get("/leave/status-count"); // Replace with actual API endpoint
        setPending(response.data.PENDING);
        setApproved(response.data.APPROVED);
        setRejected(response.data.REJECTED);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };

    fetchLeaveRequests();
  }, []);
  
  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="d-flex align-items-center p-3 border rounded shadow-sm" style={{ backgroundColor: "#fff" }}>
            <BellFill size={32} color="orange" />
            <div className="ms-3">
              <p className="text-muted mb-1">Pending Requests</p>
              <p className="fw-bold mb-0">{pending}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="d-flex align-items-center p-3 border rounded shadow-sm" style={{ backgroundColor: "#fff" }}>
            <CheckCircleFill size={32} color="green" />
            <div className="ms-3">
              <p className="text-muted mb-1">Approved Requests</p>
              <p className="fw-bold mb-0">{approved}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="d-flex align-items-center p-3 border rounded shadow-sm" style={{ backgroundColor: "#danger" }}>
            <CheckCircleFill size={32} color="red" />
            <div className="ms-3">
              <p className="text-muted mb-1">Rejected Requests</p>
              <p className="fw-bold mb-0">{rejected}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 border rounded shadow-sm bg-white">
        <h5 className="mb-3">Leave Requests</h5>
        <p>Available Leave Balance: {availableLeaveDays} days</p>
        <Button variant="secondary" onClick={() => setShowModal(true)}>
          Apply for leave
        </Button>
      </div>

      {/* Leave Form Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Leave Request Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LeaveForm/>
           {/* called the leave form in common file */}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LeaveRequests;
