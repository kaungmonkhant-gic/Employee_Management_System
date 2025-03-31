import React, { useState, useEffect } from "react";
// import { BellFill, CheckCircleFill, PlusCircleFill } from "react-bootstrap-icons";
// import { Modal, Button, Card } from "react-bootstrap";
import apiClient from "./api/apiclient";
import { useNavigate } from "react-router-dom";
import DataTable from "./common/DataTable";
import overtimeController from "../Controller/overtimeController";

const OvertimeRequests = () => {
    const [pending, setPending] = useState([]);
    const [approved, setApproved] = useState([]);
    const [paid, setPaid] = useState([]);
    const [rejected, setRejected] = useState([]);
    const [showModal, setShowModal] = useState(false); // Modal state for adding OT request
    // const [newOTRequest, setNewOTRequest] = useState({}); // State for new OT request form
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOvertimeRequests = async () => {
            try {
                const response = await apiClient.get("/ot/status-count");
                const data = response.data || {};
                setPending(Array.isArray(data.PENDING) ? data.PENDING : []);
                setApproved(Array.isArray(data.APPROVED) ? data.APPROVED : []);
                setPaid(Array.isArray(data.PAID) ? data.PAID : []);
                setRejected(Array.isArray(data.REJECTED) ? data.REJECTED : []);
            } catch (error) {
                console.error("Error fetching overtime requests:", error);
                setPending([]);
                setApproved([]);
                setPaid([]);
                setRejected([]);
            }
        };
        fetchOvertimeRequests();
    }, []);

    // Handle opening the modal to add an overtime request
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const columns = [
        {
            field: "number",
            headerName: "No.",
            minWidth: 50,
            flex: 0.5,
            cellClassName: "text-center", // Ensures text alignment in Bootstrap
            headerClassName: "text-center", // Centers the header text as well
        },

        {
            field: "employeeName",
            headerName: "Employee Name",
            minWidth: 150,
            flex: 1,
            cellClassName: "text-center",
        },
        // { field: "managerName", headerName: "Manager Name", minWidth: 150, flex: 1, cellClassName: "text-center" },

        {
            field: "date",
            headerName: "Date",
            minWidth: 150,
            flex: 1,
            cellClassName: "text-center",
        },
        {
            field: "startTime",
            headerName: "Start Time",
            minWidth: 120,
            flex: 1,
            cellClassName: "text-center",
        },
        {
            field: "endTime",
            headerName: "End Time",
            minWidth: 120,
            flex: 1,
            cellClassName: "text-center",
        },
        {
            field: "otTime",
            headerName: "Duration",
            minWidth: 120,
            flex: 1,
            cellClassName: "text-center",
        },
        {
            field: "reason",
            headerName: "Reason",
            minWidth: 200,
            flex: 2,
            cellClassName: "text-center",
        },
        {
            field: "otStatus",
            headerName: "Status",
            minWidth: 120,
            flex: 1,
            cellClassName: "text-center",
            renderCell: (params) => {
                let statusColor = "";
                switch (params.value) {
                    case "APPROVED":
                        statusColor = "text-success fw-bold"; // Green color
                        break;
                    case "PENDING":
                        statusColor = "text-warning fw-bold"; // Yellow color
                        break;
                    case "REJECTED":
                        statusColor = "text-danger fw-bold"; // Red color
                        break;
                    case "PAID":
                        statusColor = "text-primary fw-bold"; // Blue color
                        break;
                    default:
                        statusColor = "text-secondary fw-bold"; // Gray for unknown status
                }
                return <span className={statusColor}>{params.value}</span>;
            },
        },
    ];

    return (
        <div className="container mt-3 vh-100">
            {/* Data table for showing overtime requests */}
            <DataTable
                fetchData={overtimeController.fetchOvertimeRecords}
                columns={columns}
                keyField="id"
                responsive
                fixedHeader
                fixedHeaderScrollHeight="400px"
                noDataComponent="No overtime records found"
                highlightOnHover
                pagination
            />
        </div>
    );
};

export default OvertimeRequests;
