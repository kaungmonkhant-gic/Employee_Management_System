import React, { useState, useEffect } from "react";
import { BellFill, CheckCircleFill, PlusCircleFill } from "react-bootstrap-icons";
import { Modal, Button } from "react-bootstrap";
import OTRequestForm from "./common/OTRequestForm"; // Assuming this component handles the OT request form
import apiClient from "./api/apiclient";
import { useNavigate } from "react-router-dom";
import DataTable from "./common/DataTable";
import overtimeController from "../Controller/overtimeController";

const OvertimeRequests = () => {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [paid, setPaid] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [showModal, setShowModal] = useState(false); // Modal state for adding OT request
  // const [newOTRequest, setNewOTRequest] = useState({}); // State for new OT request form
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOvertimeRequests = async () => {
      try {
        const response = await apiClient.get("/ot/status-count");
        const data = response.data || {}; 
        setPending(Array.isArray(data.PENDING) ? data.PENDING : []);
        setApproved(Array.isArray(data.APPROVED) ? data.APPROVED : []);
        setPaid(Array.isArray(data.PAID) ? data.PAID : []);
        setRejected(Array.isArray(data.REJECTED) ? data.REJECTED : []);
      } catch (error) {
        console.error("Error fetching overtime requests:", error);
        setPending([]);
        setApproved([]);
        setPaid([]);
        setRejected([]);
      }
    };
    fetchOvertimeRequests();
  }, []);

  const handlePay = async (id) => {
    const result = await overtimeController.markAsPaid(id);
    if (result.success) {
      setApproved((prev) => prev.filter((record) => record.id !== id));
      setPaid((prev) => [...prev, { id, status: "PAID" }]);
      alert(result.message);
    } else {
      alert(result.message);
    }
  };

  // Handle opening the modal to add an overtime request
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // // Handle submitting a new overtime request
  // const handleAddOTRequest = async (data) => {
  //   try {
  //     const response = await apiClient.post("/ot/request", data);
  //     if (response.data.success) {
  //       alert("Overtime request submitted successfully!");
  //       // Refresh data after submitting
  //       OvertimeRequests();
  //       handleCloseModal(); // Close the modal
  //     } else {
  //       alert("Failed to submit overtime request.");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting overtime request:", error);
  //     alert("An error occurred. Please try again.");
  //   }
  // };

  const columns = [
    { field: "id", headerName: "Employee ID", minWidth: 150, flex: 1, cellClassName: "text-center" },
    { field: "date", headerName: "Date", minWidth: 150, flex: 1, cellClassName: "text-center" },
    { field: "startTime", headerName: "Start Time", minWidth: 120, flex: 1, cellClassName: "text-center" },
    { field: "endTime", headerName: "End Time", minWidth: 120, flex: 1, cellClassName: "text-center" },
    { field: "otTime", headerName: "Duration", minWidth: 120, flex: 1, cellClassName: "text-center" },
    { field: "reason", headerName: "Reason", minWidth: 200, flex: 2, cellClassName: "text-center" },
    { field: "otStatus", headerName: "Status", minWidth: 120, flex: 1, cellClassName: "text-center" },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 200,
      flex: 2,
      cellClassName: "text-center",
      render: (row) => (
        <div className="d-flex justify-content-center gap-2">
          {row.otStatus === "APPROVED" && (
            <Button variant="success" onClick={() => handlePay(row.id)}>Pay</Button>
          )}
          {row.otStatus === "PENDING" && <span>Pending</span>}
          {row.otStatus === "PAID" && <span>Paid</span>}
        </div>
      ),
    },
    { field: "state", headerName: "State", minWidth: 120, flex: 1, cellClassName: "text-center", render: (row) => (row.otStatus === "PAID" ? "Paid" : "Pending") },
  ];

  return (
    <div className="container mt-3 vh-100">
      <div className="row mb-3">
        <div className="col-md-3">
          <div className="d-flex align-items-center p-3 border rounded shadow-sm" style={{ backgroundColor: "#fff" }}>
            <BellFill size={32} color="orange" />
            <div className="ms-3">
              <p className="text-muted mb-1">Pending Requests</p>
              <p className="fw-bold mb-0">{pending.length}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="d-flex align-items-center p-3 border rounded shadow-sm" style={{ backgroundColor: "#fff" }}>
            <CheckCircleFill size={32} color="green" />
            <div className="ms-3">
              <p className="text-muted mb-1">Approved Requests</p>
              <p className="fw-bold mb-0">{approved.length}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="d-flex align-items-center p-3 border rounded shadow-sm" style={{ backgroundColor: "#fff" }}>
            <CheckCircleFill size={32} color="blue" />
            <div className="ms-3">
              <p className="text-muted mb-1">Paid Requests</p>
              <p className="fw-bold mb-0">{paid.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Button to trigger overtime request modal */}
      {/* <Button variant="primary" onClick={handleShowModal}>
        <PlusCircleFill size={20} className="me-2" />
        Add Overtime Request
      </Button> */}

      {/* Modal for overtime request form
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Overtime Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OTRequestForm onSubmit={handleAddOTRequest} />
        </Modal.Body>
      </Modal> */}

      {/* Data table for showing overtime requests */}
      <DataTable
        fetchData={overtimeController.fetchOvertimeRecords}
        columns={columns}
        keyField="id"
        responsive
        fixedHeader
        fixedHeaderScrollHeight="400px"
        noDataComponent="No overtime records found"
        highlightOnHover
        pagination
      />
    </div>
  );
};

export default OvertimeRequests;
