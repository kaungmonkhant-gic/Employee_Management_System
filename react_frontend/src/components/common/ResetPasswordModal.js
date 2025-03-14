import React, { useState, useEffect, useRef } from "react";

const ResetPasswordModal = ({ show, onClose, onSubmit }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Add state for success message

  const firstInputRef = useRef(null);

  // Move focus to the first input when modal opens
  useEffect(() => {
    if (show && firstInputRef.current) {
      firstInputRef.current.focus();
    }
    setError(""); // Reset error on modal open
    setSuccessMessage(""); // Reset success message on modal open
  }, [show]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim(); // Trim input
    
    if (name === "currentPassword") setCurrentPassword(trimmedValue);
    if (name === "newPassword") setNewPassword(trimmedValue);
    if (name === "confirmPassword") setConfirmPassword(trimmedValue);
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password must match.");
      setSuccessMessage(""); // Reset success message
      return;
    }

    if (!newPassword || !currentPassword) {
      setError("All fields are required.");
      setSuccessMessage(""); // Reset success message
      return;
    }

    setError(""); // Clear any previous error
    setSuccessMessage(""); // Clear any previous success message
    console.log("Triggering handleResetPassword...");
    // Call onSubmit to trigger the backend request
    onSubmit(currentPassword, newPassword, confirmPassword);
  };

  // If modal is not open, return null to prevent rendering
  if (!show) return null;

  return (
    <div 
      className="modal fade show"
      style={{ display: "block" }}
      role="dialog"
      aria-labelledby="resetPasswordModal"
      aria-hidden="false" // Ensures modal is accessible when open
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="resetPasswordModal">Reset Password</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label htmlFor="currentPassword" className="form-label">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  className="form-control"
                  value={currentPassword}
                  onChange={handleInputChange}
                  ref={firstInputRef} // Auto-focus here when modal opens
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="form-control"
                  value={newPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-control"
                  value={confirmPassword}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              {/* Show error message */}
              {error && <div className="alert alert-danger">{error}</div>}

              {/* Show success message */}
              {successMessage && <div className="alert alert-success">{successMessage}</div>}

              <button type="submit" className="btn btn-primary">Reset Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
