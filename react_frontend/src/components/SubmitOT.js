import React, { useState, useEffect } from "react";
import { CheckCircleFill } from "react-bootstrap-icons";
import { Modal, Button, Spinner, Row, Col, Card, Table } from "react-bootstrap";
import OTRequestForm from "./common/OTRequestForm";
import apiClient from "./api/apiclient";

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
        const allRecords = recordsResponse.data.map((record, index) => ({
          ...record,
          number: index + 1,
        }));

        setOvertimeRecords(allRecords);
      } catch (error) {
        console.error("Error fetching overtime requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOvertimeRequests();
  }, []);

  return (
    <div className="container mt-4">
      <Row className="mb-4">
        {/* Total Overtime Card */}
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Row className="align-items-center">
                <Col xs={3} className="text-center">
                  <CheckCircleFill size={40} color="green" />
                </Col>
                <Col xs={9}>
                  <Card.Title>Total Overtime</Card.Title>
                  <Card.Text className="h4">{approved}</Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        {/* Additional Cards for other metrics can be added here */}
      </Row>

      {/* Overtime Requests Table */}
      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="text-center mb-3">Overtime Requests</Card.Title>
          {loading ? (
            <div className="text-center my-4">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading overtime records...</p>
            </div>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Duration</th>
                  <th>Reason</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {overtimeRecords.map((record) => (
                  <tr key={record.number}>
                    <td>{record.number}</td>
                    <td>{record.date}</td>
                    <td>{record.startTime}</td>
                    <td>{record.endTime}</td>
                    <td>{record.otTime}</td>
                    <td>{record.reason}</td>
                    <td>
                      <span
                        className={`badge bg-${record.otStatus === "APPROVED" ? "success" : record.otStatus === "REJECTED" ? "danger" : "secondary"}`}
                      >
                        {record.otStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Overtime Request Button */}
      <div className="text-center mt-4">
        <Button variant="primary" size="lg" onClick={() => setShowModal(true)}>
          Request Overtime
        </Button>
      </div>

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
