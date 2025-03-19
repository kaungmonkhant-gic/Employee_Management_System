import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const SalaryManagement = () => {
    // Default salary data
    const [salaries, setSalaries] = useState([
        { id: 1, employee: "John Doe", baseSalary: 5000, overtimeAmount: 200, bonus: 100, deductions: 50, totalSalary: 5250, status: "UNPAID" },
        { id: 2, employee: "Jane Smith", baseSalary: 6000, overtimeAmount: 300, bonus: 150, deductions: 100, totalSalary: 6350, status: "PAID" },
        { id: 3, employee: "Mike Johnson", baseSalary: 4500, overtimeAmount: 250, bonus: 200, deductions: 75, totalSalary: 4875, status: "UNPAID" },
    ]);

    // Handle salary payment
    const handlePaySalary = (id) => {
        setSalaries((prevSalaries) =>
            prevSalaries.map((salary) =>
                salary.id === id ? { ...salary, status: "PAID" } : salary
            )
        );
    };

    // Export PDF Report
    const exportPDF = () => {
        const doc = new jsPDF();
        doc.text("Salary Report", 14, 15);

        const tableData = salaries.map(salary => [
            salary.employee, salary.baseSalary, salary.overtimeAmount, 
            salary.bonus, salary.deductions, salary.totalSalary, salary.status
        ]);

        doc.autoTable({
            startY: 20,
            head: [["Employee", "Base Salary", "Overtime", "Bonus", "Deductions", "Total Salary", "Status"]],
            body: tableData
        });

        doc.save("Salary_Report.pdf");
    };

    // Export Excel Report
    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(salaries);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Salaries");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        saveAs(data, "Salary_Report.xlsx");
    };

    return (
        <div className="container">
            <h2>Salary Management</h2>
            <div>
                <button className="btn btn-primary m-2" onClick={exportPDF}>Export to PDF</button>
                <button className="btn btn-success m-2" onClick={exportExcel}>Export to Excel</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Employee</th>
                        <th>Base Salary</th>
                        <th>Overtime</th>
                        <th>Bonus</th>
                        <th>Deductions</th>
                        <th>Total Salary</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {salaries.map((salary) => (
                        <tr key={salary.id}>
                            <td>{salary.employee}</td>
                            <td>${salary.baseSalary}</td>
                            <td>${salary.overtimeAmount}</td>
                            <td>${salary.bonus}</td>
                            <td>${salary.deductions}</td>
                            <td>${salary.totalSalary}</td>
                            <td>{salary.status}</td>
                            <td>
                                {salary.status === "UNPAID" && (
                                    <button className="btn btn-success" onClick={() => handlePaySalary(salary.id)}>
                                        Pay
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalaryManagement;
