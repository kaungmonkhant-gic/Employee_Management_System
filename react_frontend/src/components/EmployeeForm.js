import React, { useState, useEffect } from "react";
import EmployeeModel from "../models/EmployeeModel.js";
import nrcData from "../Data/nrc.json";
//import FormControlField from "./common/FormControlField";
import employeeController from "../Controller/employeeController";

import { Container, Card, Form, Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap';
function EmployeeForm({ onSubmit, onCancel, editingEmployee, headerText }) {

  // State to store the list of departments fetched from the API
  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [roles, setRoles] = useState([]);

  // State to track the selected department ID
  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");
  const [selectedPositionId, setSelectedPositionId] = useState("");
  const [selectedRoleId, setSelectedRoleId] = useState("");

  const [employeeData, setEmployeeData] = useState(EmployeeModel);

  const FormControlField = ({ label, name, type = "text", value, onChange, options, placeholder, required = false }, style) => (
    <Form.Group className="mb-3">
      <Form.Label className="fw-semibold">{label}</Form.Label>
      {type === "select" ? (
        <Form.Control as="select" name={name} value={value} onChange={onChange} className="form-select-lg" required={required} style={style}>
          <option value="">Select {label}</option>
          {options && options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Control>
      ) : (
        <Form.Control
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="form-control-lg"
          required={required}
        />
      )}
    </Form.Group>
  );
  

  useEffect(() => {
    if (editingEmployee) {
      setEmployeeData(prevState => ({
        ...prevState, // Preserve default state structure
        ...editingEmployee // Override with editingEmployee values
      }));
    }
  }, [editingEmployee]);

  useEffect(() => {
    if (editingEmployee) {
      setEmployeeData(editingEmployee);
    }
  }, [editingEmployee]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data in parallel
        const [departmentsResponse, positionsResponse, rolesResponse] = await Promise.all([
          employeeController.fetchDepartments(),
          employeeController.fetchPositions(),
          employeeController.fetchRoles(),
        ]);
  
        // Ensure responses are arrays before setting state
        setDepartments(Array.isArray(departmentsResponse) ? departmentsResponse : []);
        setPositions(Array.isArray(positionsResponse) ? positionsResponse : []);
        setRoles(Array.isArray(rolesResponse) ? rolesResponse : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setDepartments([]);
        setPositions([]);
        setRoles([]);
      }
    };
  
    fetchData();
  }, []);
  
  // Set selected department id when department name changes
  useEffect(() => {
    if (employeeData.departmentName) {
      const dept = departments.find(dept => dept.departmentName === employeeData.departmentName);
      if (dept) {
        setSelectedDepartmentId(dept.id);
        console.log("Selected dept ID:", dept.id);
      }
      console.log("Selected Department ID:", selectedDepartmentId);
    }
  }, [departments, employeeData.departmentName]);

  useEffect(() => {
    console.log("Updated Selected Department ID:", selectedDepartmentId);
  }, [selectedDepartmentId]);

// Generic handle change function
const handleChange = (e) => {
  const { name, value } = e.target;
  
  // Check for specific fields (department, position, role)
  if (name === "departmentId") {
    setSelectedDepartmentId(value);
    console.log("Selected Department ID:", value);
  } else if (name === "positionId") {
    setSelectedPositionId(value);
    console.log("Selected Position ID:", value);
  } else if (name === "roleId") {
    setSelectedRoleId(value);
    console.log("Selected Role ID:", value);
  }

  // Update NRC field dynamically
  if (["nrcRegion", "nrcTownship", "nrcType", "nrcDetails"].includes(name)) {
    setEmployeeData((employeeData) => ({
      ...employeeData,
      nrc: `${employeeData.nrcRegion || ""}${employeeData.nrcTownship || ""}${employeeData.nrcType || ""}${employeeData.nrcDetails || ""}`,
      [e.target.name]: e.target.value
    }));
  } else {
    // Update other fields
    setEmployeeData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

};

useEffect(() => {
  console.log("Updated Employee Data after NRC update:", employeeData);
}, [employeeData]); 


  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    onSubmit(employeeData);
    try {
      console.log("Registering Employee:", employeeData);
      const result = await employeeController.registerEmployee(employeeData);
      console.log("Employee registered successfully:", result);

    } catch (error) {
      console.error("Failed to register employee:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Card
        className="shadow-lg p-4 rounded-4 custom-card"
        style={{
          maxWidth: '900px',
          width: '100%',
          border: '1px solid #e0e0e0',
          background: 'linear-gradient(to right, #f9f9f9, #ffffff)',
        }}
      >
        {/* Header */}
        <Card.Header
          className="bg-secondary text-white text-center rounded-3"
          style={{
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            fontWeight: 'bold',
            fontSize: '1.25rem',
          }}
        >
          <h3 className="m-0">{headerText}</h3>
        </Card.Header>
  
        {/* Form */}
        <Form onSubmit={handleSubmit} className="mt-3">
  
          {/* First Row */}
          <Row className="g-3">
            {/* Personal Information */}
            <Col md={6}>
              <h5 className="fw-bold text-secondary">Personal Information</h5>
              <hr />
              
              {/* <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={employeeData.name}
                  onChange={handleChange}
                  required
                  className="form-control-lg"
                />
              </Form.Group> */}

              <FormControlField
                label="Full Name"
                name="name"
                value={employeeData.name}
                onChange={handleChange}
                required
              />
  
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={employeeData.email}
                  onChange={handleChange}
                  required
                  className="form-control-lg"
                />
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={employeeData.dob}
                  onChange={handleChange}
                  required
                  className="form-control-lg"
                />
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={employeeData.gender}
                  onChange={handleChange}
                  className="form-control-lg"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Control>
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Phone</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={employeeData.phone}
                  onChange={handleChange}
                  className="form-control-lg"
                />
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">NRC</Form.Label>
                <div className="d-flex gap-2">
                  {/* <Form.Control
                    as="select"
                    name="nrcRegion"
                    value={employeeData.nrcRegion}
                    onChange={handleChange}
                    className="form-select-lg"
                    style={{ flex: 1 }}
                    required
                  >
                    <option value="">Region</option>
                    {[...new Set(nrcData.data.map(item => item.nrc_code))].map((code, index) => (
                      <option key={index} value={code}>{code}</option>
                    ))}
                  </Form.Control> */}

                  <FormControlField
                    style={{ flex: 1 }}
                    label="Region"
                    name="nrcRegion"
                    type="select"
                    value={employeeData.nrcRegion}
                    onChange={handleChange}
                    options={[...new Set(nrcData.data.map(item => item.nrc_code))].map(code => ({ value: code, label: code }))}
                  />

                  
                  {/* <Form.Control
                    as="select"
                    name="nrcTownship"
                    value={employeeData.nrcTownship}
                    onChange={handleChange}
                    className="form-select-lg"
                    style={{ flex: 2 }}
                    required
                  >
                    <option value="">Township</option>
                    {nrcData.data
                      .filter(item => item.nrc_code === employeeData.nrcRegion)
                      .map((item, index) => (
                        <option key={index} value={item.name_mm}>
                          {item.name_en} ({item.name_mm})
                        </option>
                      ))}
                  </Form.Control> */}

                  <FormControlField
                    style={{ flex: 2 }}
                    label="Township"
                    name="nrcTownship"
                    type="select"
                    value={employeeData.nrcRegion}
                    onChange={handleChange}
                    options={[...new Set(nrcData.data.filter(item => item.nrc_code === employeeData.nrcRegion))].map((item, index) => (
                      { value: item.name_mm, label: `${item.name_en} (${item.name_mm})` }
                    ))}
                  />
                  
                  <Form.Control
                    as="select"
                    name="nrcType"
                    value={employeeData.nrcType}
                    onChange={handleChange}
                    className="form-select-lg"
                    style={{ flex: 1 }}
                    required
                  >
                    <option value="">(N/T/S)</option>
                    <option value="(N)">(N)</option>
                    <option value="(T)">(T)</option>
                    <option value="(S)">(S)</option>
                  </Form.Control>
                  
                  <Form.Control
                    type="text"
                    name="nrcDetails"
                    value={employeeData.nrcDetails}
                    onChange={handleChange}
                    placeholder="Details"
                    style={{ flex: 2 }}
                    className="form-control-lg"
                    required
                  />
                </div>
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Marital Status</Form.Label>
                <Form.Control
                  as="select"
                  name="maritalStatus"
                  value={employeeData.maritalStatus}
                  onChange={handleChange}
                  className="form-control-lg"
                >
                  <option value="">Select Marital Status</option>
                  <option value="Married">Married</option>
                  <option value="Single">Single</option>
                  <option value="Divorced">Divorced</option>
                </Form.Control>
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Address</Form.Label>
                <Form.Control
                  as="textarea"
                  name="address"
                  value={employeeData.address}
                  onChange={handleChange}
                  className="form-control-lg"
                  style={{ height: '150px' }}
                />
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Education</Form.Label>
                <Form.Control
                  type="text"
                  name="education"
                  value={employeeData.education}
                  onChange={handleChange}
                  className="form-control-lg"
                />
              </Form.Group>
  
            </Col>
  
            {/* Job Details */}
            <Col md={6}>
              <h5 className="fw-bold text-secondary">Job Details</h5>
              <hr />
  
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Position</Form.Label>
                <Form.Control
                  as="select"
                  name="positionId"
                  value={selectedPositionId}
                  onChange={handleChange}
                  className="form-select-lg"
                  required
                >
                  <option value="">-- Select Position --</option>
                  {Array.isArray(positions) && positions.length > 0 ? (
                    positions.map((pos) => (
                      <option key={pos.id} value={pos.id}>{pos.positionName}</option>
                    ))
                  ) : (
                    <option disabled>Loading...</option>
                  )}
                </Form.Control>
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Department</Form.Label>
                <Form.Control
                  as="select"
                  name="departmentId"
                  value={selectedDepartmentId}
                  onChange={handleChange}
                  className="form-select-lg"
                  required
                >
                  <option value="">-- Select Department --</option>
                  {departments.length > 0 ? (
                    departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>{dept.departmentName}</option>
                    ))
                  ) : (
                    <option disabled>Loading...</option>
                  )}
                </Form.Control>
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Role</Form.Label>
                <Form.Control
                  as="select"
                  name="roleId"
                  value={selectedRoleId}
                  onChange={handleChange}
                  className="form-select-lg"
                  required
                >
                  <option value="">-- Select Role --</option>
                  {Array.isArray(roles) && roles.length > 0 ? (
                    roles.map((role) => (
                      <option key={role.id} value={role.id}>{role.roleName}</option>
                    ))
                  ) : (
                    <option disabled>Loading...</option>
                  )}
                </Form.Control>
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Work Experience</Form.Label>
                <Form.Control
                  type="text"
                  name="workExp"
                  value={employeeData.workExp}
                  onChange={handleChange}
                  placeholder="Work Experience..."
                  className="form-control-lg"
                />
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Join Date</Form.Label>
                <Form.Control
                  type="date"
                  name="joinDate"
                  value={employeeData.joinDate}
                  onChange={handleChange}
                  required
                  className="form-control-lg"
                />
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Resign Date</Form.Label>
                <Form.Control
                  type="date"
                  name="resignDate"
                  value={employeeData.resignDate}
                  onChange={handleChange}
                  className="form-control-lg"
                />
              </Form.Group>
  
              {!editingEmployee && (
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Password</Form.Label>
                  <Form.Control
                    type="text"
                    name="password"
                    value={employeeData.password}
                    onChange={handleChange}
                    placeholder="Password..."
                    className="form-control-lg"
                  />
                </Form.Group>
              )}
  
            </Col>
          </Row>
  
          {/* Buttons */}
          <div className="d-flex justify-content-center mt-4">
            <Button type="submit" variant="primary" className="me-2">
              {editingEmployee ? "Update Employee" : "Register Employee"}
            </Button>
            <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
          </div>
        </Form>
      </Card>
    </div>
  );
  
}
export default EmployeeForm;