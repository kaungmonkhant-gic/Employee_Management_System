import React, { useState, useEffect } from "react";
import nrcData from "../Data/nrc.json";

function RegisterEmployee({ onSubmit, onCancel, editingEmployee, positions = [], departments = [], roles = [] }) {

  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    positionName: "",
    departmentName: "",
    roleName: "",
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
  });
 
  // const [nrcOptions, setNrcOptions] = useState({
  //   regions: [],
  //   townships: [],
  //   types: [],
  //   details: []
  // });

  // // Load NRC data on mount
  // useEffect(() => {
  //   setNrcOptions(nrcData);
  // }, []);
  
  useEffect(() => {
    if (!editingEmployee) return; // Guard clause to exit early
  
    setEmployeeData(prev => ({
      ...prev,
      ...editingEmployee,
      departmentName: editingEmployee.departmentName || "",
      roleName: editingEmployee.roleName || ""
    }));
  }, [editingEmployee]);
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!employeeData.name || !employeeData.email || !employeeData.positionName) {
      alert("Please fill in all required fields.");
      return;
    }
    onSubmit(employeeData);
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4 rounded-3" style={{ maxWidth: "900px", width: "100%" }}>
        
        {/* Header */}
        <div className="card-header text-dark text-center rounded-3" > 

          <h3 className="m-0">{editingEmployee ? "Edit Employee" : "Register New Employee"}</h3>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-3">
          
          {/* Two-Column Layout */}
          <div className="row g-3">
            
            {/* Left Column */}
            <div className="col-md-6">
              
              {/* Personal Info Section */}
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
                <select name="gender" value={employeeData.gender} onChange={handleChange} className="form-select form-select-lg">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-2">
                <label className="form-label fw-semibold">Phone</label>
                <input type="text" name="phone" value={employeeData.phone} onChange={handleChange} className="form-control form-control-lg" />
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

              <div className="mb-2">
                <label className="form-label fw-semibold">Work Experience</label>
                <input type="text" name="workExp" value={employeeData.workExp} onChange={handleChange} className="form-control form-control-lg" />
              </div>

            </div>

            {/* Right Column */}
            <div className="col-md-6">
              
              {/* Job Details Section */}
              <h5 className="fw-bold text-secondary">Job Details</h5>
              <hr />

              <div className="mb-2">
                <label className="form-label fw-semibold">Employee ID</label>
                <input type="text" name="id" value={employeeData.id} onChange={handleChange} className="form-control form-control-lg" required />
              </div>

              <div className="mb-2">
                <label className="form-label fw-semibold">Position</label>
                <select name="positionName" value={employeeData.positionName} onChange={handleChange} className="form-select form-select-lg" required>
                  <option value="">Select Position</option>
                  {positions.map((position, index) => (
                    <option key={index} value={position}>{position}</option>
                  ))}
                </select>
              </div>

              <div className="mb-2">
                <label className="form-label fw-semibold">Department</label>
                <select
                name="departmentName"
                value={employeeData.departmentName}
                onChange={handleChange}
                className="form-select form-select-lg"
                required
              >
                <option value="">Select Department</option>
                {Array.isArray(departments) &&
                  departments.map((department, index) => (
                    <option key={index} value={department?.name || department}>
                  {department?.name || department}
                </option>
                  ))}
              </select>
              </div>
              <div className="mb-2">
                <label className="form-label fw-semibold">Role</label>
                <select name="roleName" value={employeeData.roleName} onChange={handleChange} className="form-select form-select-lg" required>
                  <option value="">Select Roles</option>
                  {roles.map((role, index) => (
                    <option key={index} value={role}>{role}</option>
                  ))}
                </select>
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
          </div>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-center mt-4">
          <button type="submit" className="btn btn-primary btn-lg me-2">
            {editingEmployee ? "Update Employee" : "Register Employee"}
          </button>
          <button type="button" className="btn btn-secondary btn-lg" onClick={onCancel}>
            Cancel
          </button>
        </div>

        </form>
      </div>
    </div>
  );
}

export default RegisterEmployee;
