import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const EmpAttendance = () => {
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleCheckIn = () => {
    if (!date) {
      setError('Please select a date before checking in.');
      return;
    }
    setError('');
    navigate('/employee-dashboard/attendance-list', { state: { action: 'Check In', date } });
  };

  const handleCheckOut = () => {
    if (!date) {
      setError('Please select a date before checking out.');
      return;
    }
    setError('');
    navigate('/employee-dashboard/attendance-list', { state: { action: 'Check Out', date } });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
    >
      <div
        className="card shadow p-4"
        style={{ maxWidth: '600px', width: '100%', backgroundColor: '#fff' }}
      >
        <h2 className="text-primary text-center mb-4">Attendance</h2>

        {/* Date Selector */}
        <div className="form-group mb-4">
          <label
            htmlFor="date"
            className="form-label fw-bold d-block mb-2"
            style={{ fontSize: '16px' }}
          >
            Select Date:
          </label>
          <inputp
            type="date"
            id="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Error Message */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Check-In and Check-Out Buttons */}
        <div className="d-flex justify-content-center gap-3 mt-4">
          <button
            className="btn btn-primary px-4 py-2"
            style={{ minWidth: '120px' }}
            onClick={handleCheckIn}
          >
            Check In
          </button>
          <button
            className="btn btn-secondary px-4 py-2"
            style={{ minWidth: '120px' }}
            onClick={handleCheckOut}
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmpAttendance;
