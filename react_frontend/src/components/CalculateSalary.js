import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Row, Col, DatePicker } from "antd";
import dayjs from "dayjs";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import DataTable from "./common/DataTable";
import { Card } from "antd";


const API_BASE_URL = "http://localhost:8081";

const EmployeeSalaryCalculation = () => {
  const [workingDays, setWorkingDays] = useState(0);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
 
   // This function handles the changes in the Reason input field for a specific employee
   const handleReasonChange = (employeeId, e) => {
    const updatedEmployees = employees.map((emp) => {
      if (emp.employeeId === employeeId) {
        return { ...emp, reason: e.target.value };  // Update reason only for the specific employee
      }
      return emp;
    });
    setEmployees(updatedEmployees);  // Update the employees array with the new reason
  };
  

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSalaryData = async () => {
      if (!selectedDate) return;

      setLoading(true);
      const selectedMonth = selectedDate.month() + 1;
      const selectedYear = selectedDate.year();
      const selectedSalaryMonth = `${selectedYear}-${selectedMonth.toString().padStart(2, "0")}`;

      try {
        const historyResponse = await axios.get(`${API_BASE_URL}/salary-history`, {
          params: { year: selectedYear, month: selectedMonth },
          headers: { Authorization: `Bearer ${token}` },
        });

        const confirmedSalaries = historyResponse.data.filter(
          (emp) => emp.salaryMonth === selectedSalaryMonth
        );

        if (confirmedSalaries.length > 0) {
          setEmployees(
            confirmedSalaries.map((emp) => ({
              ...emp,
              basicSalary: Number(emp.basicSalary) || 0,
              houseAllowance: Number(emp.houseAllowance) || 0,
              transportation: Number(emp.transportation) || 0,
              otTime: Number(emp.otTime) || 0,
              lateMinutes: Number(emp.lateMinutes) || 0,
              unpaidLeave: Number(emp.unpaidLeave) || 0,
              otFee: Number(emp.otFee) || 0,
              leaveOverFee: Number(emp.leaveOverFee) || 0,
              lateOverFee: Number(emp.lateOverFee) || 0,
              bonus: Number(emp.bonus) || 0,
              manualAdjustment: Number(emp.manualAdjustment) || 0,
              finalSalary: Number(emp.finalSalary).toFixed(2) || "0.00",
              salaryMonth: emp.salaryMonth || selectedSalaryMonth,
            }))
          );
          setWorkingDays(workingDays || 0);

          setConfirmed(true);
        } else {
          setConfirmed(false);
          await fetchUnconfirmedSalaryData(selectedYear, selectedMonth);
        }
      } catch (error) {
        console.error("Error fetching salary data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalaryData();
  }, [selectedDate, token, workingDays]);

  const fetchUnconfirmedSalaryData = async (year, month) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/salary/data`, {
        params: { year, month },
        headers: { Authorization: `Bearer ${token}` },
      });

      const selectedSalaryMonth = `${year}-${month.toString().padStart(2, "0")}`;

      setEmployees(
        response.data.map((emp) => {
          const basicSalary = Number(emp.basicSalary) || 0;
          const otTime = Number(emp.otTime) || 0;
          const unpaidLeave = Number(emp.unpaidLeave) || 0;
          const lateMinutes = Number(emp.lateMinutes) || 0;
          const bonus = Number(emp.bonus) || 0;
          const manualAdjustment = Number(emp.manualAdjustment) || 0;
          const salaryMonth = selectedSalaryMonth;
          const validWorkingDays = workingDays > 0 ? workingDays : 1;
          const otHours = otTime / 60;
          const totalOtFee = (basicSalary * 12 * 2 * otHours) / (52 * 44);
          const totalLeaveOverFee = (basicSalary * unpaidLeave) / validWorkingDays;
          const lateDeductionFee = calculateLateDeductionFee({ ...emp, basicSalary });

          return {
            ...emp,
            basicSalary,
            otTime,
            unpaidLeave,
            lateMinutes,
            bonus,
            manualAdjustment,
            salaryMonth,
            otFee: totalOtFee.toFixed(2),
            leaveOverFee: totalLeaveOverFee.toFixed(2),
            lateOverFee: lateDeductionFee.toFixed(2),
            finalSalary: calculateTotalSalary({
              ...emp,
              basicSalary,
              otTime,
              unpaidLeave,
              lateMinutes,
              bonus,
              manualAdjustment,
            }),
          };
        })
      );
    } catch (error) {
      console.error("Error fetching unconfirmed salary data:", error);
    }
  };

  const calculateLateDeductionFee = (emp) => {
    const basicSalary = Number(emp.basicSalary) || 0;
    const lateMinutes = Number(emp.lateMinutes) || 0;
    const validWorkingDays = workingDays > 0 ? workingDays : 1;
    const hourlyRate = basicSalary / (validWorkingDays * 8);
  
    let lateHours = 0;
    if (lateMinutes > 0 && lateMinutes <= 30) {
      lateHours = 0.5;
    } else if (lateMinutes > 30 && lateMinutes <= 60) {
      lateHours = 1;
    } else if (lateMinutes > 60) {
      lateHours = 2;
    }
  
    const lateFee = hourlyRate * lateHours;
    return isNaN(lateFee) ? 0 : lateFee;
  };
  
  const calculateTotalSalary = (emp) => {
    const validWorkingDays = workingDays > 0 ? workingDays : 1;
    const otTimeInHours = emp.otTime / 60;
    const totalOtFee = (emp.basicSalary * 12 * 2 * otTimeInHours) / (52 * 44);
    const totalLeaveOverFee = (emp.basicSalary * emp.unpaidLeave) / validWorkingDays;

    const lateDeductionFee = calculateLateDeductionFee(emp);
    const totalSalary =
      emp.basicSalary +
      emp.houseAllowance +
      emp.transportation +
      Number(emp.bonus || 0) +
      Number(emp.manualAdjustment || 0) +
      totalOtFee -
      totalLeaveOverFee -
      lateDeductionFee;

    return totalSalary.toFixed(2);
  };

  const handleInputChange = (employeeId, field, value) => {
    setEmployees((prev) =>
      prev.map((emp) =>
        emp.employeeId === employeeId
          ? {
              ...emp,
              [field]: value || 0,
              finalSalary: calculateTotalSalary({ ...emp, [field]: value || 0 }),
            }
          : emp
      )
    );
  };

  const confirmSalary = async () => {
    try {
       const salaryMonth = selectedDate.format("YYYY-MM");
 
       if (!workingDays || workingDays <= 0) {
         alert("Please enter a valid number of working days.");
         return;
       }
 
       const salaryData = employees.map((emp) => {
        
         const otHours = emp.otTime / 60;
         const totalOtFee = (emp.basicSalary * 12 * 2 * otHours) / (52 * 44);
         const validWorkingDays = workingDays > 0 ? workingDays : 1;
         const totalLeaveOverFee = (emp.basicSalary * emp.unpaidLeave) / validWorkingDays;
         const lateDeductionFee = calculateLateDeductionFee(emp);
 
         const finalSalary = (
           emp.basicSalary +
           emp.houseAllowance +
           emp.transportation +
           Number(emp.bonus || 0) +
           Number(emp.manualAdjustment || 0) +
           totalOtFee -
           totalLeaveOverFee -
           lateDeductionFee
         ).toFixed(2);
 
         return {
           ...emp,
           otFee: totalOtFee.toFixed(2),
           leaveOverFee: totalLeaveOverFee.toFixed(2),
           lateOverFee: lateDeductionFee.toFixed(2),
           finalSalary,
           salaryMonth,
           workingDays,
           reason: emp.reason || "", // Ensure reason is included for each employee
         };
       });
 
       // POST the salary data
       const response = await axios.post(`${API_BASE_URL}/salary-history/save`, salaryData, {
         headers: { Authorization: `Bearer ${token}` },
       });
       console.log("API response:", response);  // Add this for debugging

       alert("Salary confirmed successfully!");
       setConfirmed(true);  // Correctly update the state
 
    } catch (error) {
       console.error("Error confirming salaries:", error);
       alert("Failed to confirm salaries. Please try again.");
    }
 };
 

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      employees.map((emp) => {
        const finalSalary = calculateTotalSalary(emp);
        return {
          "Employee ID": emp.employeeId,
          "Employee Name": emp.employeeName,
          "Basic Salary": emp.basicSalary,
          "House Allowance": emp.houseAllowance,
          "Transportation": emp.transportation,
          "OT Fee": Number(emp.otFee).toFixed(2),
          "Late Over Fee": Number(emp.lateOverFee).toFixed(2),
          "Leave Over Fee": Number(emp.leaveOverFee).toFixed(2),
          "Bonus": emp.bonus,
          "Manual Adjustment": emp.manualAdjustment,
          "Manual Adjustment Reason": emp.reason || "", // Ensure reason is included for each employee       
          "Final Salary": finalSalary,
         };
      })
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Salary Details");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(data, `Employee_Salary_${selectedDate.format("MMMM_YYYY")}.xlsx`);
  };

  const columns = [
    { field: "salaryMonth", headerName: "Salary Month", flex: 1 },
    { field: "employeeId", headerName: "Emp ID", flex: 0.5 },
    { field: "employeeName", headerName: "Emp Name", flex: 1 },
    { field: "basicSalary", headerName: "Basic Salary", flex: 1 },
    { field: "houseAllowance", headerName: "House Allowance", flex: 1 },
    { field: "transportation", headerName: "Transportation", flex: 1 },
    {
      field: "otTime",
      headerName: "OT Duration(minutes)",
      flex: 1,
      valueGetter: (params) => (params.value ? (params.value / 60).toFixed(2) : "0.00"),
    },
    { field: "lateMinutes", headerName: "Late Minutes", flex: 1 },
    { field: "unpaidLeave", headerName: "Leave Days", flex: 1 },
    {
      field: "otFee",
      headerName: "OT Fee",
      flex: 1,
      render: (row) => <span>{Number(row.otFee).toFixed(2) || "0.00"}</span>,
    },
    {
      field: "lateOverFee",
      headerName: "Late Over Fee",
      flex: 1,
      render: (row) => <span>{Number(row.lateOverFee).toFixed(2) || "0.00"}</span>,
    },
    {
      field: "leaveOverFee",
      headerName: "Leave Over Fee",
      flex: 1,
      render: (row) => <span>{Number(row.leaveOverFee).toFixed(2) || "0.00"}</span>,
    },
    {
      field: "bonus",
      headerName: "Bonus",
      flex: 1.2,
      render: (row) => (
        <input
          type="number"
          value={row.bonus ?? ""}
          min="0"
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value < 0) {
              alert("Bonus cannot be negative!");
              return;
            }
            !confirmed && handleInputChange(row.employeeId, "bonus", value);
          }}
          className="form-control text-center"
          style={{ minWidth: "120px" }} // You can adjust the width as needed
          disabled={confirmed}
        />
      ),
    },
    {
      field: "manualAdjustment",
      headerName: "Manual Adjustment",
      flex: 2,
      render: (row) => (
        <div>
          <input
            type="number"
            value={row.manualAdjustment ?? ""}
            onChange={(e) =>
              !confirmed &&
              handleInputChange(row.employeeId, "manualAdjustment", Number(e.target.value))
            }
            className="form-control text-center"
            disabled={confirmed}
          />
          {!confirmed && (
            <textarea
              value={row.reason || ""}  // Bind the reason field to each employee's individual reason
              onChange={(e) => handleReasonChange(row.employeeId, e)}  // Update reason for the specific employee
              placeholder="Enter reason for adjustment"
              className="form-control mt-2"
              rows="2"
            />
          )}
        </div>
      ),
    },
    
    
    {
      field: "finalSalary",
      headerName: "Total Salary",
      flex: 1,
      render: (row) => (
        <span>{row.finalSalary || calculateTotalSalary(row)}</span>
      ),
    },
  ];

  return (
    <div className="salary-container" style={{ maxWidth: "1200px", margin: "auto", padding: "30px 20px" }}>
    <h2 className="text-center mb-4" style={{ fontWeight: "600", color: "#1890ff" }}>
      🧾 Employee Salary Calculation
    </h2>
  
    <Card bordered={false} style={{ marginBottom: "30px", background: "#fff" }}>
      <Form layout="vertical">
        <Row gutter={24}>
          <Col xs={24} md={8}>
            <Form.Item label={<strong>Working Days</strong>}>
              <input
                type="number"
                value={workingDays}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (value < 15) value = 15;
                  if (value > 23) value = 23;
                  setWorkingDays(value);
                }}
                className="form-control"
                min="15"
                max="23"
                disabled={confirmed}
                style={{ height: "40px", textAlign: "center" }}
              />
            </Form.Item>
          </Col>
  
          <Col xs={24} md={8}>
            <Form.Item label={<strong>Select Month & Year</strong>}>
              <DatePicker
                picker="month"
                value={selectedDate}
                onChange={(date) => date && setSelectedDate(dayjs(date))}
                className="form-control"
                format="MMMM YYYY"
                style={{ width: "100%", height: "40px" }}
              />
            </Form.Item>
          </Col>
      </Row>
      </Form>
    </Card>
    
    <Col xs={24} sm={12} md={6}>
  {!confirmed ? (
    <Button
      type="primary"
      onClick={confirmSalary}
      block
      size="large"
      style={{
        fontWeight: 600,
        borderRadius: "50px",
        transition: "all 0.3s ease-in-out",
        background: "linear-gradient(145deg, #6a11cb, #2575fc)",
        color: "white",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        border: "none",
      }}
    >
      Confirm Salary
    </Button>
  ) : (
    <>
      <Button
        type="primary"
        onClick={downloadExcel}
        block
        size="large"
        style={{
          background: "linear-gradient(145deg, #28a745, #3cb371)",
          borderRadius: "50px",
          fontWeight: 600,
          transition: "all 0.3s ease-in-out",
          color: "white",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          border: "none",
        }}
      >
        Download Excel
      </Button>

      
    </>
  )}
</Col>

  {loading ? (
      <p className="text-center">🔄 Loading salary data...</p>
    ) : (
      <Card style={{ borderRadius: "12px", padding: "10px" }}>
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
      </Card>
    )}
  </div>
  );
};

export default EmployeeSalaryCalculation;
