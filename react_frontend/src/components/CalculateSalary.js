import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Row, Col } from "antd";
import DataTable from "./common/DataTable";
import salaryController from "../Controller/salaryController";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import axios from "axios";

const API_BASE_URL = "http://localhost:8081/salary";

const EmployeeSalaryCalculation = () => {
  const [workingDays, setWorkingDays] = useState(0);
  const [selectedDate, setSelectedDate] = useState(dayjs()); // Default to current month & year
  const [employees, setEmployees] = useState([]); // State for employees data
  const [loading, setLoading] = useState(false); // Loading state
  const token = localStorage.getItem("token"); // Retrieve token from localStorage
  const [isCalculated, setIsCalculated] = useState(false); // Track calculation step


  // Handle date change
  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  // Fetch salary data when selected month changes
  useEffect(() => {
    const fetchSalaryData = async () => {
      if (!selectedDate) return;

      try {
        setLoading(true);
        const selectedMonth = selectedDate.month() + 1; // Convert to 1-based index
        const selectedYear = selectedDate.year();

        const response = await axios.get(`${API_BASE_URL}/data`, {
          params: { year: selectedYear, month: selectedMonth },
          headers: { Authorization: `Bearer ${token}` }, // Add token here
        });

        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching salary data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalaryData();
  }, [selectedDate, token]);

  // Calculate salary based on working days
  const calculateSalary = async () => {
    if (workingDays <= 0 || !selectedDate) {
      alert("Please enter valid working days and select a month.");
      return;
    }
  
    const selectedMonth = selectedDate.format("MMMM");
    const selectedYear = selectedDate.year();
  
    const updatedEmployees = employees.map((emp) => {
      const totalOtFee = (emp.basicSalary * 12 * 2 * emp.otTime) / (52 * 48);
      const totalLeaveOverFee = (emp.basicSalary * emp.unpaidLeave) / workingDays;
  
      return {
        ...emp,
        totalOtFee: totalOtFee.toFixed(2),
        totalLeaveOverFee: totalLeaveOverFee.toFixed(2),
        finalSalary:
          emp.basicSalary + emp.houseAllowance + emp.transportation + emp.bonus +
          Number(emp.manualAdjustment || 0) + totalOtFee - totalLeaveOverFee,
      };
    });
  
    try {
      await axios.post(`${API_BASE_URL}/temp-save`, updatedEmployees, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setEmployees(updatedEmployees);
      setIsCalculated(true); // ✅ Switch to the calculated table
    } catch (error) {
      console.error("Error calculating salaries:", error);
      alert("Failed to calculate salaries. Please try again.");
    }
  };
  

  const confirmSalary = async () => {
    try {
      // Move calculated salaries to history table
      await axios.post(`${API_BASE_URL}/confirm-salary`, employees, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      // Clear temporary table after confirmation
      await axios.delete(`${API_BASE_URL}/clear-temp`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      alert("Salary confirmed successfully!");
      setEmployees([]); // Clear the table in UI
    } catch (error) {
      console.error("Error confirming salaries:", error);
      alert("Failed to confirm salaries. Please try again.");
    }
  };
  
  
  // Columns configuration for DataTable
  const columns = [
    { field: "employeeId", headerName: "Emp ID", flex: 0.5, cellClassName: "text-center" },
    { field: "employeeName", headerName: "Emp Name", flex: 0.5, cellClassName: "text-center" },
    { field: "basicSalary", headerName: "Basic Salary", flex: 0.5, cellClassName: "text-center" },
    { field: "houseAllowance", headerName: "House Allowance", flex: 0.5, cellClassName: "text-center" },
    { field: "transportation", headerName: "Transportation", flex: 0.5, cellClassName: "text-center" },
    { field: "otTime", headerName: "Total OT Hours", flex: 0.5, cellClassName: "text-center" },
    { field: "lateMinutes", headerName: "Late Minutes", flex: 0.5, cellClassName: "text-center" },
    { field: "unpaidLeave", headerName: "Unpaid Leaves", flex: 0.5, cellClassName: "text-center" },
     // Editable Bonus Column
  
     {
      field: "bonus",
      headerName: "Bonus",
      flex: 0.5,
      render: (row) => (
        <input
          type="number"
          value={row.bonus ?? ""}
          onChange={(e) => {
            const value = e.target.value ? Number(e.target.value) : 0;
            setEmployees((prevEmployees) =>
              prevEmployees.map((emp) =>
                emp.employeeId === row.employeeId ? { ...emp, bonus: value } : emp
              )
            );
          }}
          className="form-control text-center"
          style={{ width: "100px" }}
        />
      ),
    },
  
    // Editable Manual Adjustment Column
    {
      field: "manualAdjustment",
      headerName: "Manual Adjustment",
      flex: 0.5,
      render: (row) => (
        <input
          type="number"
          value={row.manualAdjustment ?? ""}
          onChange={(e) => {
            const value = e.target.value ? Number(e.target.value) : 0;
            setEmployees((prevEmployees) =>
              prevEmployees.map((emp) =>
                emp.employeeId === row.employeeId
                  ? { ...emp, manualAdjustment: value }
                  : emp
              )
            );
          }}
          className="form-control text-center"
          style={{ width: "100px" }}
        />
      ),
    },
  ];

  return (
    <div className="container mt-5 vh-100">
      <h2 className="text-center mb-4">Employee Salary Calculation</h2>

      <Form layout="vertical">
        <Row gutter={24}>
          {/* Working Days Input */}
          <Col span={8}>
            <Form.Item label="Working Days">
              <input
                type="number"
                value={workingDays}
                onChange={(e) => setWorkingDays(e.target.value)}
                className="form-control"
                min="1"
                max="31"
              />
            </Form.Item>
          </Col>

          {/* Month & Year Picker */}
          <Col span={8}>
            <Form.Item label="Select Month & Year">
              <DatePicker
                picker="month"
                value={selectedDate}
                onChange={handleDateChange}
                className="form-control"
                format="MMMM YYYY"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
  <Col span={12} className="text-center">
    {!isCalculated ? (
      <Button className="btn btn-primary" onClick={calculateSalary}>
        Calculate Salary
      </Button>
    ) : (
      <Button className="btn btn-success" onClick={confirmSalary}>
        Confirm Salary
      </Button>
    )}
  </Col>
</Row>

      </Form>

      {loading ? (
  <p className="text-center">Loading data...</p>
) : (
  <>
    {!isCalculated ? ( // Show initial table if not calculated
      <DataTable
        fetchData={() => employees}
        columns={columns}
        keyField="employeeId"
        responsive
        fixedHeader
        fixedHeaderScrollHeight="400px"
        noDataComponent="No employees found"
        highlightOnHover
        pagination
      />
    ) : ( // Show calculated salary table after clicking "Calculate"
      <DataTable
        fetchData={() => employees}
        columns={[
          { field: "employeeId", headerName: "Emp ID", flex: 0.5 },
          { field: "employeeName", headerName: "Emp Name", flex: 1 },
          { field: "basicSalary", headerName: "Basic Salary", flex: 1 },
          { field: "houseAllowance", headerName: "House Allowance", flex: 1, cellClassName: "text-center" },
          { field: "transportation", headerName: "Transportation", flex: 1, cellClassName: "text-center" },
          { field: "totalOtFee", headerName: "Total OT Fee", flex: 1 },
          { field: "totalLeaveOverFee", headerName: "Leave Deduction", flex: 1 },
          { field: "bonus", headerName: "Bonus", flex: 1 },
          { field: "manualAdjustment", headerName: "Manual Adjustment", flex: 1 },
          { field: "finalSalary", headerName: "Final Salary", flex: 1 },
        ]}
        keyField="employeeId"
        responsive
        fixedHeader
        fixedHeaderScrollHeight="400px"
        highlightOnHover
        pagination
      />
    )}
  </>
)}

    </div>
  );
};

export default EmployeeSalaryCalculation;