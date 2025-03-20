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

    const salaryRequestData = employees.map((emp) => ({
      employeeId: emp.employeeId,
      year: selectedYear,
      month: selectedMonth,
    }));

    try {
      const updatedSalaries = await salaryController.calculateSalary(
        salaryRequestData,
        token // Pass token to salaryController
      );

      setEmployees(updatedSalaries);
    } catch (error) {
      console.error("Error calculating salaries:", error);
      alert("Failed to calculate salaries. Please try again.");
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
    renderCell: (params) => (
      <input
        type="number"
        value={params.row.bonus || 0}
        onChange={(e) =>
          setEmployees((prevEmployees) =>
            prevEmployees.map((emp) =>
              emp.employeeId === params.row.employeeId
                ? { ...emp, bonus: Number(e.target.value) || 0 }
                : emp
            )
          )
        }
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
    renderCell: (params) => (
      <input
        type="number"
        value={params.row.manualAdjustment || 0}
        onChange={(e) =>
          setEmployees((prevEmployees) =>
            prevEmployees.map((emp) =>
              emp.employeeId === params.row.employeeId
                ? { ...emp, manualAdjustment: Number(e.target.value) || 0 }
                : emp
            )
          )
        }
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
          <Col span={24} className="text-center">
            <Button className="btn btn-primary" onClick={calculateSalary}>
              Calculate Salary
            </Button>
          </Col>
        </Row>
      </Form>

      {loading ? (
        <p className="text-center">Loading data...</p>
      ) : (
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
      )}
    </div>
  );
};

export default EmployeeSalaryCalculation;
