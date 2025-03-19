import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Select, Form, Row, Col } from "antd";
import axios from "axios";
import DataTable from "./common/DataTable";
import salaryController from "../Controller/salaryController";
import { DatePicker } from "antd";
import dayjs from "dayjs";
const { Option } = Select;

const EmployeeSalaryCalculation = () => {
    const [workingDays, setWorkingDays] = useState(0);
    const [selectedDate, setSelectedDate] = useState(dayjs()); // Default to current month & year
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const handleDateChange = (date) => {
      if (date) {
        setSelectedDate(date);
      }
    };
   
    const handleAdjustmentChange = (employeeId, value) => {
        setEmployees((prevEmployees) =>
          prevEmployees.map((emp) =>
            emp.employeeId === employeeId ? { ...emp, manualAdjustment: value } : emp
          )
        );
      };

  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const salaryData = await salaryController.fetchSalaryData();
        setEmployees(salaryData);
      } catch (error) {
        console.error("Error fetching salary data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
  
    fetchSalaryData();
  }, []);
  

  const calculateSalary = async () => {
    if (workingDays <= 0 || !selectedDate) {
      alert("Please enter valid working days and select a month.");
      return;
    }
  
    const selectedMonth = selectedDate.format("MMMM"); // Get full month name
    const selectedYear = selectedDate.year(); // Get year
  
    // Prepare data to send to backend
    const salaryRequestData = employees.map((emp) => ({
      employeeId: emp.employeeId,
      year: selectedYear,
      month: selectedMonth,
      workingDays: workingDays,
    }));
  
    try {
      // Call controller function which calls the service
      const updatedSalaries = await salaryController.calculateSalary(salaryRequestData);
  
      // Update employees' salary data in state
      setEmployees(updatedSalaries);
    } catch (error) {
      console.error("Error calculating salaries:", error);
      alert("Failed to calculate salaries. Please try again.");
    }
  };
  


  const columns = [
    { field: "employeeId", headerName: "Emp ID", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "employeeName", headerName: "Emp Name", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "basicSalary", headerName: "Basic Salary", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "houseAllowance", headerName: "House Allowance", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "transportation", headerName: "Transportation", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "totalOTHours", headerName: "Total OT Hours", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "absent", headerName: "Absent ", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "lateMinutes", headerName: "Late Minutes", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "bonus", headerName: "Bonus", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    {
      field: "manualAdjustment",
      headerName: "Manual Adjustment",
      minWidth: 100,
      flex: 0.5,
      renderCell: (params) => (
        <input
          type="number"
          value={params.row.manualAdjustment}
          onChange={(e) => handleAdjustmentChange(params.row.employeeId, e.target.value)}
          className="form-control"
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
          {/* Working Days */}
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
