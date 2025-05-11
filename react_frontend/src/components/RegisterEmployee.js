import React, { useState, useEffect } from "react";
import nrcData from "../Data/nrc.json";
//import employeeService from "../services/employeeService";
import employeeController from "../Controller/employeeController";
function RegisterEmployee({ onSubmit, onCancel, editingEmployee, }) {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    positionName: "",
    departmentName: "",
    roleId: "",
    id: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    nrcRegion: "",
    nrcTownship: "",
    nrcType: "",
    nrcDetails: "",
    phone: "",
    address: "",
    education: "",
    workExp: "",
    joinDate: "",
    resignDate: "",
    nrc: "",
    annualLeave: "",
    medicalLeave: "",
    casualLeave: "",
    //password:"",
    totalLeave: "4",
  });
  // const positions = ["Senior Developer", "Junior Developer", "Fresher", "Intern","Accountant"];
  // const departments = ["IT", "Finance", "HR", "Maintenance", "Marketing"];
  // const roles = ["Admin", "Employee", "Manager"];
  // const positions = ["POS001", "POS002", "POS003", "POS004","POS005"];
  // const departments = ["DEPT001", "DEPT002", "DEPT003", "DEPT004", "DEPT005"];
  // const roles = ["1", "2", "3"];

  // const [error, setError] = useState("");



 // ✅ Populate fields if editing an employee
 useEffect(() => {
   if (!editingEmployee) return;

   setEmployeeData((prev) => ({
     ...prev,
     ...editingEmployee,
     departmentId: editingEmployee.departmentId || "",
     roleId: editingEmployee.roleId || ""
   }));
 }, [editingEmployee]);

  

 const handleChange = (e) => {
  setEmployeeData((employeeData) => ({
    ...employeeData,
    nrc: `${employeeData.nrcRegion || ""}${employeeData.nrcTownship || ""}${employeeData.nrcType || ""}${employeeData.nrcDetails || ""}`,
    [e.target.name]: e.target.value
  }));
};

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   console.log("Form Data Submitted: ", employeeData); // Check if data is being passed correctly
//   try {
//       const response = await fetch("http://localhost:8081/register", {
//           method: "POST",
//           headers: {
//               "Content-Type": "application/json",
//           },
//           body: JSON.stringify(employeeData),
//       });

//       const result = await response.json();
//       console.log("API Response:", result); // Log the response from the API
//       if (response.ok) {
//           alert("Employee registered successfully!");
//       } else {
//           alert(result.message);
//       }
//   } catch (error) {
//       console.error("Error:", error);
//       alert("An error occurred while registering.");
//   }
// };
// useEffect(() => {
//   registerEmployees();
// }, []);

const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent page reload
  onSubmit(employeeData);
  try {
    console.log("Registering Employee:", employeeData);
    const result = await employeeController.registerEmployee(employeeData);
    console.log("Employee registered successfully:", result);

    // Optionally reset form
    // setEmployeeData({ name: "", email: "", position: "" });

    // Handle success (e.g., show success message, redirect)
  } catch (error) {
    console.error("Failed to register employee:", error);
    // Handle error (e.g., show error message)
  }
};

  return (
    
        <div className="d-flex justify-content-center align-items-center container mt-4 vh-100">
          <div className="card shadow-lg p-4 rounded-3" style={{ maxWidth: '900px', width: '100%' }}>
            
            {/* Header */}
            <div className="card-header text-dark text-center rounded-3">
              <h3 className="m-0">{editingEmployee ? "Edit Employee" : "Register New Employee"}</h3>
            </div>
    
            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-3">
              
              {/* First Row */}
              <div className="row gx-3">
                {/* Personal Information */}
                <div className="col-md-6">
                  <h5 className="fw-bold text-secondary">Personal Information</h5>
                  <hr />
                  <div className="mb-2">
                <label className="form-label fw-semibold">Full Name</label>
                <input type="text" name="name" value={employeeData.name} onChange={handleChange} className="form-control form-control-lg" required />
              </div>

              <div className="mb-2">
                <label className="form-label fw-semibold">Email Address</label>
                <input type="email" name="email" value={employeeData.email} onChange={handleChange} className="form-control form-control-lg" required />
              </div>
                  <div className="mb-2">
                <label className="form-label fw-semibold">Date of Birth</label>
                <input type="date" name="dob" value={employeeData.dob} onChange={handleChange} className="form-control form-control-lg" required />
              </div>

              <div className="mb-2">
                <label className="form-label fw-semibold">Gender</label>
                <select name="gender" value={employeeData.gender} onChange={handleChange} className="form-select form-select-lg" required>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-2">
                <label className="form-label fw-semibold">Phone</label>
                <input type="text" name="phone" value={employeeData.phone} onChange={handleChange} className="form-control form-control-lg" required/>
              </div>

          <div className="mb-2">
            <label className="form-label fw-bold">NRC</label>
            <div className="d-flex gap-2">

        {/* NRC Region Dropdown */}
        <select
          name="nrcRegion"
          value={employeeData.nrcRegion}
          onChange={handleChange}
          className="form-select form-select-lg"
          style={{ flex: "1" }}  // Adjusted size
          required
        >
          <option value="">Region</option>
          {[...new Set(nrcData.data.map((item) => item.nrc_code))].map(
            (code, index) => (
              <option key={index} value={code}>{code}</option>
            )
          )}
        </select>

        {/* NRC Township Dropdown */}
        <select
          name="nrcTownship"
          value={employeeData.nrcTownship}
          onChange={handleChange}
          className="form-select form-select-lg"
          style={{ flex: "2" }}  // Adjusted size
          required
        >
      <option value="">Township</option>
      {nrcData.data
        .filter((item) => item.nrc_code === employeeData.nrcRegion)
        .map((item, index) => (
          <option key={index} value={item.name_mm}>
            {item.name_en} ({item.name_mm})
          </option>
        ))}
    </select>

    {/* NRC Type Dropdown */}
    <select
      name="nrcType"
      value={employeeData.nrcType}
      onChange={handleChange}
      className="form-select form-select-lg"
      style={{ flex: "1" }}  // Adjusted size
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
      value={employeeData.nrcDetails}
      onChange={handleChange}
      className="form-control form-control-lg"
      placeholder="Details"
      style={{ flex: "2" }}  // Adjusted size
      required
       />
      </div>
    </div>

      <div className="mb-2">
          <label className="form-label fw-semibold">Marital Status</label>
          <select 
            name="maritalStatus" 
            value={employeeData.maritalStatus} 
            onChange={handleChange} 
            className="form-select form-select-lg"
          >
            <option value="">Select Marital Status</option>
            <option value="Married">Married</option>
            <option value="Single">Single</option>
            <option value="Divorced">Divorced</option>
          </select>
      </div>
          <div className="mb-2">
          <label className="form-label fw-semibold">Address</label>
          <textarea
            name="address"
            value={employeeData.address}
            onChange={handleChange}
            className="form-control form-control-lg"
            style={{ height: "calc(2.5rem + 2px)", resize: "none" }}  // Ensures equal height
          />
        </div>
        <div className="mb-2">
                <label className="form-label fw-semibold">Education</label>
                <input type="text" name="education" value={employeeData.education} onChange={handleChange} className="form-control form-control-lg" />
              </div>

                </div>
    
                {/* Job Details */}
                <div className="col-md-6">
                  <h5 className="fw-bold text-secondary">Job Details</h5>
                  <hr />
                  <div className="mb-2">
              <label className="form-label fw-semibold">Employee ID</label>
              <input type="text" name="id" value={employeeData.id} onChange={handleChange} className="form-control form-control-lg" required />
            </div>

                {/* Position Dropdown */}
      <div className="mb-2">
        <label className="form-label fw-semibold">Position</label>
        <select
          name="positionName"
          value={employeeData.positionName}
          onChange={handleChange}
          className="form-select form-select-lg"
          required
        >
          <option value="">Select Position</option>
          {positions.map((position, index) => (
            <option key={index} value={index+1}>{position}</option>
          ))}
        </select>
      </div>

      {/* Department Dropdown */}
      <div className="mb-2">
        <label className="form-label fw-semibold">Department</label>
        <select
          name="departmentId"
          value={employeeData.departmentName}
          onChange={handleChange}
          className="form-select form-select-lg"
          required
        >
          <option value="">Select Department</option>
          {departments.map((department, index) => (
            <option key={index} value={index + 1}>{department}</option>
          ))}
        </select>
      </div>

      {/* Role Dropdown */}
      <div className="mb-2">
        <label className="form-label fw-semibold">Role</label>
        <select
          name="roleName"
          value={employeeData.roleName}
          onChange={handleChange}
          className="form-select form-select-lg"
          required
        >
          <option value="">Select Role</option>
          {roles.map((role, index) => (
            <option key={index} value={index + 1}>{role}</option>
          ))}
        </select>
      </div>
 

              <div className="mb-2">
                <label className="form-label fw-semibold">Work Experience</label>
                <input type="text" name="workExp" value={employeeData.workExp} onChange={handleChange} className="form-control form-control-lg" />
              </div>

            <div className="mb-2">
            <label className="form-label fw-semibold">Join Date</label>
            <input 
              type="date" 
              name="joinDate" 
              value={employeeData.joinDate} 
              onChange={handleChange} 
              className="form-control form-control-lg" 
              required 
            />
          </div>

          {/* ✅ New Resign Date Field */}
          <div className="mb-2">
            <label className="form-label fw-semibold">Resign Date</label>
            <input 
              type="date" 
              name="resignDate" 
              value={employeeData.resignDate} 
              onChange={handleChange} 
              className="form-control form-control-lg" 
            />
          </div>
          <div className="mb-2">
                <label className="form-label fw-semibold">Password</label>
                <input type="password" name="password" value={employeeData.password} onChange={handleChange} className="form-control form-control-lg" />
              </div>

                </div>
              </div>
              
              {/* Second Row */}
              <div className="row gx-3 mt-3">
                {/* Salary & Allowance */}
                <div className="col-md-6">
                  <h5 className="fw-bold text-secondary">Salary & Allowance</h5>
                  <hr />
                  <div className="mb-2">
                <label className="form-label fw-semibold">Basic Salary</label>
                <input 
                  type="number" 
                  name="basicSalary" 
                  value={employeeData.basicSalary} 
                  onChange={handleChange} 
                  className="form-control form-control-lg" 
                  required 
                />
              </div>

              <div className="mb-2">
                <label className="form-label fw-semibold">House Allowance</label>
                <input 
                  type="number" 
                  name="houseAllowance" 
                  value={employeeData.houseAllowance} 
                  onChange={handleChange} 
                  className="form-control form-control-lg" 
                  required 
                />
              </div>

              <div className="mb-2">
                <label className="form-label fw-semibold">Transportation</label>
                <input 
                  type="number" 
                  name="transportation" 
                  value={employeeData.transportation} 
                  onChange={handleChange} 
                  className="form-control form-control-lg" 
                  required 
                />
              </div>

                </div>
                
                {/* Leave Information */}
                <div className="col-md-6">
                  <h5 className="fw-bold text-secondary">Leave Information</h5>
                  <hr />
                  <div className="mb-2">
              <label className="form-label fw-semibold">Annual Leave</label>
              <input 
                type="number" 
                name="annualLeave" 
                value={employeeData.annualLeave} 
                onChange={handleChange} 
                className="form-control form-control-lg" 
                required 
              />
            </div>

            <div className="mb-2">
              <label className="form-label fw-semibold">Casual Leave</label>
              <input 
                type="number" 
                name="casualLeave" 
                value={employeeData.casualLeave} 
                onChange={handleChange} 
                className="form-control form-control-lg" 
                required 
              />
            </div>

            <div className="mb-2">
              <label className="form-label fw-semibold">Manual Leave</label>
              <input 
                type="number" 
                name="medicalLeave" 
                value={employeeData.medicalLeave} 
                onChange={handleChange} 
                className="form-control form-control-lg" 
                required 
              />
            </div>

          </div>
        </div>

              {/* Buttons */}
              <div className="d-flex justify-content-center mt-4">
                <button type="submit" className="btn btn-primary me-2">{editingEmployee ? "Update Employee" : "Register Employee"}</button>
                <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
              </div>
            </form>
          </div>
        </div>

      );
}
export default RegisterEmployee;
