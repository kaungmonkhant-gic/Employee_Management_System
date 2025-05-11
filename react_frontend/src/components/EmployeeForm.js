import React, { useState, useEffect } from "react";
import EmployeeModel from "../models/EmployeeModel.js";
import nrcData from "../Data/nrc.json";
import employeeController from "../Controller/employeeController";
import { Card, Form, Row, Col, Button} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const [errors, setErrors] = useState({});


  // const FormControlField = ({ label, name, type = "text", value, onChange, options, placeholder, required = false }, style) => (
  //   <Form.Group className="mb-3">
  //     <Form.Label className="fw-semibold">{label}</Form.Label>
  //     {type === "select" ? (
  //       <Form.Control as="select" name={name} value={value} onChange={onChange} className="form-select-lg" required={required} style={style}>
  //         <option value=""> {label}</option>
  //         {options && options.map((option, index) => (
  //           <option key={index} value={option.value}>
  //             {option.label}
  //           </option>
  //         ))}
  //       </Form.Control>
  //     ) : (
  //       <Form.Control
  //         type={type}
  //         name={name}
  //         value={value}
  //         onChange={onChange}
  //         placeholder={placeholder}
  //         className="form-control-lg"
  //         required={required}
  //       />
  //     )}
  //   </Form.Group>
  // );
  
  useEffect(() => {
    if (editingEmployee) {
      // Parse NRC
      const { nrc } = editingEmployee;
      const nrcParts = nrc ? nrc.match(/^(\d+)\(([^)]+)\)\s([^\(]+)\(([^)]+)\)(\d+)$/) : null;
  
      // Set all employee data, parsed joinDate/dob and NRC details
      setEmployeeData({
        ...EmployeeModel, // ensure defaults are preserved
        ...editingEmployee,
        joinDate: editingEmployee.joinDate ? new Date(editingEmployee.joinDate).toISOString().split("T")[0] : "",
        dob: editingEmployee.dob ? new Date(editingEmployee.dob).toISOString().split("T")[0] : "",
        nrcRegion: nrcParts?.[1] || "",
        nrcTownship: "", // intentionally left empty
        nrcType: nrcParts?.[3] || "",
        nrcDetails: nrcParts?.[4] || "",
      });
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
  
 // Update selected IDs when department, position, or role name changes
useEffect(() => {
  const dept = departments.find(d => d.departmentName === employeeData.departmentName);
  const pos = positions.find(p => p.positionName === employeeData.positionName);
  const rol = roles.find(r => r.roleName === employeeData.roleName);

  if (dept) setSelectedDepartmentId(dept.id);
  if (pos) setSelectedPositionId(pos.id);
  if (rol) setSelectedRoleId(rol.id);
}, [departments, positions, roles, employeeData.departmentName, employeeData.positionName, employeeData.roleName]);

// Log updated IDs when they change
useEffect(() => console.log("Updated Selected Department ID:", selectedDepartmentId), [selectedDepartmentId]);
useEffect(() => console.log("Updated Selected Position ID:", selectedPositionId), [selectedPositionId]);
useEffect(() => console.log("Updated Selected Role ID:", selectedRoleId), [selectedRoleId]);

  // For join Date show in editing
  useEffect(() => {
    if (editingEmployee) {
      console.log("Editing Employee Data:", editingEmployee);
  
      // Extract NRC from editingEmployee
      const { nrc } = editingEmployee || "";
      console.log("Original NRC from editingEmployee:", nrc);
  
      // Updated regex to match NRC, excluding the township part
      const nrcParts = nrc ? nrc.match(/^(\d+)\(([^)]+)\)\s([^\(]+)\(([^)]+)\)(\d+)$/) : null;
  
      if (nrcParts) {
        console.log("Parsed NRC Parts:", nrcParts);
      } else {
        console.log("No NRC match found, using empty values.");
      }
  
      // Update state with NRC data, excluding the third part (nrcTownship)
      setEmployeeData(prevState => ({
        ...prevState,
        joinDate: editingEmployee.joinDate ? new Date(editingEmployee.joinDate).toISOString().split("T")[0] : "",
        dob: editingEmployee.dob ? new Date(editingEmployee.dob).toISOString().split("T")[0] : "",
        nrcRegion: nrcParts?.[1] || "",
        nrcTownship: "", // Leave it empty to exclude the township part
        nrcType: nrcParts?.[3] || "", // Use the fourth part for nrcType
        nrcDetails: nrcParts?.[4] || "", // Use the fifth part for nrcDetails
      }));
    }
  }, [editingEmployee]);
  
  
  // const get18YearsAgoDate = () => {
  //   const today = new Date();
  //   today.setFullYear(today.getFullYear() - 18);
  //   return today.toISOString().split("T")[0]; // format as 'YYYY-MM-DD'
  // };
  
  
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

  // Validation logic
  if (name === "joinDate") {
    const today = new Date();
    const selectedDate = new Date(value);
    const dob = new Date(employeeData.dateOfBirth); // assuming dateOfBirth exists
    let joinDateError = "";

    if (selectedDate > today) {
      joinDateError = "Join date cannot be in the future.";
    } else {
      const minJoinDate = new Date(dob);
      minJoinDate.setFullYear(minJoinDate.getFullYear() + 18);

      if (selectedDate < minJoinDate) {
        joinDateError = `Employee must be at least 18 on join date (after ${minJoinDate.toISOString().split("T")[0]}).`;
      }
    }

    setErrors(prev => ({ ...prev, joinDate: joinDateError }));
  }

  setEmployeeData(prevState => {
    const updatedData = { ...prevState, [name]: value };

    // Update NRC dynamically when any NRC field changes
    if (["nrcRegion", "nrcTownship", "nrcType", "nrcDetails"].includes(name)) {
      updatedData.nrc = `${updatedData.nrcRegion || ""}/${updatedData.nrcTownship || ""}${updatedData.nrcType || ""}${updatedData.nrcDetails || ""}`;
 }

    return updatedData;
  });
};


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
              
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={employeeData.name}
                  onChange={handleChange}
                  required
                  className="form-control-lg"
                  placeholder="Enter full name"
                />
              </Form.Group>

              <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={employeeData.email}
                onChange={handleChange}
                required
                className="form-control-lg"
                placeholder="Enter email address"
                title="Please enter a valid email address"
              />
            </Form.Group>

              <Form.Group className="mb-3 w-100">
  <Form.Label className="fw-semibold">Date of Birth</Form.Label>
  <div style={{ width: '100%' }}>
    <DatePicker
      selected={employeeData.dob ? new Date(employeeData.dob) : null}
      onChange={(date) => {
        handleChange({
          target: {
            name: "dob",
            value: date.toISOString().split("T")[0],
          },
        });
      }}
      minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 40))} // Max age: 30 years
      maxDate={new Date(new Date().setFullYear(new Date().getFullYear() - 18))} // Min age: 18 years
      placeholderText="Select date of birth"
      dateFormat="yyyy-MM-dd"
      showYearDropdown
      scrollableYearDropdown
      name="dob"
      required
      className="form-control form-control-lg"
    />
  </div>
</Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Gender</Form.Label>
                <Form.Control
                  as="select"
                  name="gender"
                  value={employeeData.gender}
                  onChange={handleChange}
                  required
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
                required
                className="form-control-lg"
                placeholder="Enter phone number"
                pattern="^0[1-9]\d{7,9}$"
                title="Enter a valid Myanmar phone number (starts with 0, 9–11 digits total)"
              />

              </Form.Group>
  
              <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">NRC</Form.Label>
            <div className="d-flex gap-2">
              {/* Region */}
              <Form.Control
                as="select"
                name="nrcRegion"
                value={employeeData.nrcRegion}
                onChange={handleChange}
                className="form-control-lg"
                style={{ flex: 1 }}
                required
              >
                <option value="">Region</option>
                {[...new Set(nrcData.data.map(item => item.nrc_code))].map((code, index) => (
                  <option key={index} value={code}>{code}</option>
                ))}
              </Form.Control>

              {/* Township */}
              <Form.Control
                as="select"
                name="nrcTownship"
                value={employeeData.nrcTownship}
                onChange={handleChange}
                className="form-control-lg"
                style={{ flex: 2 }}
                required
              >
                <option value="">Township</option>
                {[...new Set(nrcData.data.filter(item => item.nrc_code === employeeData.nrcRegion))].map((item, index) => (
                  <option key={index} value={item.name_en}>
                    {item.name_en}
                  </option>
                ))}
              </Form.Control>

              {/* Type */}
              <Form.Control
                as="select"
                name="nrcType"
                value={employeeData.nrcType}
                onChange={handleChange}
                className="form-control-lg"
                style={{ flex: 1 }}
                required
              >
                <option value="">(N/T/S)</option>
                <option value="(N)">(N)</option>
                <option value="(T)">(T)</option>
                <option value="(S)">(S)</option>
              </Form.Control>

              {/* Details */}
              <Form.Control
                type="text"
                name="nrcDetails"
                value={employeeData.nrcDetails}
                onChange={handleChange}
                className="form-control-lg"
                placeholder="Details"
                style={{ flex: 2 }}
                maxLength="6"
                pattern="\d{6}"
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
                  required
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
                  required
                  style={{ height: '150px' }}
                  placeholder="Enter full address"
                />
              </Form.Group>
  
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Education</Form.Label>
                <Form.Control
                  type="text"
                  name="education"
                  value={employeeData.education}
                  onChange={handleChange}
                  required
                  className="form-control-lg"
                  placeholder="Enter Education level"
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
                  name="positionName"
                  value={employeeData.positionName}
                  onChange={handleChange}
                  className="form-select-lg"
                  required
                >
                  <option value="">-- Select Position --</option>
                  {Array.isArray(positions) && positions.length > 0 ? (
                    positions.map((pos) => (
                      <option key={pos.id} value={pos.positionName}>{pos.positionName}</option>
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
                    name="departmentName"
                    value={employeeData.departmentName}
                    onChange={handleChange}
                    className="form-select-lg"
                    required
                  >
                    <option value="">-- Select Department --</option>
                    {departments.length > 0 ? (
                      departments.map((dept) => (
                        <option key={dept.id} value={dept.departmentName}>{dept.departmentName}</option>
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
  <div style={{ width: '100%' }}>
  <DatePicker
    selected={employeeData.joinDate ? new Date(employeeData.joinDate) : null}
    onChange={(date) => {
      handleChange({
        target: {
          name: "joinDate",
          value: date.toISOString().split("T")[0]
        }
      });
    }}
    minDate={
      employeeData.dateOfBirth
        ? new Date(
            new Date(employeeData.dateOfBirth).setFullYear(
              new Date(employeeData.dateOfBirth).getFullYear() + 18
            )
          )
        : null
    }
    maxDate={new Date()}
    placeholderText="Select join date"
    dateFormat="yyyy-MM-dd"
    showYearDropdown
    scrollableYearDropdown
    className={`form-control form-control-lg ${
      errors.joinDate ? "is-invalid" : ""
    }`}
  />
  {errors.joinDate && (
    <div className="invalid-feedback">{errors.joinDate}</div>
  )}
  </div>
</Form.Group>



  
              {/* <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Resign Date</Form.Label>
                <Form.Control
                  type="date"
                  name="resignDate"
                  value={employeeData.resignDate}
                  onChange={handleChange}
                  className="form-control-lg"
                />
              </Form.Group> */}
  
              {!editingEmployee && (
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Password</Form.Label>
                  <Form.Control
                    type="password"
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