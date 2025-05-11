import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import EmpLeaveRequestController from "../Employee/Controller/LeaveRequestController";
import EmpLeaveService from "../Employee/Service/LeaveRequestService";
import apiClient from "../api/apiclient";

const LeaveForm = ({}) => {
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    leaveDuration: "",
    totalDays: "",
    reason: "",
  });

  const [, setLeaveBalance] = useState({
    annualLeave: 0,
    casualLeave: 0,
    medicalLeave: 0,
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // For submit or cancel modal
  const [remainingLeaveDays, setRemainingLeaveDays] = useState(0); // Remaining leave days
  const [workingDayErrors, setWorkingDayErrors] = useState({
    startDateError: "",
    endDateError: "",
  });

  // useEffect(() => {
  //   const fetchBalance = async () => {
  //     const balance = await EmpLeaveRequestController.getLeaveBalance();
  //     setLeaveBalance(balance);
  //   };
  //   fetchBalance();
  // }, []);
    // Fetch leave balance when the leaveType changes
    useEffect(() => {
      const fetchLeaveBalance = async () => {
        if (formData.leaveType) {
          try {
            const balance = await EmpLeaveRequestController.getLeaveBalance(formData.leaveType);
            setLeaveBalance(balance);
          } catch (error) {
            console.error("Error fetching leave balance:", error);
          }
        }
      };
  
      fetchLeaveBalance();
    }, [formData.leaveType]); // Dependency on leaveType

  // Fetch remaining leave days when leave type changes
  useEffect(() => {
    const fetchRemainingLeaveDays = async () => {
      if (formData.leaveType) {
        try {
          const remainingDays = await EmpLeaveRequestController.fetchRemainingLeaveDays(formData.leaveType);
          setRemainingLeaveDays(remainingDays); // Update state with fetched balance
        } catch (error) {
          console.error("Failed to fetch remaining leave days:", error);
        }
      }
    };
  
    fetchRemainingLeaveDays();
  }, [formData.leaveType]); // Runs when leaveType changes
  

  // Check if startDate and endDate are working days
  useEffect(() => {
    const checkIfWorkingDay = async (date) => {
      try {
        const response = await apiClient.get(`/isWorkingDay?date=${date}`);
        return response.data; // Assuming the API returns true or false
      } catch (error) {
        console.error("Error checking working day:", error);
        return false;
      }
    };

    const validateDates = async () => {
      if (formData.startDate) {
        const isStartDateWorkingDay = await checkIfWorkingDay(formData.startDate);
        setWorkingDayErrors((prev) => ({
          ...prev,
          startDateError: isStartDateWorkingDay ? "" : "Start date is not a working day.",
        }));
      }

      if (formData.endDate) {
        const isEndDateWorkingDay = await checkIfWorkingDay(formData.endDate);
        setWorkingDayErrors((prev) => ({
          ...prev,
          endDateError: isEndDateWorkingDay ? "" : "End date is not a working day.",
        }));
      }
    };

    // Validate dates whenever startDate or endDate changes
    validateDates();
  }, [formData.startDate, formData.endDate]);

  // Calculate total leave days based on start and end dates
  // useEffect(() => {
  //   if (formData.startDate && formData.endDate) {
  //     const start = new Date(formData.startDate);
  //     const end = new Date(formData.endDate);

  //     if (start <= end) {
  //       const diffTime = Math.abs(end - start);
  //       let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both days

  //       // Check if the leave is half-day for start or end
  //       if (formData.leaveDuration === "Morning Half Leave" || formData.startLeaveType === "Evening Half Leave") {
  //         diffDays -= 0.5;
  //       }

  //       setFormData((prevState) => ({ ...prevState, totalDays: diffDays }));
  //     }
  //   } else {
  //     setFormData((prevState) => ({ ...prevState, totalDays: "" }));
  //   }
  // }, [formData.startDate, formData.endDate, formData.startLeaveType, formData.leaveType]);

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

    // Validate half-day leave
    if (formData.leaveDuration === "Morning Half Leave" || formData.leaveDuration === "Evening Half Leave") {
      // Check if the start and end date are the same
      if (formData.startDate !== formData.endDate) {
        validationErrors.startDate = "Start and End dates must be the same for Half Leave.";
        validationErrors.endDate = "Start and End dates must be the same for Half Leave.";
      }
      setFormData((prevState) => ({ ...prevState, totalDays: 0.5 }));
    }

    // Check working day errors
    if (workingDayErrors.startDateError || workingDayErrors.endDateError) {
      validationErrors.startDate = workingDayErrors.startDateError;
      validationErrors.endDate = workingDayErrors.endDateError;
    }

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (formData.totalDays > remainingLeaveDays) {
      validationErrors.totalLeaveDays = "You do not have enough leave days remaining.";
      setErrors(validationErrors);
      return;
    }

    // Show confirmation modal before submission
    setModalType("submit");
    setShowModal(true);
  };

    // Calculate total leave days 
    useEffect(() => {
      const calculateTotalLeaveDays = async () => {
        if (formData.startDate && formData.endDate) {
          const start = new Date(formData.startDate);
          const end = new Date(formData.endDate);
    
          if (start <= end) {
            let diffDays = 0;
            let currentDate = new Date(start);
    
            // Loop through each date between start and end
            while (currentDate <= end) {
              const dateString = currentDate.toISOString().split("T")[0]; // Format YYYY-MM-DD
              
              // Check if the current date is a working day
              try {
                const response = await apiClient.get(`/isWorkingDay?date=${dateString}`);
                if (response.data) {
                  diffDays++; // Only count working days
                }
              } catch (error) {
                console.error("Error checking working day:", error);
              }
    
              currentDate.setDate(currentDate.getDate() + 1); // Move to next day
            }
    
            // Adjust for "Morning Half Leave" or "Evening Half Leave"
            if (formData.leaveDuration === "Morning Half Leave" || formData.leaveDuration === "Evening Half Leave") {
              // If it's the same day, half leave
              if (formData.startDate === formData.endDate) {
                diffDays = 0.5; // Only half a day if the leave is on the same day
              } else {
                // If it spans multiple days, consider it 1 day leave
                diffDays = diffDays;
              }
            }
    
            setFormData((prevState) => ({ ...prevState, totalDays: diffDays }));
          }
        } else {
          setFormData((prevState) => ({ ...prevState, totalDays: "" }));
        }
      };
    
      calculateTotalLeaveDays();
    }, [formData.startDate, formData.endDate, formData.leaveDuration]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setModalType("cancel");
    setFormData({ leaveType: "", startDate: "", endDate: "", leaveDuration: "", reason: "" });
    setShowModal(true);
  };

  const handleConfirmSubmission = async () => {
    const leaveRequestData = {
      leaveType: formData.leaveType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      leaveDuration: formData.leaveDuration,
      totalDays: formData.totalDays,
      reason: formData.reason,
    };

    try {
      const response = await EmpLeaveService.applyForLeave(leaveRequestData);
      alert("Leave request submitted successfully!");
      console.log("Leave request submitted successfully:", response);

      // Reset form after successful submission
      setFormData({ leaveType: "", startDate: "", endDate: "", leaveDuration: "", reason: "" });
      setErrors({});
      setShowModal(false);
    } catch (error) {
      console.error("Error submitting leave request:", error);
    }
  };

  const handleCancelSubmission = () => {
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

            {/* Leave Duration */}
            <div className="row align-items-center mb-3">
              <div className="col-4 text-muted">Leave Duration:</div>
              <div className="col-8">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="leaveDuration"
                    value="Full Leave"
                    checked={formData.leaveDuration === "Full Leave"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Full Leave</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="leaveDuration"
                    value="Morning Half Leave"
                    checked={formData.leaveDuration === "Morning Half Leave"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Morning Half Leave</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="leaveDuration"
                    value="Evening Half Leave"
                    checked={formData.leaveDuration === "Evening Half Leave"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Evening Half Leave</label>
                </div>
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
                {workingDayErrors.startDateError && (
                  <small className="text-danger">{workingDayErrors.startDateError}</small>
                )}
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
                {workingDayErrors.endDateError && (
                  <small className="text-danger">{workingDayErrors.endDateError}</small>
                )}
              </div>
            </div>

            {/* Total Leave Days */}
            <div className="row align-items-center mb-3">
              <div className="col-4 text-muted">Total Leave Days:</div>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control border-0 border-bottom"
                  value={formData.totalDays || ""}
                  readOnly
                />
              </div>
            </div>

             {/* Leave Balance Display */}
            {/* Remaining Leave Balance */}
            {formData.leaveType && (
            <div className="row align-items-center mb-3">
            <div className="col-4 text-muted">Remaining Leave Days:</div>
            <div className="col-8">
            <input
              type="text"
              className="form-control border-0 border-bottom"
              value={remainingLeaveDays || "0"} // Display remaining days
              readOnly
            />
            </div>
            </div>
            )}


            {/* Reason */}
            <div className="row align-items-center mb-3">
              <div className="col-4 text-muted">Reason:</div>
              <div className="col-8">
                <textarea
                  name="reason"
                  className="form-control"
                  value={formData.reason}
                  onChange={handleChange}
                  rows="3"
                  required
                ></textarea>
                {errors.reason && <small className="text-danger">{errors.reason}</small>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="row justify-content-end">
              <div className="col-auto">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button type="button" className="btn btn-secondary ms-2" onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={handleCancelSubmission}>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === "submit" ? "Confirm Submission" : "Confirm Cancellation"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === "submit" ? (
            "Are you sure you want to submit this leave request?"
          ) : (
            "Are you sure you want to cancel this request?"
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelSubmission}>
            Close
          </Button>
          {modalType === "submit" && (
            <Button variant="primary" onClick={handleConfirmSubmission}>
              Confirm 
            </Button>
          )}
          {modalType === "cancel" && (
            <Button variant="danger" onClick={handleCancelSubmission}>
              Cancel
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LeaveForm;
