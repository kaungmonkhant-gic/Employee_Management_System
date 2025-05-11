import React, { useState, useEffect } from "react";
// import { BellFill, CheckCircleFill, PlusCircleFill } from "react-bootstrap-icons";
// import { Modal, Button, Card } from "react-bootstrap";
import apiClient from "./api/apiclient";
import DataTable from "./common/DataTable";
import overtimeController from "../Controller/overtimeController";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat); // Enable custom format parsing

const OvertimeRequests = () => {
    const [ ,setOvertimeRecords] = useState([]);
    const [, setPending] = useState([]);
    const [, setApproved] = useState([]);
    const [, setRejected] = useState([]);
    useEffect(() => {
        const fetchOvertimeRecords = async () => {
            try {
                const data = await overtimeController.fetchOvertimeRecords();
                console.log("Sample OT record:", data[0]);

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
                
                setRejected(Array.isArray(data.REJECTED) ? data.REJECTED : []);
            } catch (error) {
                console.error("Error fetching overtime requests:", error);
                setPending([]);
                setApproved([]);
               
                setRejected([]);
            }
        };
        fetchOvertimeRequests();
    }, []);


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
    render: (row) => (
        <div style={{ textAlign: "center", width: "100%" }}>
            {dayjs(row.startTime, "HH:mm:ss").isValid()
                ? dayjs(row.startTime, "HH:mm:ss").format("HH:mm")
                : "Invalid Time"}
        </div>
    ),
},
{
    field: "endTime",
    headerName: "End Time",
    minWidth: 120,
    flex: 1,
    cellClassName: "text-center",
    headerClassName: "text-center",
    render: (row) => (
        <div style={{ textAlign: "center", width: "100%" }}>
            {dayjs(row.endTime, "HH:mm:ss").isValid()
                ? dayjs(row.endTime, "HH:mm:ss").format("HH:mm")
                : "Invalid Time"}
        </div>
    ),
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
                    <span
                        className={`badge ${
                            row.otStatus === "APPROVED"
                                ? "bg-success"
                                : row.otStatus === "PENDING"
                                ? "bg-warning text-dark"
                                : row.otStatus === "PAID"
                                ? "bg-primary"
                                : "bg-danger"
                        }`}
                    >
                        {row.otStatus}
                    </span>
                </div>
            ),
        },
    ];

    return (
        <div className="container mt-3 vh-100">
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
