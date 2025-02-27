import React, { useState, useEffect } from "react";
import { BellFill, CheckCircleFill } from "react-bootstrap-icons";
import { Modal, Button } from "react-bootstrap";
import LeaveForm from "../common/LeaveForm";
import apiClient from "../api/apiclient";

const LeaveRequests = () => {
  const [pending, setPending] = useState(0);
  const [approved, setApproved] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [availableLeaveDays, setAvailableLeaveDays] = useState(0);

  useEffect(() => {
    fetchLeaveData();
  }, []);

  const fetchLeaveData = async () => {
    try {
      const response = await apiClient.get("/leave/submit");
      const data = response.data;
      setPending(data.pending || 0);
      setApproved(data.approved || 0);
    } catch (error) {
      console.error("Error fetching leave data:", error);
    }
  };

  const handleNewRequest = async (formData) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const startDate = new Date(formData.startDate).setHours(0, 0, 0, 0);
    const endDate = new Date(formData.endDate).setHours(0, 0, 0, 0);
    const requestedDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;

    if (startDate < today) {
      alert("Start date cannot be in the past.");
      return;
    }

    if (endDate < startDate) {
      alert("End date cannot be earlier than the start date.");
      return;
    }

    if (requestedDays > availableLeaveDays) {
      alert("You do not have enough leave balance to make this request.");
      return;
    }

    try {
      const response = await apiClient.post("/leave/submit", formData);
      if (response.status === 201) {
        setAvailableLeaveDays((prev) => prev - requestedDays);
        fetchLeaveData();
        sendToManager(formData); 
        setShowModal(false);
        setPending(pending + 1); // Increase pending requests
      } else {
        console.error("Failed to submit leave request");
      }
    } catch (error) {
      console.error("Error submitting leave request:", error);
    }
  };

  const sendToManager = async (formData) => {
    try {
      await apiClient.post("/manager/leave/request", formData);
      alert("Leave request sent to the manager successfully.");
    } catch (error) {
      console.error("Error sending leave request to manager:", error);
    }
  };

  const handleApproveRequest = async (requestId) => {
    try {
      const response = await apiClient.post(`/manager/approve/${requestId}`);
      if (response.status === 200) {
        setPending(pending - 1); // Decrease pending
        setApproved(approved + 1); // Increase approved
        alert("Leave request approved.");
      } else {
        alert("Failed to approve the request.");
      }
    } catch (error) {
      console.error("Error approving leave request:", error);
    }
  };

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
              <p className="fw-bold mb-0">{approved}</p>
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
          <LeaveForm
            user={{ name: "John Doe", id: "EMP123" }}
            availableLeaveDays={availableLeaveDays}
            onSubmit={() => setPending(pending + 1)} 
            onApprove={() => setApproved(approved + 1)}
            onLeaveSubmit={handleNewRequest}
            onCancel={() => setShowModal(false)}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LeaveRequests;
