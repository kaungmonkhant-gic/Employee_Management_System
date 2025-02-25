import React, { useState, useEffect } from "react";
import { BellFill, CheckCircleFill } from "react-bootstrap-icons";
import { Modal, Button } from "react-bootstrap";
import LeaveForm from "../common/LeaveForm";
import apiClient from "../api/apiclient";

const LeaveRequests = () => {
  const [pending, setPending] = useState(0);
  const [approved, setApproved] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchLeaveData();
  }, []);
  const fetchLeaveData = async ()=> {
    try{
      const response = await apiClient.get("/leave/submit");
      const data = response.data;
      setPending(data.pending || 0);
      setApproved(data.approved || 0);
    } catch(error){
      console.error("Error fetching leave data:",error);
    }
  };

  const handleNewRequest = async (formData) => {
    try {
      const response = await apiClient.post("/leave/submit", formData);

      if (response.status === 201) {
        fetchLeaveData(); // Refresh counts after submission
      } else {
        console.error("Failed to submit leave request");
      }
    } catch (error) {
      console.error("Error submitting leave request:", error);
    }
  };


  // const handleNewRequest = () => {
  //   setPending((prev) => prev + 1);
  // };

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="d-flex align-items-center p-3 border rounded shadow-sm" style={{ backgroundColor: "#fff" }}>
            <BellFill size={32} color="orange" />
            <div className="ms-3">
              <p className="text-muted mb-1">Pending Requests</p>
              <p className="fw-bold mb-0">{pending}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="d-flex align-items-center p-3 border rounded shadow-sm" style={{ backgroundColor: "#fff" }}>
            <CheckCircleFill size={32} color="green" />
            <div className="ms-3">
              <p className="text-muted mb-1">Approved Requests</p>
              <p className="fw-bold mb-0">{approved}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 border rounded shadow-sm bg-white">
        <h5 className="mb-3">Leave Requests</h5>
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
            availableLeaveDays={10} 
            onSubmit={() => setPending(pending + 1)} 
            onApprove={() => setApproved(approved + 1)}
            onLeaveSubmit = {handleNewRequest}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LeaveRequests;
