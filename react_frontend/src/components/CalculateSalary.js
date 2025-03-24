import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Row, Col } from "antd";
import DataTable from "./common/DataTable";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import axios from "axios";
import * as XLSX from "xlsx"; // Import for Excel generation
import { saveAs } from "file-saver"; // For file download

const API_BASE_URL = "http://localhost:8081";

const EmployeeSalaryCalculation = () => {
  const [workingDays, setWorkingDays] = useState(0);
  const [selectedDate, setSelectedDate] = useState(dayjs()); 
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false); // New state to track confirmation
  const token = localStorage.getItem("token"); 

  useEffect(() => {
    const fetchSalaryData = async () => {
      if (!selectedDate) return;

      try {
        setLoading(true);
        const selectedMonth = selectedDate.month() + 1;
        const selectedYear = selectedDate.year();

        const response = await axios.get(`${API_BASE_URL}/salary/data`, {
          params: { year: selectedYear, month: selectedMonth },
          headers: { Authorization: `Bearer ${token}` },
        });

        const updatedEmployees = response.data.map((emp) => ({
          ...emp,
          bonus: emp.bonus || 0,
          manualAdjustment: emp.manualAdjustment || 0,
        }));

        setEmployees(updatedEmployees);
      } catch (error) {
        console.error("Error fetching salary data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalaryData();
  }, [selectedDate, token]);

  // Function to calculate total salary dynamically
  const calculateTotalSalary = (emp) => {
    if (workingDays === 0) return  "0.00"; // Prevent division by zero
    
    // Convert OT time from minutes to hours
    const otTimeInHours = emp.otTime / 60;
    
    // Calculate OT Fee (based on monthly salary and monthly working hours)
    const totalOtFee = (emp.basicSalary * otTimeInHours) / (workingDays * 8); // assuming 8 working hours per day
    
    // Calculate Leave Deduction (based on unpaid leave days)
    const totalLeaveOverFee = (emp.basicSalary * emp.unpaidLeave) / workingDays;
    
    // Determine late deduction based on late minutes
    let lateHours = 0;
    if (emp.lateMinutes > 0 && emp.lateMinutes <= 30) {
      lateHours = 0.5; // Deduct 30 minutes salary
    } else if (emp.lateMinutes > 30 && emp.lateMinutes <= 60) {
      lateHours = 1; // Deduct 1 hour salary
    } else if (emp.lateMinutes > 60) {
      lateHours = 2; // Deduct 2 hours salary
    }
  
    // Calculate Late Deduction Fee
    const lateDeductionFee = (emp.basicSalary / (workingDays * 8)) * lateHours; // assuming 8 hours a day
    
    // Final Salary Calculation
    return (
      emp.basicSalary +
      emp.houseAllowance +
      emp.transportation +
      Number(emp.bonus) +
      Number(emp.manualAdjustment) +
      totalOtFee -
      totalLeaveOverFee -
      lateDeductionFee
    ).toFixed(2);
  };
  
  // Handle bonus and manual adjustment updates
  const handleInputChange = (employeeId, field, value) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.employeeId === employeeId ? { ...emp, [field]: value || 0 } : emp
      )
    );
  };

  // Confirm salary and save to database
  // const confirmSalary = async () => {
  //   try {
  //     await axios.post(
  //       `${API_BASE_URL}/salary-history/save`,
  //       employees.map((emp) => ({
  //         ...emp,
  //         finalSalary: calculateTotalSalary(emp),
  //       })),
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     // await axios.delete(`${API_BASE_URL}/clear-temp`, {
  //     //   headers: { Authorization: `Bearer ${token}` },
  //     // });

  //     alert("Salary confirmed successfully!");
  //     setEmployees([]);
  //   } catch (error) {
  //     console.error("Error confirming salaries:", error);
  //     alert("Failed to confirm salaries. Please try again.");
  //   }
  // };
  
  // Confirm salary and save to the backend
const confirmSalary = async () => {
  try {
    const salaryMonth = selectedDate.format("YYYY-MM");  // Format salary month as "YYYY-MM"
    
    // Prepare the employee data to be sent to the backend
    const salaryData = employees.map((emp) => {
      const totalOtFee = (emp.basicSalary * (emp.otTime / 60)) / (workingDays * 8); // OT Fee calculation
      const totalLeaveOverFee = (emp.basicSalary * emp.unpaidLeave) / workingDays; // Leave Over Fee calculation
      const lateDeductionFee = calculateLateDeductionFee(emp); // Late Deduction Fee calculation

      // Calculate final salary
      const finalSalary = (
        emp.basicSalary +
        emp.houseAllowance +
        emp.transportation +
        Number(emp.bonus) +
        Number(emp.manualAdjustment) +
        totalOtFee -
        totalLeaveOverFee -
        lateDeductionFee
      ).toFixed(2);

      return {
        employeeId: emp.employeeId,
        employeeName: emp.employeeName,
        basicSalary: emp.basicSalary,
        houseAllowance: emp.houseAllowance,
        transportation: emp.transportation,
        otFee: totalOtFee.toFixed(2), // OT Fee
        leaveOverFee: totalLeaveOverFee.toFixed(2), // Leave Over Fee
        lateOverFee: lateDeductionFee.toFixed(2), // Late Deduction Fee
        bonus: emp.bonus,
        manualAdjustment: emp.manualAdjustment,
        finalSalary, // Final Salary
        salaryMonth, // Salary month in "YYYY-MM" format
      };
    });

    // Send the data to the backend
    await axios.post(
      `${API_BASE_URL}/salary-history/save`,
      salaryData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("Salary confirmed successfully!");
    setEmployees([]); // Clear the employee data after confirmation
    setConfirmed(true); // Set the confirmation state
  } catch (error) {
    console.error("Error confirming salaries:", error);
    alert("Failed to confirm salaries. Please try again.");
  }
};

// Function to calculate the late deduction fee
const calculateLateDeductionFee = (emp) => {
  let lateHours = 0;
  if (emp.lateMinutes > 0 && emp.lateMinutes <= 30) {
    lateHours = 0.5; // Deduct 30 minutes salary
  } else if (emp.lateMinutes > 30 && emp.lateMinutes <= 60) {
    lateHours = 1; // Deduct 1 hour salary
  } else if (emp.lateMinutes > 60) {
    lateHours = 2; // Deduct 2 hours salary
  }
  
  // Calculate Late Deduction Fee
  return (emp.basicSalary / (workingDays * 8)) * lateHours; // assuming 8 hours a day
};

   // Function to download the confirmed salary details as an Excel file
   const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      employees.map((emp) => ({
        "Employee ID": emp.employeeId,
        "Employee Name": emp.employeeName,
        "Basic Salary": emp.basicSalary,
        "House Allowance": emp.houseAllowance,
        "Transportation": emp.transportation,
        "OT Time (minutes)": emp.otTime,
        "Late Minutes": emp.lateMinutes,
        "Unpaid Leaves": emp.unpaidLeave,
        "Bonus": emp.bonus,
        "Manual Adjustment": emp.manualAdjustment,
        "Final Salary": calculateTotalSalary(emp),
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Salary Details");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    saveAs(data, `Employee_Salary_${selectedDate.format("MMMM_YYYY")}.xlsx`);
  };


  const columns = [
    { field: "employeeId", headerName: "Emp ID", flex: 0.5 },
    { field: "employeeName", headerName: "Emp Name", flex: 1 },
    { field: "basicSalary", headerName: "Basic Salary", flex: 1 },
    { field: "houseAllowance", headerName: "House Allowance", flex: 1 },
    { field: "transportation", headerName: "Transportation", flex: 1 },
    { field: "otTime", headerName: "Total OT Hours", flex: 1, 
      render: (row) => <span>{(row.otTime / 60).toFixed(2)} hours</span> }, // Convert OT time to hours
    { field: "lateMinutes", headerName: "Late Minutes", flex: 1 },
    { field: "unpaidLeave", headerName: "Unpaid Leaves", flex: 1 },
    {
      field: "bonus",
      headerName: "     Bonus    ",
      flex: 1, // Normal flex value
      minWidth: 400, // Minimum width of the column
      render: (row) => (
        <input
          type="number"
          value={row.bonus ?? ""}
          onChange={(e) => handleInputChange(row.employeeId, "bonus", Number(e.target.value))}
          className="form-control text-center"
        />
      ),
    },
    
    
    {
      field: "manualAdjustment",
      headerName: "Manual Adjustment",
      flex: 1,
      render: (row) => (
        <input
          type="number"
          value={row.manualAdjustment ?? ""}
          onChange={(e) => handleInputChange(row.employeeId, "manualAdjustment", Number(e.target.value))}
          className="form-control text-center"
        />
      ),
    },
    {
      field: "totalSalary",
      headerName: "Total Salary",
      flex: 1,
      render: (row) => <span>{calculateTotalSalary(row)}</span>,
    },
  ];

  return (
    <div className="container mt-5 vh-100">
      <h2 className="text-center mb-4">Employee Salary Calculation</h2>

      <Form layout="vertical">
        <Row gutter={24}>
          <Col span={8}>
          <Form.Item label="Working Days">
          <input
            type="number"
            value={workingDays}
            onChange={(e) => {
              let value = Number(e.target.value);
              if (value < 15) value = 15; // Set to 18 if below
              if (value > 23) value = 23; // Set to 23 if above
              setWorkingDays(value);
            }}
            className="form-control"
            min="18"
            max="23"
          />
        </Form.Item>

          </Col>

          <Col span={8}>
            <Form.Item label="Select Month & Year">
              <DatePicker
                picker="month"
                value={selectedDate}
                onChange={setSelectedDate}
                className="form-control"
                format="MMMM YYYY"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>

          {/* Enable Download Button Only After Confirmation */}
          {confirmed && (
            <Col span={12} className="text-center">
              <Button className="btn btn-primary" onClick={downloadExcel}>
                Download Excel
              </Button>
            </Col>
          )}
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
          highlightOnHover
          pagination
        />
      )}
<Form layout="vertical">
<Row gutter={24}>

        <Col span={12} style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
    <Button 
      type="primary" 
      size="large"
      onClick={confirmSalary}
      style={{ width: "100%", maxWidth: "250px", fontSize: "16px", fontWeight: "bold", padding: "10px" }}
    >
      Confirm Salary
    </Button>
  </Col>
  </Row>
  </Form>
    </div>
  );
};

export default EmployeeSalaryCalculation;
