import React, { useState, useEffect } from "react";
import { BellFill, CheckCircleFill } from "react-bootstrap-icons";
import { Modal, Button, Container, Row, Col, Card } from "react-bootstrap";
import OTRequestForm from "../common/OTRequestForm";
import apiClient from "../api/apiclient";
import DataTable from "../common/DataTable";

const OvertimeRequests = () => {
  const [pending, setPending] = useState(0);
  const [approved, setApproved] = useState(0);
  const [rejected, setRejected] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [availableOvertimeHours, setAvailableOvertimeHours] = useState(0);
  const [overtimeRecords, setOvertimeRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPending, setShowPending] = useState(true);

  useEffect(() => {
    const fetchOvertimeRequests = async () => {
      try {
        const statusResponse = await apiClient.get("/ot/status-count");
        setPending(statusResponse.data.PENDING);
        setApproved(statusResponse.data.APPROVED);
        setRejected(statusResponse.data.REJECTED);

        const recordsResponse = await apiClient.get("/ot/self");
        const recordsWithNumbers = recordsResponse.data.map((record, index) => ({
          ...record,
          number: index + 1,
        }));

        setOvertimeRecords(recordsWithNumbers);
      } catch (error) {
        console.error("Error fetching overtime requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOvertimeRequests();
  }, []);

  const filteredRecords = showPending
    ? overtimeRecords.filter(record => record.otStatus === "PENDING")
    : overtimeRecords.filter(record => record.otStatus === "APPROVED" || record.otStatus === "REJECTED");

  return (
    <Container className="mt-4">
      {/* Overtime Summary */}
      <div className="row mb-3">
  <div className="col-md-4">
    <div className="d-flex align-items-center p-2 border rounded shadow-sm" style={{ backgroundColor: "#f8f9fa" }}>
      <BellFill size={28} color="orange" />
      <div className="ms-3">
        <p className="text-muted mb-1">Pending Requests</p>
        <p className="fw-bold mb-0">{pending}</p>
      </div>
    </div>
  </div>

  <div className="col-md-4">
    <div className="d-flex align-items-center p-2 border rounded shadow-sm" style={{ backgroundColor: "#e9f7ef" }}>
      <CheckCircleFill size={28} color="green" />
      <div className="ms-3">
        <p className="text-muted mb-1">Approved Requests</p>
        <p className="fw-bold mb-0">{approved}</p>
      </div>
    </div>
  </div>

  <div className="col-md-4">
    <div className="d-flex align-items-center p-2 border rounded shadow-sm" style={{ backgroundColor: "#f8d7da" }}>
      <CheckCircleFill size={28} color="red" />
      <div className="ms-3">
        <p className="text-muted mb-1">Rejected Requests</p>
        <p className="fw-bold mb-0">{rejected}</p>
      </div>
    </div>
  </div>
</div>



      {/* Action Buttons */}
      <Row className="mb-3 align-items-center">
      <Col md={6} className="text-start">
     
  <Button 
    variant="primary" 
    onClick={() => setShowModal(true)} 
    className="fw-bold shadow-sm"
    style={{ transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'} 
    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
    onFocus={(e) => e.target.style.boxShadow = '0 0 0 0.25rem rgba(38, 143, 255, 0.5)'}
    onBlur={(e) => e.target.style.boxShadow = 'none'}
  >
    Request Overtime
  </Button>
</Col>

        <Col md={6} className="text-end">
          <Button variant={showPending ? "dark" : "outline-dark"} className="me-2" onClick={() => setShowPending(true)}>
            Pending Requests
          </Button>
          <Button variant={!showPending ? "dark" : "outline-dark"} onClick={() => setShowPending(false)}>
            Confirmed Requests
          </Button>
        </Col>
      </Row>

      {/* Overtime Records Table */}
      <Card className="shadow-sm border-0">
        <Card.Body>
          <Card.Title>{showPending ? "Pending Overtime Requests" : "Confirmed Overtime Requests"}</Card.Title>
          {!loading ? (
            <DataTable
              fetchData={() => filteredRecords}
              columns={[
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
                    const statusColors = {
                      PENDING: "warning",
                      APPROVED: "success",
                      REJECTED: "danger"
                    };
                    return (
                      <span className={`badge bg-${statusColors[row.otStatus] || "secondary"}`}>
                        {row.otStatus}
                      </span>
                    );
                  },
                },
              ]}
              keyField="number"
              responsive
              fixedHeader
              fixedHeaderScrollHeight="400px"
              noDataComponent="No overtime records found"
              highlightOnHover
              pagination
            />
          ) : (
            <p>Loading overtime records...</p>
          )}
        </Card.Body>
      </Card>

      {/* Overtime Form Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center w-100 fs-4 fw-bold">Overtime Request Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OTRequestForm />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default OvertimeRequests;
