import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import employeeController from "../../Controller/employeeController";
import DataTable from "../common/DataTable";

function Employee() {
  const [activeEmployees, setActiveEmployees] = useState([]);
  const [resignedEmployees, setResignedEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true); // Start loading
        const activeData = await employeeController.fetchActiveUsers();
        const resignedData = await employeeController.fetchResignedUsers();

        if (Array.isArray(activeData)) {
          const activeEmployeesWithNumbers = activeData.map((employee, index) => ({
            ...employee,
            number: index + 1,
          }));
          setActiveEmployees(activeEmployeesWithNumbers);
        }

        if (Array.isArray(resignedData)) {
          const resignedEmployeesWithNumbers = resignedData.map((employee, index) => ({
            ...employee,
            number: index + 1,
          }));
          setResignedEmployees(resignedEmployeesWithNumbers);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchEmployees();
  }, []);

  const columns = [
    { field: "number", headerName: "No.", minWidth: 50, flex: 0.5, cellClassName: "text-center" },
    { field: "name", headerName: "Name", minWidth: 150, flex: 1, cellClassName: "text-center" },
    { field: "email", headerName: "Email", minWidth: 200, flex: 1.5, cellClassName: "text-center" },
    { field: "positionName", headerName: "Position", minWidth: 150, flex: 1, cellClassName: "text-center" },
    { field: "id", headerName: "Emp ID", minWidth: 120, flex: 0.8, cellClassName: "text-center" },
    { field: "dob", headerName: "DOB", minWidth: 120, flex: 0.8, cellClassName: "text-center" },
    { field: "nrc", headerName: "NRC", minWidth: 150, flex: 1, cellClassName: "text-center" },
    { field: "gender", headerName: "Gender", minWidth: 100, flex: 0.7, cellClassName: "text-center" },
    { field: "maritalStatus", headerName: "Marital Status", minWidth: 130, flex: 1, cellClassName: "text-center" },
    { field: "phone", headerName: "Phone", minWidth: 150, flex: 1, cellClassName: "text-center" },
    { field: "address", headerName: "Address", minWidth: 200, flex: 2, cellClassName: "text-center" },
    { field: "education", headerName: "Education", minWidth: 180, flex: 1.2, cellClassName: "text-center" },
    { field: "workExp", headerName: "Work Exp", minWidth: 130, flex: 1, cellClassName: "text-center" },
    { field: "departmentName", headerName: "Department", minWidth: 150, flex: 1, cellClassName: "text-center" },
    { field: "roleName", headerName: "Role", minWidth: 130, flex: 1, cellClassName: "text-center" },
    { field: "joinDate", headerName: "Join Date", minWidth: 150, flex: 1, cellClassName: "text-center" },
    {
      field: "resignDate",
      headerName: "Resign Date",
      minWidth: 150,
      flex: 1,
      cellClassName: "text-center",
      render: (row) => (row.resignDate ? row.resignDate : <span className="text-muted">Not Set</span>),
    },
  ];

  return (
    <div className="container mt-5 vh-100">
      {/* Displaying Active Employees Table */}
      {loading ? (
        <p className="text-center">Loading active employees...</p>
      ) : (
        <DataTable
          fetchData={() => activeEmployees} // Pass active employees
          columns={columns}
          keyField="number"
          responsive
          fixedHeader
          fixedHeaderScrollHeight="400px"
          noDataComponent="No active employees found"
          highlightOnHover
          pagination
        />
      )}

      {/* Optionally, you can display Resigned Employees Table below */}
      {/* 
      {loading ? (
        <p className="text-center">Loading resigned employees...</p>
      ) : (
        <DataTable
          fetchData={() => resignedEmployees} // Pass resigned employees
          columns={columns}
          keyField="number"
          responsive
          fixedHeader
          fixedHeaderScrollHeight="400px"
          noDataComponent="No resigned employees found"
          highlightOnHover
          pagination
        />
      )}
      */}
    </div>
  );
}

export default Employee;
