import  { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import leaveController from "../Controller/LeaveApprovalController";
import { Button } from "react-bootstrap";

const ConfirmedRequests = () => {
  const [confirmedRequests, setConfirmedRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApprovedRequests = async () => {
      try {
        setIsLoading(true);
        const response = await leaveController.fetchLeaveRequests();
        setConfirmedRequests(response.filter((record) => record.status !== "PENDING"));
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchApprovedRequests();
  }, []);

  const columns = [
    {
      name: "Employee ID",
      selector: row => row.employeeId,
      sortable: true,
      center: true
    },
    {
      name: "Leave Type",
      selector: row => row.leaveType,
      center: true
    },
    {
      name: "Start Date",
      selector: row => row.startDate,
      center: true
    },
    {
      name: "End Date",
      selector: row => row.endDate,
      center: true
    },
    {
      name: "Total Days",
      selector: row => row.totalDays,
      center: true
    },
    {
      name: "Reason",
      selector: row => row.reason,
      // center: true,
    
      warp:true
    },
    {
      name: "Status",
      selector: row => row.status,
      center: true,

      cell: row => (
        <span className={`badge ${row.status === "APPROVED" ? "bg-success" : "bg-danger"}`}>
          {row.status}
        </span>
      )
    },
    {
      name: "Employee Name",
      selector: row => row.employeeName,
      center: true
    },
    {
      name: "Manager Name",
      selector: row => row.managerName,
      center: true,
      warp:true,
    },
    {
      name: "Rejection Reason",
      selector: row => row.rejectionReason,
      // center: true,
      warp:true,
      cell: row => row.status === "REJECTED" ? row.rejectionReason || "No reason given" : "N/A"
    }
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#c3dbf7",
        color: "#495057",
        fontWeight: "bold",
        fontSize: "15px",
        borderBottom: "2px solid #dee2e6",
        whiteSpace: "nowrap", // Prevent text wrapping
        overflow: "visible", // Allow content overflow
        textOverflow: "unset", // Prevent ellipsis
      },
    },
    
    rows: {
      style: {
        minHeight: "70px",
        fontSize: "14px",
        borderBottom: "1px solid #dee2e6",
      },
    },
    
    cells: {
      style: {
        borderRight: "1px solid #dee2e6",
        paddingLeft: "12px",
        paddingRight: "12px",
      },
    },
    
    table: {
      style: {
        border: "1px solid #dee2e6",
      
      },
    },
  };
  

  return (
    <div className="container mt-4">
      <h3 className="mb-3 text-center">Confirmed Leave Requests</h3>

      <div className="d-flex flex-wrap gap-2 justify-content-center mb-3">
        <Button variant="secondary" onClick={() => navigate("/admin-dashboard/admin-leave")}>Return</Button>
        <Button variant="secondary" onClick={() => navigate("/admin-dashboard/admin-leave-approval")}>View Pending Requests</Button>
      </div>

      <div className="bg-white p-3 border rounded shadow-sm">
        <DataTable
          columns={columns}
          data={confirmedRequests}
          progressPending={isLoading}
          pagination
          responsive
          highlightOnHover
          fixedHeader
          fixedHeaderScrollHeight="300px"
          noDataComponent="No confirmed leave requests"
          dense
          customStyles={customStyles}
        />
      </div>
    </div>
  );
};

export default ConfirmedRequests;
