import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import otcontroller from "../Manager/Controller/otcontroller";
import DataTable from "../common/DataTable";
import { useNavigate } from "react-router-dom";
import RejectModal from "../common/RejectModal";

const PendingRequests = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [headerText, setHeaderText] = useState("Manage Pending Requests");
  const [showModal, setShowModal] = useState(false);
  const [currentRequestId, setCurrentRequestId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOvertimeRequests = async () => {
      try {
        setIsLoading(true);
        const response = await otcontroller.fetchOvertimeRequests();
        setPendingRequests(response.filter((record) => record.otStatus === "PENDING"));
      } catch (error) {
        console.error("Error fetching overtime requests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOvertimeRequests();
  }, []);

  // Approve request
  const approveRequest = async (id) => {
    try {
      await otcontroller.approveRequest(id);
      setPendingRequests((prev) => prev.filter((record) => record.id !== id)); // Remove from pending
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  // Reject request, open modal to capture the reason
  const rejectRequest = (id) => {
    setCurrentRequestId(id);
    setShowModal(true); // Open the modal for entering the rejection reason
  };

  // Handle the rejection logic
  const handleReject = async (id, comment) => {
    if (!comment.trim()) {
      alert("Rejection reason is required.");
      return;
    }
  
    try {
      await otcontroller.rejectRequest(id, comment); // Call API to reject request
      setPendingRequests((prev) => prev.filter((request) => request.id !== id)); // Remove rejected request
      setShowModal(false); // Close the modal after rejection
      alert("Request rejected successfully.");
    } catch (error) {
      console.error("Error rejecting request:", error);
      alert("Failed to reject request. Please try again.");
    }
  };
  

  const columns = [
    { field: "employeeName", headerName: "Employee", minWidth: 150, flex: 1, cellClassName: "text-center" },
    { field: "managerName", headerName: "Manager", minWidth: 150, flex: 1, cellClassName: "text-center" },
    { field: "date", headerName: "Date", minWidth: 120, flex: 1, cellClassName: "text-center" },
    { field: "startTime", headerName: "Start Time", minWidth: 120, flex: 1, cellClassName: "text-center" },
    { field: "endTime", headerName: "End Time", minWidth: 120, flex: 1, cellClassName: "text-center" },
    { field: "otTime", headerName: "OT Hours", minWidth: 120, flex: 1, cellClassName: "text-center" },
    { field: "reason", headerName: "Reason", minWidth: 200, flex: 2, cellClassName: "text-center" },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 1,
      cellClassName: "text-center",
      render: (row) => (
        <div className="d-flex justify-content-center gap-2">
          <button onClick={() => approveRequest(row.id)} className="btn btn-outline-success btn-sm">
            <FaCheckCircle /> Approve
          </button>
          <button onClick={() => rejectRequest(row.id)} className="btn btn-outline-danger btn-sm">
            <FaTimesCircle /> Reject
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <h1>{headerText}</h1>
      
      <button className="btn btn-primary mb-3" onClick={() => navigate("/manager-dashboard/confirm-ot-request")}>
        View Confirmed Requests
      </button>

      {/* DataTable */}
      <DataTable
        fetchData={() =>
          otcontroller.fetchOvertimeRequests().then((data) =>
            Array.isArray(data) ? data.filter((request) => request.otStatus === "PENDING") : []
          )
        }
        columns={columns}
        keyField="id"
        responsive
        fixedHeader
        fixedHeaderScrollHeight="400px"
        noDataComponent="No pending overtime requests"
        progressPending={isLoading}
        highlightOnHover
        pagination
      />

      {/* Reject Modal */}
<RejectModal
  show={showModal}
  handleClose={() => setShowModal(false)}
  handleReject={handleReject}
  requestId={currentRequestId} // Ensure requestId is passed
/>
</div>
  );
};

export default PendingRequests;
