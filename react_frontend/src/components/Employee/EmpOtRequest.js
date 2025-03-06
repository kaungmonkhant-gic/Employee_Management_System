import React, { useState, useEffect } from "react";
import { BellFill, CheckCircleFill } from "react-bootstrap-icons";
import { Modal, Button } from "react-bootstrap";
import OTRequestForm from "../common/OTRequestForm";
import apiClient from "../api/apiclient";
import DataTable from "../common/DataTable";

const OvertimeRequests = () => {
  const [pending, setPending] = useState(0);
  const [approved, setApproved] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [availableOvertimeHours, setAvailableOvertimeHours] = useState(0);
  const [overtimeRecords, setOvertimeRecords] = useState([]); // Store user's overtime requests
  const [loading, setLoading] = useState(true); // Loading state
  const [showPending, setShowPending] = useState(true); // Manage which table to show
  const columns = [
    { field: "number", headerName: "No.", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "date", headerName: "Date", minWidth: 150, flex: 1, cellClassName: "text-center" },
    { field: "startTime", headerName: "Start", minWidth: 200, flex: 1.5, cellClassName: "text-center" },
    { field: "endTime", headerName: "Reason", minWidth: 200, flex: 1.5, cellClassName: "text-center" },
    { field: "otTime", headerName: "Duration", minWidth: 100, flex: 0.7, cellClassName: "text-center" },
    { field: "reason", headerName: "Reason", minWidth: 200, flex: 1.5, cellClassName: "text-center" },
    {
      field: "otStatus",
      headerName: "Status",
      minWidth: 130,
      flex: 1,
      cellClassName: "text-center",
      render: (row) => {
        let badgeColor = "secondary"; // Default color
    
        switch (row.otStatus) {
          case "APPROVED":
            badgeColor = "success"; // Green
            break;
          case "REJECTED":
            badgeColor = "danger"; // Red
            break;
          case "PENDING":
            badgeColor = "warning"; // Yellow
            break;
          case "IN_PROGRESS":
            badgeColor = "primary"; // Blue
            break;
          case "CANCELLED":
            badgeColor = "dark"; // Dark Grey
            break;
          default:
            badgeColor = "secondary"; // Default Grey
        }
    
        return (
          <span className={`badge bg-${badgeColor}`}>
            {row.otStatus}
          </span>
        );
      },
    }
  ];

  useEffect(() => {
    const fetchOvertimeRequests = async () => {
      try {
        const statusResponse = await apiClient.get("/ot/status-count"); 
        setPending(statusResponse.data.PENDING);
        setApproved(statusResponse.data.APPROVED);
        setRejected(statusResponse.data.REJECTED);
  
        const recordsResponse = await apiClient.get("/ot/self"); // Fetch user requests
        const recordsWithNumbers = recordsResponse.data.map((record, index) => ({
          ...record,
          number: index + 1, // Assigning a unique index
        }));
  
        setOvertimeRecords(recordsWithNumbers); 
      } catch (error) {
        console.error("Error fetching overtime requests:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };
  
    fetchOvertimeRequests();
  }, []);

  // Filter records based on selected status
  const filteredRecords = showPending
    ? overtimeRecords.filter(record => record.otStatus === "PENDING")
    : overtimeRecords.filter(record => record.otStatus === "APPROVED" || record.otStatus === "REJECTED");

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="d-flex align-items-center p-3 border rounded shadow-sm bg-white">
            <BellFill size={32} color="orange" />
            <div className="ms-3">
              <p className="text-muted mb-1">Pending Overtime</p>
              <p className="fw-bold mb-0">{pending}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="d-flex align-items-center p-3 border rounded shadow-sm bg-white">
            <CheckCircleFill size={32} color="green" />
            <div className="ms-3">
              <p className="text-muted mb-1">Approved Overtime</p>
              <p className="fw-bold mb-0">{approved}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="d-flex align-items-center p-3 border rounded shadow-sm bg-white">
            <CheckCircleFill size={32} color="red" />
            <div className="ms-3">
              <p className="text-muted mb-1">Rejected Overtime</p>
              <p className="fw-bold mb-0">{rejected}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3 border rounded shadow-sm bg-white">
        <h5 className="mb-3">Overtime Requests</h5>
        <p>Available Overtime Balance: {availableOvertimeHours} hours</p>
        <Button variant="secondary" onClick={() => setShowModal(true)}>
          Request Overtime
        </Button>
      </div>

      {/* Buttons to toggle between Pending and Confirmed Overtime */}
      <div className="mt-4 mb-3">
        <Button
          variant="primary"
          className="me-2"
          onClick={() => setShowPending(true)}
        >
          Pending Overtime
        </Button>
        <Button
          variant="success"
          onClick={() => setShowPending(false)}
        >
          Confirmed Overtime
        </Button>
      </div>

      {/* Overtime Records Table using DataTable */}
      <div className="mt-4 p-3 border rounded shadow-sm bg-white">
        <h5 className="mb-3">{showPending ? "Pending Overtime" : "Confirmed Overtime"}</h5>

        {/* Only show DataTable once data is loaded */}
        {!loading ? (
          <DataTable
            fetchData={() => filteredRecords}
            columns={columns}
            keyField="number"
            responsive
            fixedHeader
            fixedHeaderScrollHeight="400px"
            noDataComponent="No overtime records found"
            highlightOnHover
            pagination
          />
        ) : (
          <p>Loading overtime records...</p> // Display loading text until data is fetched
        )}
      </div>

      {/* Overtime Form Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="w-100 text-center py-3" style={{ color: "black", fontSize: "2rem", fontWeight: "bold" }}>
              Overtime Request Form
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OTRequestForm />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OvertimeRequests;
