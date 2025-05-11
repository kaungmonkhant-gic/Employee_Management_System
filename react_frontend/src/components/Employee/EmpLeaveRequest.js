import  { useState, useEffect } from "react";
import { BellFill, CheckCircleFill } from "react-bootstrap-icons";
import { Modal, Button } from "react-bootstrap";
import LeaveForm from "../common/LeaveForm";
import apiClient from "../api/apiclient";
// import DataTable from "../common/DataTable";
import leaveController from "../Employee/Controller/LeaveRequestController";
import DataTable from "react-data-table-component";


const LeaveRequests = () => {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [leaveRecords, setLeaveRecords] = useState([]);
  const [loading, setLoading] = useState(true);
 
 
  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await apiClient.get("/leave/status-count");
        setPending(response.data.PENDING);
        setApproved(response.data.APPROVED);
        setRejected(response.data.REJECTED);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };

    fetchLeaveRequests();
  }, []);

  useEffect(() => {
    const fetchLeaveRecords = async () => {
      try {
        const response = await leaveController.fetchLeaveRecords();
        setLeaveRecords(response || []);
      } catch (error) {
        console.error("Error fetching leave records:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveRecords();
  }, []);

  const columns = [
    {
      name: "Employee ID",
      selector: row => row.employeeId,
      sortable: true,
      center: true,
    },
    {
      name: "Leave Type",
      selector: row => row.leaveType,
      center: true,
    },
    {
      name: "Start Date",
      selector: row => row.startDate,
      center: true,
    },
    {
      name: "End Date",
      selector: row => row.endDate,
      center: true,
    },
    {
      name: "Total Days",
      selector: row => row.totalDays,
      center: true,
    },
    {
      name: "Reason",
      selector: row => row.reason,
      // center: true,
      wrap:true,
    },
    {
      name: "Name",
      selector: row => row.employeeName,
      center: true,
    },
    {
      name: "Manager Name",
      selector: row => row.managerName,
      center: true,
    },
    {
      name: "Status",
      selector: row => row.status,
      center: true,
      wrap:true,
      cell: row => (
        <span className={`badge ${row.status === "APPROVED" ? "bg-success" : "bg-danger"}`}>
          {row.status}
        </span>
      ),
    },
    {
      name: "Rejection Reason",
      selector: row => row.rejectionReason,
      center: true,
      wrap:true,
      cell: row =>
        row.status === "REJECTED" ? row.rejectionReason || "No reason given" : "N/A",
    },
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
    <div className="scroll-hidden">
      <div className="container mt-3">
        <div className="row g-3 justify-content-center">
          <div className="col-12 col-sm-6 col-md-4 col-lg-4">
            <div className="d-flex align-items-center p-3 border rounded shadow-sm bg-white">
              <BellFill size={32} color="orange" />
              <div className="ms-3">
                <p className="text-muted mb-1">Pending Requests</p>
                <p className="fw-bold mb-0">{pending}</p>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-4">
            <div className="d-flex align-items-center p-3 border rounded shadow-sm bg-white">
              <CheckCircleFill size={32} color="green" />
              <div className="ms-3">
                <p className="text-muted mb-1">Approved Requests</p>
                <p className="fw-bold mb-0">{approved}</p>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-4 col-lg-4">
            <div className="d-flex align-items-center p-3 border rounded shadow-sm bg-white">
              <CheckCircleFill size={32} color="red" />
              <div className="ms-3">
                <p className="text-muted mb-1">Rejected Requests</p>
                <p className="fw-bold mb-0">{rejected}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 border rounded shadow-sm bg-white mt-4">
          <h5 className="mb-3 text-center">Leave Requests</h5>

          <div className="d-flex flex-wrap gap-2 justify-content-center">
            <Button variant="secondary" onClick={() => setShowModal(true)}>
              Apply for Leave
            </Button>
            {/* <Button variant="secondary" onClick={() => navigate("/admin-dashboard/admin-leave-approval")}>
              Incoming Leave Requests
            </Button> */}
            {/* <Button variant="secondary" onClick={() => navigate("/employee-dashboard/leave-confirmed")}>
              Confirmed Requests
            </Button> */}
          </div>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" scrollable>
          <Modal.Header closeButton>
            <Modal.Title>Leave Request Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LeaveForm />
          </Modal.Body>
        </Modal>

        <div className="bg-white mt-4 p-3 border rounded shadow-sm">
          <DataTable
            columns={columns}
            data={leaveRecords}
            progressPending={loading}
            pagination
            responsive
            highlightOnHover
            fixedHeader
            fixedHeaderScrollHeight="300px"
            noDataComponent="No employees found"
            dense
            customStyles={customStyles}
          />
        </div>
      </div>
    </div>
  );
};

export default LeaveRequests;
