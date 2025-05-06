import React, { useState, useEffect } from "react";
// import { BellFill, CheckCircleFill, PlusCircleFill } from "react-bootstrap-icons";
// import { Modal, Button, Card } from "react-bootstrap";
import apiClient from "./api/apiclient";
import { useNavigate } from "react-router-dom";
import DataTable from "./common/DataTable";
import overtimeController from "../Controller/overtimeController";

const OvertimeRequests = () => {
    const [overtimeRecords, setOvertimeRecords] = useState([]);
    const [pending, setPending] = useState([]);
    const [approved, setApproved] = useState([]);
    const [paid, setPaid] = useState([]);
    const [rejected, setRejected] = useState([]);
    const [showModal, setShowModal] = useState(false); // Modal state for adding OT request
    // const [newOTRequest, setNewOTRequest] = useState({}); // State for new OT request form
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOvertimeRecords = async () => {
            try {
                const data = await overtimeController.fetchOvertimeRecords();
                setOvertimeRecords(data || []);
            } catch (error) {
                console.error("Error fetching overtime records:", error);
                setOvertimeRecords([]);
            }
        };

        fetchOvertimeRecords();
    }, []);

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
            cellClassName: "text-center",
            headerClassName: "text-center",
        },
        {
            field: "employeeName",
            headerName: "Employee Name",
            minWidth: 150,
            flex: 1,
            cellClassName: "text-center",
            headerClassName: "text-center",
        },
        {
            field: "date",
            headerName: "Date",
            minWidth: 150,
            flex: 1,
            cellClassName: "text-center",
            headerClassName: "text-center",
        },
        {
            field: "startTime",
            headerName: "Start Time",
            minWidth: 120,
            flex: 1,
            cellClassName: "text-center",
            headerClassName: "text-center",
        },
        {
            field: "endTime",
            headerName: "End Time",
            minWidth: 120,
            flex: 1,
            cellClassName: "text-center",
            headerClassName: "text-center",
        },
        {
            field: "otTime",
            headerName: "Duration (in minutes)",
            minWidth: 120,
            flex: 1,
            cellClassName: "text-center",
            headerClassName: "text-center",
            render: (row) => (
                <div style={{ textAlign: "center", width: "100%" }}>
                    {row.otTime}
                </div>
            ),
        },
        {
            field: "reason",
            headerName: "Reason",
            minWidth: 200,
            flex: 2,
            cellClassName: "text-center",
            headerClassName: "text-center",
        },
        {
            field: "otStatus",
            headerName: "Status",
            minWidth: 120,
            flex: 1,
            cellClassName: "text-center",
            headerClassName: "text-center",
            render: (row) => (
                <div className="text-center w-100">
                    <span className={`badge ${
                        row.otStatus === "APPROVED"
                            ? "bg-success"
                            : row.otStatus === "PENDING"
                            ? "bg-warning text-dark"
                            : row.otStatus === "PAID"
                            ? "bg-primary"
                            : "bg-danger"
                    }`}>
                        {row.otStatus}
                    </span>
                </div>
            ),
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
