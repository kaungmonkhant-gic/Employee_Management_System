import React, { useEffect, useState } from 'react';

const EmpAttendanceList = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    // Fetch attendance data from backend (use mock data if backend is not ready)
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/attendance');
        if (response.ok) {
          const data = await response.json();
          setAttendanceData(data);
        } else {
          console.error('Failed to fetch attendance data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAttendanceData();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: '90%', overflowX: 'auto' }}>
        <h2 className="text-primary text-center mb-4">Employee Attendance List</h2>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Late Minutes</th>
              <th>Check-In Time</th>
              <th>Check-Out Time</th>
              <th>Date</th>
              <th>Leave Status</th>
              <th>Over Time</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.length > 0 ? (
              attendanceData.map((record, index) => (
                <tr key={index}>
                  <td>{record.emp_id}</td>
                  <td>{record.name || 'John Doe'}</td> {/* Replace with actual name if available */}
                  <td>{record.late_min || '-'}</td>
                  <td>{record.check_in_time || '-'}</td>
                  <td>{record.check_out_time || '-'}</td>
                  <td>{record.date || '-'}</td>
                  <td>{record.is_leave ? 'Yes' : 'No'}</td>
                  <td>{record.ot_id || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No attendance data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmpAttendanceList;
