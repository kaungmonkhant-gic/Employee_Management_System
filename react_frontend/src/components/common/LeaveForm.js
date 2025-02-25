import React, { useState } from "react";

const LeaveForm = ({onLeaveSubmit}) => {

    
  // Initial State
  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const [errors, setErrors] = useState({});

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Leave request submitted:", formData);
    onLeaveSubmit();

    setFormData({
        leaveType:"",
        statDate:"",
        endDate:"",
        reason:"",
    });
};

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded shadow-sm bg-white">
      <h5 className="mb-3">Apply for Leave</h5>

      {/* Leave Type Dropdown */}
      <div className="mb-3">
        <label className="form-label">Leave Type</label>
        <select
          name="leaveType"
          className="form-select"
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

      {/* Start Date */}
      <div className="mb-3">
        <label className="form-label">Start Date</label>
        <input
          type="date"
          name="startDate"
          className="form-control"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
        {errors.startDate && <small className="text-danger">{errors.startDate}</small>}
      </div>

      {/* End Date */}
      <div className="mb-3">
        <label className="form-label">End Date</label>
        <input
          type="date"
          name="endDate"
          className="form-control"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
        {errors.endDate && <small className="text-danger">{errors.endDate}</small>}
      </div>

      {/* Reason Textarea */}
      <div className="mb-3">
        <label className="form-label">Reason</label>
        <textarea
          name="reason"
          className="form-control"
          value={formData.reason}
          onChange={handleChange}
          required
        ></textarea>
        {errors.reason && <small className="text-danger">{errors.reason}</small>}
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-secondary">
        Apply for Leave
      </button>
    </form>
  );
};

export default LeaveForm;
