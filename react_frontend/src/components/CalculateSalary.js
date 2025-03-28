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
    
      setLoading(true);
      const selectedMonth = selectedDate.month() + 1; // Month is zero-based, so add 1
      const selectedYear = selectedDate.year();
      const selectedSalaryMonth = `${selectedYear}-${selectedMonth.toString().padStart(2, "0")}`;
    
      console.log(`Fetching salary for: ${selectedSalaryMonth}`);
    
      try {
        const historyResponse = await axios.get(`${API_BASE_URL}/salary-history`, {
          params: { year: selectedYear, month: selectedMonth },
          headers: { Authorization: `Bearer ${token}` },
        });
    
        const confirmedSalaries = historyResponse.data.filter(
          (emp) => emp.salaryMonth === selectedSalaryMonth
        );
    
        if (confirmedSalaries.length > 0) {
          console.log("Confirmed salary data found:", confirmedSalaries);
    
          setEmployees(
            confirmedSalaries.map((emp) => ({
              ...emp,
              finalSalary: emp.finalSalary ?? "0.00", // Ensure finalSalary is set
            }))
          );
    
          console.log("Final Salary in State:", confirmedSalaries.map(emp => emp.finalSalary));
          
          setConfirmed(true);
        } else {
          console.log("No confirmed salary data, fetching unconfirmed data.");
          setConfirmed(false);
          await fetchUnconfirmedSalaryData(selectedYear, selectedMonth);
        }
      } catch (error) {
        console.error("Error fetching salary data:", error);
      } finally {
        setLoading(false);
      }
    };
    
      
    console.log("Fetching salary data for:", selectedDate?.format("YYYY-MM"));
    fetchSalaryData();
  }, [selectedDate, token]); // Make sure `selectedDate` is in the dependency array
  

  const fetchUnconfirmedSalaryData = async (year, month) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/salary/data`, {
        params: { year, month },
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("Unconfirmed salary data:", response.data);
      const selectedSalaryMonth = `${year}-${month.toString().padStart(2, "0")}`; // Format as YYYY-MM

      setEmployees(
        response.data.map((emp) => {
          // Ensure values are numbers (or 0 if missing)
          const basicSalary = Number(emp.basicSalary) || 0;
          const otTime = Number(emp.otTime) || 0;
          const unpaidLeave = Number(emp.unpaidLeave) || 0;
          const lateMinutes = Number(emp.lateMinutes) || 0;
          const bonus = Number(emp.bonus) || 0;
          const manualAdjustment = Number(emp.manualAdjustment) || 0;
          const salaryMonth = selectedSalaryMonth;
  
          // Avoid division by zero
          const validWorkingDays = workingDays > 0 ? workingDays : 1;
  
          // Calculate OT Fee
          const totalOtFee = (basicSalary * (otTime / 60)) / (validWorkingDays * 8);
  
          // Calculate Leave Over Fee
          const totalLeaveOverFee = (basicSalary * unpaidLeave) / validWorkingDays;
  
          // Calculate Late Deduction Fee (Ensure it's a number)
          const lateDeductionFee = Number(calculateLateDeductionFee({ ...emp, basicSalary })) || 0;
  
          return {
            ...emp,
            bonus,
            manualAdjustment,
            salaryMonth,
            otFee: totalOtFee.toFixed(2),
            leaveOverFee: totalLeaveOverFee.toFixed(2),
            lateOverFee: lateDeductionFee.toFixed(2),  // ✅ Fixed
          };
        })
      );
    } catch (error) {
      console.error("Error fetching unconfirmed salary data:", error);
    }
  };

  // Function to calculate total salary dynamically
  const calculateTotalSalary = (emp) => {
    if (workingDays === 0) return  "0.00"; // Prevent division by zero
    
    // Convert OT time from minutes to hours
    const otTimeInHours = emp.otTime / 60;
    
    // Calculate OT Fee (based on monthly salary and monthly working hours)
    const totalOtFee = (emp.basicSalary * 12 * 2 * otTimeInHours) / (52 * 44);

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


  //Confirm salary and save
  const confirmSalary = async () => {
    try {
      const salaryMonth = selectedDate.format("YYYY-MM"); // Format salary month as "YYYY-MM"
  
      if (!workingDays || workingDays <= 0) {
        alert("Please enter a valid number of working days.");
        return;
      }
  
      const salaryData = employees.map((emp) => {
        const weeklySalary = (emp.basicSalary * 12) / 52;
        const hourlyRate = weeklySalary / 40; // Assuming 40 hours of work per week
  
        // Convert OT time from minutes to hours and calculate OT Fee
        const otHours = emp.otTime / 60; // Convert OT time (in minutes) to hours
        const totalOtFee = hourlyRate * 2 * otHours; // OT Fee calculation
  
        // Ensure working days are valid to prevent division by zero
        const validWorkingDays = workingDays > 0 ? workingDays : 1;
  
        // Leave Over Fee calculation based on user input for working days
        const totalLeaveOverFee = (emp.basicSalary * emp.unpaidLeave) / validWorkingDays;
  
        // Late Deduction Fee calculation
        const lateDeductionFee = calculateLateDeductionFee(emp);
  
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
        otTime: emp.otTime,
        lateMinutes: emp.lateMinutes,
        unpaidLeave: emp.unpaidLeave,
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
  const basicSalary = Number(emp.basicSalary) || 0;
  const lateMinutes = Number(emp.lateMinutes) || 0;
  const validWorkingDays = workingDays > 0 ? workingDays : 1;

  // Calculate hourly rate
  const hourlyRate = basicSalary / (validWorkingDays * 8);

  // Calculate late hours (as a fraction of the hour based on late minutes)
  const lateHours = lateMinutes / 60;  // Convert minutes to fraction of hours
  
  // Late fee
  const lateFee = hourlyRate * lateHours;
  
  return isNaN(lateFee) ? 0 : lateFee;  // If invalid, return 0
};


   // Function to download the confirmed salary details as an Excel file
   const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      employees.map((emp) => {
        const finalSalary = calculateTotalSalary(emp); // Calculate the final salary
  
        return {
          "Employee ID": emp.employeeId,
          "Employee Name": emp.employeeName,
          "Basic Salary": emp.basicSalary,
          "House Allowance": emp.houseAllowance,
          "Transportation": emp.transportation,
          "OT Fee": Number(emp.otFee).toFixed(2),
          "Late Over Fee": Number(emp.lateOverFee).toFixed(2),
          "Unpaid Leaves": Number(emp.leaveOverFee).toFixed(2),
          "Bonus": emp.bonus,
          "Manual Adjustment": emp.manualAdjustment,
          "Final Salary": finalSalary, // Set the calculated final salary
        };
      })
    );
  
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Salary Details");
  
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  
    saveAs(data, `Employee_Salary_${selectedDate.format("MMMM_YYYY")}.xlsx`);
  };
  

  const columns = [
    { field: "salaryMonth", headerName: "Salary Month", flex: 1 },
    { field: "employeeId", headerName: "Emp ID", flex: 0.5 },
    { field: "employeeName", headerName: "Emp Name", flex: 1 },
    { field: "basicSalary", headerName: "Basic Salary", flex: 1 },
    { field: "houseAllowance", headerName: "House Allowance", flex: 1 },
    { field: "transportation", headerName: "Transportation", flex: 1 },
    // Show OT Fee
  // Ensure values are never null
  { 
    field: "otTime", 
    headerName: "OT Hour", 
    flex: 1,
    valueGetter: (params) => (params.value ? (params.value / 60).toFixed(2) : "0.00") 
  },
  { field: "lateMinutes", headerName: "Late Minutes", flex: 1},
  { field: "unpaidLeave", headerName: "Leave days", flex: 1 },
  
  { field: "otFee", headerName: "OT Fee", flex: 1, render: (row) => <span>{row.otFee ?? "0.00"}</span> },
  { field: "lateOverFee", headerName: "Late Over Fee", flex: 1, render: (row) => <span>{row.lateOverFee ?? "0.00"}</span> },
  { field: "leaveOverFee", headerName: "Leave Over Fee", flex: 1, render: (row) => <span>{row.leaveOverFee ?? "0.00"}</span> },
{
    field: "bonus",
    headerName: "Bonus",
    flex: 1,
    render: (row) => (
      <input
        type="number"
        value={row.bonus ?? ""}
        min="0" // 🔹 Prevents negative values in UI
        onChange={(e) => {
          let value = Number(e.target.value);
          if (value < 0) {
            alert("Bonus cannot be negative!"); // 🔹 Show alert for invalid input
            return;
          }
          !confirmed && handleInputChange(row.employeeId, "bonus", value);
        }}
        className="form-control text-center"
        disabled={confirmed} // Disable if data is confirmed
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
          onChange={(e) =>
            !confirmed && handleInputChange(row.employeeId, "manualAdjustment", Number(e.target.value))
          }
          className="form-control text-center"
          disabled={confirmed} // Disable if data is confirmed
        />
      ),
    },
    
    {
      field: "finalSalary",
      headerName: "Total Salary",
      flex: 1,
      render: (row) => (
        <span>{row.finalSalary || calculateTotalSalary(row)}</span>
      ),
    }
    
    
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
  onChange={(date) => {
    if (date) {
      setSelectedDate(dayjs(date));
    }
  }}
  
  className="form-control"
  format="MMMM YYYY"
/>

            </Form.Item>
          </Col>
        </Row>

        <Row>
        {/* Show "Confirm Salary" button only if not confirmed */}
        {!confirmed && (
          <Col span={12} className="text-center">
            <Button type="primary" onClick={confirmSalary}>
              Confirm Salary
            </Button>
          </Col>
        )}

        {/* Show "Download Excel" button only if confirmed */}
        {confirmed && (
          <Col span={12} className="text-start">
            <Button className="btn btn-success" onClick={downloadExcel}>
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
   
  </Col>
  </Row>
  </Form>
    </div>
  );
};

export default EmployeeSalaryCalculation;
