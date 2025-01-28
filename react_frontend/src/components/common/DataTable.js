import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";

const DataTable = ({ fetchData, columns, keyField }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const result = await fetchData();
                setData(result);
            } catch (err) {
                setError("Failed to fetch data. Please try again.");
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDataAsync();
    }, [fetchData]);

    useEffect(() => {
        const initializeDataTable = () => {
            $("#datatable").DataTable({
                fixedHeader: true,
                scrollX: true, // Enable horizontal scrolling
            });
        };

        if (!loading && !error) {
            initializeDataTable();
        }

        return () => {
            if ($.fn.DataTable.isDataTable("#datatable")) {
                $("#datatable").DataTable().destroy();
            }
        };
    }, [loading, error]);


    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-danger">{error}</div>;

    return (
        <Table id="datatable" striped bordered hover responsive>
            <thead>
            <tr>
                {columns.map((col) => (
                    <th key={col.field}>{col.headerName}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((row) => (
                <tr key={row[keyField]}>
                    {columns.map((col) => (
                        <td key={`${row[keyField]}-${col.field}`}>{row[col.field]}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default DataTable;

// Example Usage

// const EmployeeTable = () => {
//     const columns = [
//         { field: "id", headerName: "ID" },
//         { field: "firstName", headerName: "First Name" },
//         { field: "lastName", headerName: "Last Name" },
//         { field: "email", headerName: "Email" },
//         { field: "position", headerName: "Position" },
//         { field: "department", headerName: "Department" },
//     ];

    // return (
    //     <DataTable
    //         fetchData={employeeController.fetchUsers}
    //         columns={columns}
    //         keyField="id"
    //     />
    // );
// };

// export { EmployeeTable };
