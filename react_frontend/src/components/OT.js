import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const OT = () => {
  const [otRecords, setOtRecords] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");

  const calculateOTHours = (start, end) => {
    const startDate = new Date(`1970-01-01T${start}`);
    const endDate = new Date(`1970-01-01T${end}`);
    const diff = (endDate - startDate) / (1000 * 60 * 60); // Difference in hours
    return diff > 0 ? diff : 0;
  };

  const calculateOTPay = (position, hours, date) => {
    const dayOfWeek = new Date(date).getDay();
    const isWeekendOrHoliday = dayOfWeek === 0 || dayOfWeek === 6;
    const oneDaySalary = 1000;
    let otRate = 0;

    if (position === "Officer") {
      otRate = isWeekendOrHoliday ? 0.2 : 0.1;
    } else if (position === "Senior Officer") {
      otRate = isWeekendOrHoliday ? 0.3 : 0.2;
    } else if (position === "Manager") {
      otRate = isWeekendOrHoliday ? 0.4 : 0.3;
    }

    return hours * otRate * oneDaySalary;
  };

  const handleAddRecord = (e) => {
    e.preventDefault();

    const otHours = calculateOTHours(startTime, endTime);
    if (otHours < 1) {
      setError("OT hours must be at least 1 hour.");
      return;
    }

    if (
      employeeName &&
      employeeId &&
      position &&
      department &&
      date &&
      startTime &&
      endTime
    ) {
      const otPay = calculateOTPay(position, otHours, date);
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
      setEmployeeName("");
      setEmployeeId("");
      setPosition("");
      setDepartment("");
      setDate("");
      setStartTime("");
      setEndTime("");
      setError("");
    }
  };

  return (
    <div className="container my-5">
      <header className="mb-4">
        <h1 className="text-center">Overtime Dashboard</h1>
      </header>

      <main>
        <section className="mb-5">
          <h2>Log Overtime</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleAddRecord}>
            <div className="mb-3">
              <label htmlFor="employeeName" className="form-label">
                Employee Name
              </label>
              <input
                type="text"
                className="form-control"
                id="employeeName"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="employeeId" className="form-label">
                Employee ID
              </label>
              <input
                type="text"
                className="form-control"
                id="employeeId"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="position" className="form-label">
                Position
              </label>
              <select
                id="position"
                className="form-select"
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
            <div className="mb-3">
              <label htmlFor="department" className="form-label">
                Department
              </label>
              <input
                type="text"
                className="form-control"
                id="department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="startTime" className="form-label">
                Start Time
              </label>
              <input
                type="time"
                className="form-control"
                id="startTime"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="endTime" className="form-label">
                End Time
              </label>
              <input
                type="time"
                className="form-control"
                id="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Record
            </button>
          </form>
        </section>

        <section>
          <h2>Overtime Records</h2>
          <table className="table table-bordered">
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
                  <td>{record.employeeId}</td>
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
                  <td colSpan="9" className="text-center">
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
