
import "bootstrap/dist/css/bootstrap.min.css";
import leaveController from "../Manager/Controller/EmpLeaveRecordController";
import DataTable from "../common/DataTable";

function EmpLeaveRecords() {
 
  const columns = [
    { field: "id", headerName: "Employee ID", minWidth: 150, flex: 1, cellClassName: "text-center" },
    { field: "leaveType", headerName: "Leave Type", minWidth: 150, flex: 1, cellClassName: "text-center" },
    { field: "startDate", headerName: "Start Date", minWidth: 150, flex: 1, cellClassName: "text-center" },
    { field: "endDate", headerName: "End Date", minWidth: 120, flex: 1, cellClassName: "text-center" },
    { field: "totalDays", headerName: "Total Days", minWidth: 120, flex: 1, cellClassName: "text-center" },
    { field: "reason", headerName: "Reason", minWidth: 200, flex: 2, cellClassName: "text-center" },
    { field: "status", headerName: "Status", minWidth: 120, flex: 1, cellClassName: "text-center" },
    { field: "employeeName", headerName: "Employee Name", minWidth: 120, flex: 1, cellClassName: "text-center" },
    { field: "managerName", headerName: "Manager Name", minWidth: 120, flex: 1, cellClassName: "text-center" },
    // { field: "rejectionReason", headerName: "Reject Reason", minWidth: 120, flex: 1, cellClassName: "text-center" },
    {
      field: "status",
      headerName: "Status",
      minWidth: 120,
      flex: 1,
      cellClassName: "text-center",
      render: (row) => (
        <span className={`badge ${row.status === "APPROVED" ? "bg-success" : "bg-danger"}`}>
          {row.status}
        </span>
      ),
    },
    {
      field: "rejectionReason",
      headerName: "Rejection Reason",
      minWidth: 200,
      flex: 2,
      cellClassName: "text-center",
      render: (row) => (row.status === "REJECTED" ? row.rejectionReason || "No reason given" : "N/A"),
    },
  ];



  return (
    <div className="container mt-5 vh-100">

      <h2 className="text-center mb-4">Leave </h2>
      
      <DataTable
          fetchData={leaveController.fetchLeaveRecord}
          columns={columns}
          keyField="employeeId"
          responsive
          fixedHeader
          fixedHeaderScrollHeight="400px"
          noDataComponent="No employees found"
          highlightOnHover
          pagination
        />

    </div>
  );
}

export default EmpLeaveRecords;