import React, { useState, useEffect } from "react";
import { BellFill, CheckCircleFill, PlusCircleFill } from "react-bootstrap-icons";
import { Modal, Button, Card } from "react-bootstrap";
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
  try {
    const result = await overtimeController.markAsPaid(id);
    if (result.success) {
      // Find the paid OT request in the approved list
      const paidRequest = approved.find((record) => record.id === id);
      // Remove it from the approved list
      setApproved((prev) => prev.filter((record) => record.id !== id));
      // Add it to the paid list
      setPaid((prev) => [...prev, { ...paidRequest, otStatus: "PAID" }]);
      alert(result.message);
    } else {
      alert(result.message);
    }
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response);
      alert(`Failed to mark OT request ${id} as paid. Server responded with status code ${error.response.status}: ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      console.error('Error request:', error.request);
      alert('No response received from the server. Please try again later.');
    } else {
      console.error('Error message:', error.message);
      alert(`An error occurred: ${error.message}`);
    }
  }
};

  
  

  // Handle opening the modal to add an overtime request
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);


  const columns = [
    { 
      field: "number", 
      headerName: "No.", 
      minWidth: 50, 
      flex: 0.5, 
      cellClassName: "text-center",  // Ensures text alignment in Bootstrap
      headerClassName: "text-center" // Centers the header text as well
    },
    
    { field: "employeeName", headerName: "Employee Name", minWidth: 150, flex: 1, cellClassName: "text-center" },
    // { field: "managerName", headerName: "Manager Name", minWidth: 150, flex: 1, cellClassName: "text-center" },
    
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
        {/* <div className="col-md-3">
          <div className="d-flex align-items-center p-3 border rounded shadow-sm" style={{ backgroundColor: "#fff" }}>
            <BellFill size={32} color="orange" />
            <div className="ms-3">
              <p className="text-muted mb-1">Pending </p>
              <p className="fw-bold mb-0">{pending.length}</p>
            </div>
          </div>
        </div>  */}

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
