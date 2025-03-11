import React, { useState, useEffect } from "react";
import { CheckCircleFill } from "react-bootstrap-icons";
import { Modal, Button, Spinner } from "react-bootstrap";
import OTRequestForm from "../common/OTRequestForm";
import apiClient from "../api/apiclient";
import DataTable from "../common/DataTable";

const OvertimeRequests = () => {
  const [approved, setApproved] = useState(0);
  const [overtimeRecords, setOvertimeRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchOvertimeRequests = async () => {
      try {
        const statusResponse = await apiClient.get("/ot/status-count"); 
        setApproved(statusResponse.data.APPROVED);

        const recordsResponse = await apiClient.get("/ot/self");
        const confirmedRecords = recordsResponse.data
          .filter(record => record.otStatus === "APPROVED" || record.otStatus === "REJECTED")
          .map((record, index) => ({
            ...record,
            number: index + 1,
          }));

        setOvertimeRecords(confirmedRecords);
      } catch (error) {
        console.error("Error fetching overtime requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOvertimeRequests();
  }, []);

  const columns = [
    { field: "number", headerName: "No.", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "date", headerName: "Date", minWidth: 150, flex: 1, cellClassName: "text-center" },
    { field: "startTime", headerName: "Start Time", minWidth: 200, flex: 1.5, cellClassName: "text-center" },
    { field: "endTime", headerName: "End Time", minWidth: 200, flex: 1.5, cellClassName: "text-center" },
    { field: "otTime", headerName: "Duration", minWidth: 100, flex: 0.7, cellClassName: "text-center" },
    { field: "reason", headerName: "Reason", minWidth: 200, flex: 1.5, cellClassName: "text-center" },
    {
      field: "otStatus",
      headerName: "Status",
      minWidth: 130,
      flex: 1,
      cellClassName: "text-center",
      render: (row) => {
        const badgeColors = {
          APPROVED: "success",
          REJECTED: "danger",
        };

        return (
          <span className={`badge bg-${badgeColors[row.otStatus] || "secondary"}`}>
            {row.otStatus}
          </span>
        );
      },
    }
  ];

  return (
    <div className="container mt-4">
      {/* Total Overtime Card */}
      <div className="d-flex justify-content-center mb-4">
        <div className="col-md-4">
          <div className="d-flex align-items-center justify-content-center p-4 border rounded shadow-sm bg-white">
            <CheckCircleFill size={40} color="green" />
            <div className="ms-3 text-center">
              <h6 className="text-muted mb-1">Total Overtime</h6>
              <h4 className="fw-bold mb-0">{approved} </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Overtime Requests Table */}
      <div className="p-4 border rounded shadow-sm bg-white">
        <h5 className="mb-3 text-center">Confirmed Overtime Requests</h5>

        {loading ? (
          <div className="text-center my-4">
            <Spinner animation="border" variant="primary" />
            <p className="mt-2">Loading overtime records...</p>
          </div>
        ) : (
          <DataTable
            fetchData={() => overtimeRecords}
            columns={columns}
            keyField="number"
            responsive
            fixedHeader
            fixedHeaderScrollHeight="400px"
            noDataComponent="No confirmed overtime records found"
            highlightOnHover
            pagination
          />
        )}
      </div>

      {/* Overtime Request Button */}
      <div className="text-center mt-4">
        <Button variant="primary" size="lg" onClick={() => setShowModal(true)}>
          Request Overtime
        </Button>
      </div>

      {/* Overtime Form Modal */}
      {/* Overtime Form Modal */}
  <Modal show={showModal} onHide={() => setShowModal(false)} centered>
    <Modal.Header closeButton>
      <Modal.Title className="w-100 text-center">Overtime Request Form</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <OTRequestForm onSuccess={() => setShowModal(false)} />
    </Modal.Body>
  </Modal>

    </div>
  );
};

export default OvertimeRequests;