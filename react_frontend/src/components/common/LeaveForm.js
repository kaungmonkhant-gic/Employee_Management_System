import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { getLeaveBalance, fetchRemainingLeaveDays } from "../Employee/Controller/LeaveRequestController";
import EmpLeaveRequestController from "../Employee/Controller/LeaveRequestController";
import EmpLeaveService from "../Employee/Service/LeaveRequestService";

const LeaveForm = ({ }) => {
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",  // Empty initially
    endDate: "",
    reason: "",
  });
  const [leaveBalance, setLeaveBalance] = useState({
    annualLeave: 0,
    casualLeave: 0,
    medicalLeave: 0,
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // For submit or cancel modal
  const [totalLeaveDays, setTotalLeaveDays] = useState(0); // Total leave days
  const [remainingLeaveDays, setRemainingLeaveDays] = useState(0); // Remaining leave days
  

   // Fetch leave balance when the component mounts
   useEffect(() => {
    const fetchBalance = async () => {
      const balance = await EmpLeaveRequestController.getLeaveBalance();
      setLeaveBalance(balance);
    };
    fetchBalance();
  }, []);


// Fetch remaining leave days when leave type changes
useEffect(() => {
  if (formData.leaveType) {
    EmpLeaveRequestController.fetchRemainingLeaveDays(formData.leaveType)
      .then(setRemainingLeaveDays)
      .catch((error) => console.error("Failed to fetch remaining leave days", error));
  }
}, [formData.leaveType]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Calculate total leave days based on start and end dates
  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (start <= end) {
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both days
        setTotalLeaveDays(diffDays);
      }
    } else {
      setTotalLeaveDays(0);
    }
  }, [formData.startDate, formData.endDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};
    const today = new Date().toISOString().split("T")[0]; // Get today's date in yyyy-mm-dd format

    // Validation
    if (!formData.leaveType) validationErrors.leaveType = "Leave type is required.";
    if (!formData.startDate) validationErrors.startDate = "Start date is required.";
    if (formData.startDate < today) validationErrors.startDate = "Start date cannot be in the past.";
    if (!formData.endDate) validationErrors.endDate = "End date is required.";
    if (formData.endDate < formData.startDate) validationErrors.endDate = "End date cannot be earlier than start date.";
    if (!formData.reason) validationErrors.reason = "Please provide a reason.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (totalLeaveDays > remainingLeaveDays) {
      validationErrors.totalLeaveDays = "You do not have enough leave days remaining.";
      setErrors(validationErrors);
      return;
    }

    // Show confirmation modal before submission
    setModalType("submit");
    setShowModal(true);

  };

  const handleCancel = () => {
    setModalType("cancel");
    setFormData({ leaveType: "", startDate: "", endDate: "", reason: "" });
    setShowModal(true);
  };

  const handleConfirmSubmission = async () => {
    const leaveRequestData = {
      leaveType: formData.leaveType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      totalDays: totalLeaveDays,
      reason: formData.reason,
    };
  
    try {
      const response = await EmpLeaveService.applyForLeave(leaveRequestData);
      alert("Leave request submitted successfully!");
      console.log("Leave request submitted successfully:", response);
  
      // Optionally show a success message to the user
      // alert("Leave request submitted successfully!");
  
      // Reset form after successful submission
      setFormData({ leaveType: "", startDate: "", endDate: "", reason: "" });
      setErrors({});
      setShowModal(false);
    } catch (error) {
      console.error("Error submitting leave request:", error);
  
      // Show error message to user
      // alert("Failed to submit leave request. Please try again.");
    }
  };

  const handleCancelSubmission = () => {
    // setFormData({ leaveType: "", startDate: "", endDate: "", reason: "" });
    // setErrors({});
    setShowModal(false);
  };

  return (
    <div className="container mt-2">
      <div className="row justify-content-center">
        <div className="card p-2">
          <form onSubmit={handleSubmit}>
            {/* Leave Type */}
            <div className="row align-items-center mb-3">
              <div className="col-4 text-muted">Leave Type:</div>
              <div className="col-8">
                <select
                  name="leaveType"
                  className="form-select border-0 border-bottom"
                  value={formData.leaveType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Leave Type</option>
                  <option value="Medical Leave">Medical Leave</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Annual Leave">Annual Leave</option>
                </select>
                {errors.leaveType && <small className="text-danger">{errors.leaveType}</small>}
              </div>
            </div>

            {/* Start Date */}
            <div className="row align-items-center mb-3">
              <div className="col-4 text-muted">Start Date:</div>
              <div className="col-8">
                <input
                  type="date"
                  name="startDate"
                  className="form-control border-0 border-bottom"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
                {errors.startDate && <small className="text-danger">{errors.startDate}</small>}
              </div>
            </div>

            {/* End Date */}
            <div className="row align-items-center mb-3">
              <div className="col-4 text-muted">End Date:</div>
              <div className="col-8">
                <input
                  type="date"
                  name="endDate"
                  className="form-control border-0 border-bottom"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
                {errors.endDate && <small className="text-danger">{errors.endDate}</small>}
              </div>
            </div>

            {/* Total Leave Days */}
            <div className="row align-items-center mb-3">
              <div className="col-4 text-muted">Total Leave Days:</div>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control border-0 border-bottom"
                  value={totalLeaveDays > 0 ? totalLeaveDays : "0"}
                  readOnly
                />
              </div>
            </div>

            {/* Remaining Leave Days */}
            <div className="row align-items-center mb-3">
              <div className="col-4 text-muted">Remaining Leave Days:</div>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control border-0 border-bottom"
                  value={`You have days ${remainingLeaveDays ?? 0} left for leave`}
                  readOnly
                />
              </div>
            </div>

            {/* Reason */}
            <div className="row align-items-center mb-3">
              <div className="col-4 text-muted">Reason:</div>
              <div className="col-8">
                <textarea
                  name="reason"
                  className="form-control border-0 border-bottom"
                  value={formData.reason}
                  onChange={handleChange}
                  required
                ></textarea>
                {errors.reason && <small className="text-danger">{errors.reason}</small>}
              </div>
            </div>

            {/* Submit and Cancel buttons */}
            <div className="d-flex justify-content-end mt-4">
              <button type="submit" className="btn" style={{ backgroundColor: "#001F3F", color: "white", marginRight: "10px" }} onClick={handleSubmit}>
                Submit
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal for confirmation */}
        <Modal show={showModal} onHide={handleCancelSubmission} centered style={{ width: 600, height: 500 }}>
          <Modal.Header closeButton>
            <Modal.Title>{modalType === "submit" ? "Confirm Leave Submission" : "Are You Sure?"}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {modalType === "submit" ? (
              <>
                <p>
                  You are about to submit a leave request for <strong>{formData.leaveType}</strong> from{" "}
                  <strong>{formData.startDate}</strong> to <strong>{formData.endDate}</strong>.
                </p>
                <p>
                  You have <strong>{totalLeaveDays}</strong> days of leave. You currently have{" "}
                  <strong>{remainingLeaveDays}</strong> days left. Are you sure you want to submit the leave request?
                </p>
              </>
            ) : (
              <>
                <textarea
                  readOnly
                  className="form-control" style={{ height: 95 }}
                  value={`Leave Type: ${formData.leaveType}\nStart Date: ${formData.startDate}\nEnd Date: ${formData.endDate}`}
                />
              </>
            )}
          </Modal.Body>

          <Modal.Footer>
            {modalType === "submit" ? (
              <>
                <Button variant="danger" onClick={handleConfirmSubmission}>
                  Yes
                </Button>
                <Button variant="secondary" onClick={handleCancelSubmission}>
                  No
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="danger"
                  onClick={() => {
                    setFormData({ leaveType: "", startDate: "", endDate: "", reason: "" });
                    setShowModal(false);
                  }}
                  disabled={!formData.leaveType || !formData.startDate || !formData.endDate}
                >
                  Yes
                </Button>
                <Button variant="secondary" onClick={handleCancelSubmission}>
                  No
                </Button>
              </>
            )}
          </Modal.Footer>
        </Modal>
    </div>
  );
};

export default LeaveForm;
