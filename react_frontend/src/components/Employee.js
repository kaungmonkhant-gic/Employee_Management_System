import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import employeeController from "../Controller/employeeController";
import DataTable from "./common/DataTable";
import nrcData from "../Data/nrc.json";
import { FaEdit, FaTrash } from "react-icons/fa"; 

function Employee() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [isRegisterScreen, setIsRegisterScreen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    positionName: "",
    departmentName: "",
    roleName:"",
    number: "",
    id: "",
    dob: "",
    nrcRegion: "",
    nrcTownship: "",
    nrcType: "",
    nrcDetails: "",
    gender: "",
    maritalStatus: "",
    phone: "",
    address: "",
    education: "",
    workExp: "",
    joinDate: "",
    resignDate: "",
  });
  const [nrcOptions, setNrcOptions] = useState({
    regions: [],
    townships: [],
    types: [],
    details: []
  });

  // Load NRC data on mount
  useEffect(() => {
    setNrcOptions(nrcData);
  }, []);

  const columns = [
    { field: "number", headerName: "No." },
    { field: "name", headerName: "Name" },
    { field: "email", headerName: "Email" },
    { field: "positionName", headerName: "Position" },
    { field: "id", headerName: "Emp ID" },
    { field: "dob", headerName: "DOB" },
    { field: "nrc", headerName: "NRC" },
    { field: "gender", headerName: "Gender" },
    { field: "maritalStatus", headerName: "Marital Status" },
    { field: "phone", headerName: "Phone" },
    { field: "address", headerName: "Address" },
    { field: "education", headerName: "Education" },
    { field: "workExp", headerName: "WorkExp" },
    { field: "joinDate", headerName: "Joined Date" },
    { field: "resignDate", headerName: "Resign Date" },
    { field: "departmentName", headerName: "Department" },
    { field: "roleName", headerName: "Role" },
    {
      field: "actions",
      headerName: "Actions",
      render: (row) => (
          <div className="d-flex gap-2">
              <button 
                  onClick={() => handleEdit(row)} 
                  className="btn btn-outline-primary btn-sm"
                  title="Edit Employee"
              >
                  <FaEdit />
              </button>
              <button 
                  onClick={() => handleDelete(row)} 
                  className="btn btn-outline-danger btn-sm"
                  title="Delete Employee"
              >
                  <FaTrash />
              </button>
          </div>
      ),
  },
];
  
  
  const positions = [
    "Manager",
    "Developer",
    "Designer",
    "Tester",
    "HR",
    "Intern",
  ];

  const handleChange = (e) => {
    const {name, value} = e.target;
    if (editingEmployee) {
      setEditingEmployee((prev) => ({...prev, [name]: value}));
    } else {
      setNewEmployee((prev) => ({...prev, [name]: value}));
    }
  };
  
  
  const handleRegister = (e) => {
    e.preventDefault();
    if (employees.some((employee) => employee.id === newEmployee.id)) {
      alert("Employee ID must be unique!");
      return;
    }

    if (newEmployee.name && newEmployee.email && newEmployee.position) {
      const newEmployeeData = {
        ...newEmployee,
        number: employees.length + 1,
        id: newEmployee.id.toUpperCase(), // Convert empid to uppercase
      };

      setEmployees((prev) => [...prev, newEmployeeData]);
      setNewEmployee({
        name: "",
        email: "",
        
        id: "",
        dob: "",
        nrcRegion: "",
        nrcTownship: "",
        nrcType: "",
        nrcDetails: "",
        gender: "",
        roleName:"",
        maritalStatus: "",
        phone: "",
        address: "",
        education: "",
        workExp: "",
        departmentName: "",
        positionName: "",
        joinDate: "",
        resignDate: "",
      });
      setIsRegisterScreen(false);
    } else {
      alert("Please fill all required fields!");
    }
  };

  const handleEdit = (employee) => {
    console.log("Editing:", employee);
    setEditingEmployee(employee); // Set the full employee object
    setIsRegisterScreen(true);
  };
  
  const handleDelete = (employee) => {
    console.log("Deleting:", employee.number);
    setEmployees((prev) => prev.filter((e) => e.number !== employee.number));
  };
  
  const handleUpdate = (e) => {
    e.preventDefault();
    if (
        editingEmployee.name &&
        editingEmployee.email &&
        editingEmployee.positionName
    ) {
      setEmployees((prev) =>
          prev.map((employee) =>
              employee.number === editingEmployee.number ? editingEmployee : employee
          )
      );
      setEditingEmployee(null);
      setIsRegisterScreen(false);
    } else {
      alert("Please fill all fields!");
    }
  };

  const handleRegisterClick = () => {
    setIsRegisterScreen(true);
    setEditingEmployee(null);
  };

useEffect(() => {
  fetchEmployees();
}, []);

const fetchEmployees = async () => {
  try {
    const data = await employeeController.fetchUsers();
    if (Array.isArray(data)) {
      const updatedData = data.map((employee, index) => ({
        ...employee,
        number: index + 1, // Ensure a unique number field
      }));
      setEmployees(updatedData);
    } else {
      console.error("Invalid data format:", data);
    }
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
};

  return (
      <div className="container mt-5 vh-100">
        {!isRegisterScreen ? (
          
            <div>
              <button
                  className="btn btn-primary mb-4"
                  onClick={handleRegisterClick}
              >
                Register New Employee
              </button>

              <div className="vh-100 overflow-auto">
              
              <DataTable
              fetchData={() => employeeController.fetchUsers().then(data => 
                data.map((employee, index) => ({ ...employee, number: index + 1 })) // Add number field
              )}
              columns={columns}
              keyField="number"/>
              </div>
            </div>
        ) : (
            <div className="d-flex justify-content-center align-items-center ">
              <div className="card p-2 " style={{maxWidth: "800px", width: "100%", overflow: "auto"}}>
               
              <div
          className="card-header d-flex align-items-center"
          style={{
            backgroundColor: "#FFFFFF",
            color: "#004080",
            
          }}
        >
          <div className="d-flex flex-column align-items-center text-center w-100">
          <h2 className="text-center"  style={{ color: "black" }}>
                  Register New Employee
              </h2>
          </div>

        </div>
                <h3>{editingEmployee ? "Edit Employee" : ""}</h3>
                <form onSubmit={editingEmployee ? handleUpdate : handleRegister}>
                <div className="row">
  {/* Left Column */}
  <div className="col-md-6 col-12">
    <div className="mb-2">
      <label htmlFor="name" className="form-label fw-bold">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Enter name"
        value={editingEmployee ? editingEmployee.name : newEmployee.name}
        onChange={handleChange}
        className="form-control"
      />
    </div>
    <div className="mb-2">
      <label htmlFor="email" className="form-label fw-bold">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Enter email"
        value={editingEmployee ? editingEmployee.email : newEmployee.email}
        onChange={handleChange}
        className="form-control"
      />
    </div>
    <div className="mb-2">
      <label htmlFor="positionName" className="form-label fw-bold">Position</label>
      <select
        id="positionName"
        name="positionName"
        value={editingEmployee ? editingEmployee.position : newEmployee.position}
        onChange={handleChange}
        className="form-select"
      >
        <option value="" disabled>Select Position</option>
        {positions.map((positionName, index) => (
          <option key={index} value={positionName}>{positionName}</option>
        ))}
      </select>
    </div>
    <div className="mb-2">
      <label htmlFor="id" className="form-label fw-bold">Employee ID</label>
      <input
        type="text"
        id="id"
        name="id"
        placeholder="Enter employee ID"
        value={editingEmployee ? editingEmployee.id : newEmployee.id}
        onChange={handleChange}
        className="form-control"
      />
    </div>
    <div className="mb-2">
      <label htmlFor="dob" className="form-label fw-bold">Date of Birth</label>
      <input
        type="date"
        id="dob"
        name="dob"
        value={editingEmployee ? editingEmployee.dob : newEmployee.dob}
        onChange={handleChange}
        className="form-control"
      />
    </div>

          {/* NRC Fields */}
          <div className="mb-2">
            <label className="form-label fw-bold">NRC</label>
            <div className="d-flex  gap-2">
              {/* NRC Region Dropdown */}
              <select
                name="nrcRegion"
                value={newEmployee.nrcRegion}
                onChange={handleChange}
                className="form-select"
                style={{ width: "18%" }}
                required
              >
                <option value="">Region</option>
                {[...new Set(nrcData.data.map((item) => item.nrc_code))].map(
                  (code, index) => (
                    <option key={index} value={code}>
                      {code}
                    </option>
                  )
                )}
              </select>

              {/* NRC Township Dropdown */}
              <select
                name="nrcTownship"
                value={newEmployee.nrcTownship}
                onChange={handleChange}
                className="form-select"
                style={{ width: "30%" }}
                required
              >
                <option value="">Township</option>
                {nrcData.data
                  .filter((item) => item.nrc_code === newEmployee.nrcRegion)
                  .map((item, index) => (
                    <option key={index} value={item.name_mm}>
                      {item.name_en} ({item.name_mm})
                    </option>
                  ))}
              </select>

              {/* NRC Type Dropdown */}
              <select
                name="nrcType"
                value={newEmployee.nrcType}
                onChange={handleChange}
                className="form-select"
                style={{ width: "20%" }}
                required
              >
                <option value="">(N/T/S)</option>
                <option value="(N)">(N)</option>
                <option value="(T)">(T)</option>
                <option value="(S)">(S)</option>
              </select>

              {/* NRC Details Input */}
              <input
                type="text"
                name="nrcDetails"
                value={newEmployee.nrcDetails}
                onChange={handleChange}
                className="form-control"
                placeholder="Details"
                style={{ width: "27%" }}
                required
              />
            </div>
          </div>

    <div className="mb-2">
      <label htmlFor="gender" className="form-label fw-bold">Gender</label>
      <select
        id="gender"
        name="gender"
        value={editingEmployee ? editingEmployee.gender : newEmployee.gender}
        onChange={handleChange}
        className="form-select"
      >
        <option value="" disabled>Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </div>
    <div className="mb-2">
      <label htmlFor="roleName" className="form-label fw-bold">Role</label>
      <select
        id="roleName"
        name="roleName"
        value={editingEmployee ? editingEmployee.roleName: newEmployee.roleName}
        onChange={handleChange}
        className="form-select"
      >
        <option value="" disabled>Select Role</option>
        <option value="Admin">Admin</option>
        <option value="Manager">Manager</option>
        <option value="Employee">Employee</option>
      </select>
    </div>
  </div>

  {/* Right Column */}
  <div className="col-md-6 col-12">
    <div className="mb-2">
      <label htmlFor="maritalStatus" className="form-label fw-bold">Marital Status</label>
      <select
        id="maritalStatus"
        name="maritalStatus"
        value={editingEmployee ? editingEmployee.maritalStatus : newEmployee.maritalStatus}
        onChange={handleChange}
        className="form-select"
      >
        <option value="" disabled>Select Marital Status</option>
        <option value="Single">Single</option>
        <option value="Married">Married</option>
        <option value="Divorced">Divorced</option>
      </select>
    </div>
    <div className="mb-2">
      <label htmlFor="phone" className="form-label fw-bold">Phone</label>
      <input
        type="text"
        id="phone"
        name="phone"
        placeholder="Enter phone number"
        value={editingEmployee ? editingEmployee.phone : newEmployee.phone}
        onChange={handleChange}
        className="form-control"
      />
    </div>
   
    <div className="mb-2">
      <label htmlFor="education" className="form-label fw-bold">Education</label>
      <input
        type="text"
        id="education"
        name="education"
        placeholder="Enter education"
        value={editingEmployee ? editingEmployee.education : newEmployee.education}
        onChange={handleChange}
        className="form-control"
      />
    </div>
    <div className="mb-2">
      <label htmlFor="workExp" className="form-label fw-bold">Work Experience</label>
      <input
        type="text"
        id="workExp"
        name="workExp"
        placeholder="Enter work experience"
        value={editingEmployee ? editingEmployee.workExp : newEmployee.workExp}
        onChange={handleChange}
        className="form-control"
      />
    </div>
    <div className="mb-2">
      <label htmlFor="joinDate" className="form-label fw-bold">Join Date</label>
      <input
        type="date"
        id="joinDate"
        name="joinDate"
        value={editingEmployee ? editingEmployee.joinDate : newEmployee.joinDate}
        onChange={handleChange}
        className="form-control"
      />
    </div>
    <div className="mb-2">
      <label htmlFor="resignDate" className="form-label fw-bold">Resign Date</label>
      <input
        type="date"
        id="resignDate"
        name="resignDate"
        value={editingEmployee ? editingEmployee.resignDate : newEmployee.resignDate}
        onChange={handleChange}
        className="form-control"
      />
    </div>
    <div className="mb-2">
      <label htmlFor="departmentName" className="form-label fw-bold">Department</label>
      <select
        id="departmentName"
        name="departmentName"
        value={editingEmployee ? editingEmployee.departmentName: newEmployee.departmentName}
        onChange={handleChange}
        className="form-select"
      >
        <option value="" disabled>Select Department</option>
        <option value="Human Resource">Human Resource</option>
        <option value="Finance">Finance</option>
        <option value="IT">IT</option>
      </select>
    </div>
    <div className="mb-2">
  <label htmlFor="address" className="form-label fw-bold">Address</label>
  <textarea
    id="address"
    name="address"
    placeholder="Enter address"
    value={newEmployee.address}
    onChange={handleChange}
    className="form-control auto-expand"
    rows="1"
    style={{ minHeight: "38px", overflow: "hidden", resize: "none" }}
  ></textarea>
</div>

  </div>
</div>


                  <button type="submit" className="btn btn-primary me-3">
                    {editingEmployee ? "Update" : "Register"}
                  </button>
                  <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setIsRegisterScreen(false)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
        )}
      </div>
  );
}

export default Employee;