import React, { useState } from 'react';
import './OT.css';

const OT = () => {
  const [otRecords, setOtRecords] = useState([]);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');

  const calculateOTHours = (start, end) => {
    const startDate = new Date(`1970-01-01T${start}`);
    const endDate = new Date(`1970-01-01T${end}`);
    const diff = (endDate - startDate) / (1000 * 60 * 60); // Difference in hours
    return diff > 0 ? diff : 0;
  };

  const calculateOTPay = (position, hours, date) => {
    const dayOfWeek = new Date(date).getDay(); // 0 (Sunday) to 6 (Saturday)
    const isWeekendOrHoliday = dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
    const oneDaySalary = 1000; // Assume a base daily salary
    let otRate = 0;

    // Determine OT rate based on position and day
    if (position === 'Officer') {
      otRate = isWeekendOrHoliday ? 0.2 : 0.1;
    } else if (position === 'Senior Officer') {
      otRate = isWeekendOrHoliday ? 0.3 : 0.2;
    } else if (position === 'Manager') {
      otRate = isWeekendOrHoliday ? 0.4 : 0.3;
    }

    return hours * otRate * oneDaySalary; // OT Pay = Hours * OT Rate * One Day Salary
  };

  const handleAddRecord = (e) => {
    e.preventDefault();

    // Validate timestamps
    const otHours = calculateOTHours(startTime, endTime);
    if (otHours < 1) {
      setError('OT hours must be at least 1 hour.');
      return;
    }

    if (employeeName && employeeId && position && department && date && startTime && endTime) {
      const otPay = calculateOTPay(position,employeeId, otHours, date);
      const newRecord = {
        employeeName,
        employeeId,
        position,
        department,
        date,
        startTime,
        endTime,
        otHours,
        otPay,
      };

      setOtRecords([...otRecords, newRecord]);
      setEmployeeName('');
      setEmployeeId('');
      setPosition('');
      setDepartment('');
      setDate('');
      setStartTime('');
      setEndTime('');
      setError('');
    }
  };

  return (
    <div className="ot-dashboard">
      <header className="dashboard-header">
        <h1>Overtime Dashboard</h1>
      </header>

      <main className="dashboard-main">
        <section className="form-section">
          <h2>Log Overtime</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleAddRecord}>
            <div className="form-group">
              <label htmlFor="employeeName">Employee Name</label>
              <input
                type="text"
                id="employeeName"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="employeeId">Employee ID</label>
              <input
                type="text"
                id="employeeId"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="position">Position</label>
              <select
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
              >
                <option value="">Select Position</option>
                <option value="Officer">Officer</option>
                <option value="Senior Officer">Senior Officer</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <input
                type="text"
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="startTime">Start Time</label>
              <input
                type="time"
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="endTime">End Time</label>
              <input
                type="time"
                id="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn">
              Add Record
            </button>
          </form>
        </section>

        <section className="table-section">
          <h2>Overtime Records</h2>
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Employee ID</th>
                <th>Position</th>
                <th>Department</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>OT Hours</th>
                <th>OT Pay</th>
              </tr>
            </thead>
            <tbody>
              {otRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.employeeName}</td>
                  <td>{record.position}</td>
                  <td>{record.department}</td>
                  <td>{record.date}</td>
                  <td>{record.startTime}</td>
                  <td>{record.endTime}</td>
                  <td>{record.otHours.toFixed(1)}</td>
                  <td>${record.otPay.toFixed(2)}</td>
                </tr>
              ))}
              {otRecords.length === 0 && (
                <tr>
                  <td colSpan="8" className="no-records">
                    No overtime records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default OT;
