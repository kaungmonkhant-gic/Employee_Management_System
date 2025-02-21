import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import apiClient from "../api/apiclient";

const OvertimeRequestForm = ({ checkInTime }) => { // assuming checkInTime is passed as a prop
  const [formData, setFormData] = useState({
    id: "",
    employeeName: "",
    date: "",
    startTime: "",
    endTime: "",
    otTime: "",
    reason: "",
    managerName: "",
    errorMessage: "",
  });
  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate that overtime start time is not earlier than check-in time
  const validateOvertime = () => {
    const { startTime } = formData;

    if (startTime && checkInTime) {
      const overtimeStart = new Date(`1970-01-01T${startTime}:00`);
      const checkIn = new Date(`1970-01-01T${checkInTime}:00`);

      if (overtimeStart < checkIn) {
        return "Overtime start time cannot be earlier than check-in time.";
      }
    }
    return ""; // No error
  }
  // Calculate duration based on startTime and endTime
  useEffect(() => {
    const error = validateOvertime();
    setFormData((prevData) => ({
      ...prevData,
      errorMessage: error,
    }));

    if (formData.startTime && formData.endTime && !error) {
      const start = new Date(`1970-01-01T${formData.startTime}:00`);
      const end = new Date(`1970-01-01T${formData.endTime}:00`);

      if (end >= start) {
        const otTimeInMinutes = (end - start) / 1000 / 60;
        setFormData((prevData) => ({
          ...prevData,
          otTime: `${otTimeInMinutes} min`,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          otTime: "Invalid Time Range",
        }));
      }
    }
  }, [formData.startTime, formData.endTime, checkInTime]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateOvertime();
    if (validationError) {
      alert(validationError);
      return;
    }

    try {
      console.log("Submitting Overtime Request:", formData);

      // Using ApiClient to submit the overtime request
      const response = await apiClient.post("/ot/submit", formData); // ApiClient handles the base URL

      console.log("Overtime request submitted successfully:", response);

      // Clear the form upon successful submission
      setFormData({
        date: "",
        startTime: "",
        endTime: "",
        otTime: "",
        reason: "",
        errorMessage: "",
      });

      alert("Overtime request submitted successfully.");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit the request. Please try again later.");
    }
  };
  
  // Handle cancel button
  const handleCancel = () => {
    setFormData({
      
      date: "",
      startTime: "",
      endTime: "",
      otTime: "",
      reason: "",
      errorMessage: "",
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div
              className="card-header text-white"
              style={{ backgroundColor: "#001F3F" }}
            >
              <h3 className="text-center mb-0">Overtime Request Form</h3>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>

                {/* Overtime Date */}
                <div className="row align-items-center mb-3">
                  <div className="col-4 text-muted">Overtime Date:</div>
                  <div className="col-8">
                    <input
                      type="date"
                      className="form-control border-0 border-bottom"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Start Time */}
                <div className="row align-items-center mb-3">
                  <div className="col-4 text-muted">Start Time:</div>
                  <div className="col-8">
                    <input
                      type="time"
                      className="form-control border-0 border-bottom"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* End Time */}
                <div className="row align-items-center mb-3">
                  <div className="col-4 text-muted">End Time:</div>
                  <div className="col-8">
                    <input
                      type="time"
                      className="form-control border-0 border-bottom"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Duration */}
                <div className="row align-items-center mb-3">
                  <div className="col-4 text-muted">Overtime Time:</div>
                  <div className="col-8">
                    <input
                      type="text"
                      className="form-control border-0 border-bottom"
                      name="otTime"
                      value={formData.otTime}
                      readOnly
                    />
                  </div>
                </div>

                {/* Reason */}
                <div className="row align-items-center mb-3">
                  <div className="col-4 text-muted">Reason:</div>
                  <div className="col-8">
                    <textarea
                      className="form-control border-0 border-bottom"
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      rows="3"
                      required
                    ></textarea>
                  </div>
                </div>

                {/* Error Message */}
                {formData.errorMessage && (
                  <div className="row mb-3">
                    <div className="col-12 text-danger">{formData.errorMessage}</div>
                  </div>
                )}

                {/* Submit and Cancel Buttons */}
                <div className="d-flex justify-content-end mt-4">
                  <button
                    type="submit"
                    className="btn"
                    style={{
                      backgroundColor: "#001F3F",
                      color: "white",
                      marginRight: "10px",
                    }}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OvertimeRequestForm;
