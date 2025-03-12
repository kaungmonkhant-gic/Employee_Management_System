import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const RejectModal = ({ show, handleClose, handleReject, requestId }) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (comment.trim() === "") {
      setError("Rejection reason is required.");
      return;
    }
  
    setError(""); // Clear error if valid
    handleReject(requestId, comment.trim()); // Pass rejection reason
  };
  
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reject Overtime Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea
          className="form-control"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter rejection reason"
          rows="4"
        ></textarea>
        {error && <div className="text-danger mt-2">{error}</div>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSubmit}>
          Reject
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RejectModal;
