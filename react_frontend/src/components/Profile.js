import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import profileController from "../Controller/profileController";
import ResetPasswordModal from "./common/ResetPasswordModal"; // Importing the reusable modal component

const EmpProfile = () => {
  const initialDetails = {
    name: "",
    email: "",
    position: "",
    department: "",
    role: "",
    id: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    phone: "",
    address: "",
    education: "",
    workExp: "",
    joinDate: "",
    roleId: "",
    positionID: "",
    departmentId: "",
  };

  const [details, setDetails] = useState(initialDetails);
  const [originalDetails, setOriginalDetails] = useState(initialDetails);
  const [isEditing, setIsEditing] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const parts = dateString.split("-");
    if (parts.length === 3) {
      if (parts[2].length === 4) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
      return dateString;
    }
    return dateString;
  };

  const [departments, setDepartments] = useState([]);
  const [positions, setPositions] = useState([]);
  const [roles, setRoles] = useState([]);
  const genders = ["Male", "Female", "Other"];

  const [selectedPositionId, setSelectedPositionId] = useState(details.positionId);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(details.departmentId);
  const [selectedRoleId, setSelectedRoleId] = useState(details.roleId);

  const [selectedGender, setSelectedGender] = useState("");

  useEffect(() => {
    setSelectedPositionId(details.positionId);
    setSelectedDepartmentId(details.departmentId);
    setSelectedRoleId(details.roleId);
  }, [details]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileController.fetchEmpProfile();
        if (data.statusCode === 200) {
          const employeeProfile = data.employeeProfile;
          setDetails({
            id: employeeProfile.id,
            name: employeeProfile.name,
            dob: formatDate(employeeProfile.dob),
            email: employeeProfile.email,
            phone: employeeProfile.phone,
            gender: employeeProfile.gender,
            department: employeeProfile.departmentName,
            position: employeeProfile.positionName,
            role: employeeProfile.roleName,
            address: employeeProfile.address,
            maritalStatus: employeeProfile.maritalStatus,
            education: employeeProfile.education,
            workExp: employeeProfile.workExp,
            joinDate: employeeProfile.joinDate,
          });
          setOriginalDetails(employeeProfile);
          setSelectedDepartmentId(employeeProfile.departmentId);
          setSelectedPositionId(employeeProfile.positionId);
          setSelectedRoleId(employeeProfile.roleId);
          setSelectedGender(employeeProfile.gender);
        } else {
          console.error("Error fetching profile:", data.message);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await profileController.fetchDepartments();
        setDepartments(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Error fetching departments:", error);
        setDepartments([]);
      }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await profileController.fetchPositions();
        setPositions(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Error fetching positions:", error);
        setPositions([]);
      }
    };
    fetchPositions();
  }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await profileController.fetchRoles();
        setRoles(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Error fetching roles:", error);
        setRoles([]);
      }
    };
    fetchRoles();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handlePositionChange = (e) => setSelectedPositionId(e.target.value);
  const handleDepartmentChange = (e) => setSelectedDepartmentId(e.target.value);
  const handleRoleChange = (e) => setSelectedRoleId(e.target.value);

  const handleGenderChange = (e) => {
    const selectedGender = e.target.value;
    setSelectedGender(selectedGender);
    setDetails((prevDetails) => ({ ...prevDetails, gender: selectedGender }));
  };

  const handleSaveChanges = async () => {
    const updatedProfile = {
      ...details,
      positionId: selectedPositionId,
      departmentId: selectedDepartmentId,
      roleId: selectedRoleId,
    };

    try {
      const response = await profileController.updateProfile(updatedProfile);
      if (response.statusCode === 200) {
        alert("Profile updated successfully!");
        setIsEditing(false);
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    // Reset selected values to original details when canceling editing
    setSelectedPositionId(originalDetails.positionId);
    setSelectedDepartmentId(originalDetails.departmentId);
    setSelectedRoleId(originalDetails.roleId);
    setSelectedGender(originalDetails.gender);
    setDetails(originalDetails); // Restore original details
  };

  const handleResetPassword = async (newPassword) => {
    // Reset password logic here
    alert("Password reset successfully!");
    setShowResetPasswordModal(false);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Employee Profile</h2>
        <form>
          <div className="row">
            {/* Full Name */}
            <div className="col-md-6 mb-4">
              <label className="form-label fw-bold">Full Name</label>
              <input
                type="text"
                name="name"
                value={details.name}
                onChange={handleInputChange}
                className="form-control"
                disabled={!isEditing}
              />
            </div>

            {/* Email */}
            <div className="col-md-6 mb-4">
              <label className="form-label fw-bold">Email</label>
              <input
                type="email"
                name="email"
                value={details.email}
                onChange={handleInputChange}
                className="form-control"
                disabled
              />
            </div>

            {/* Date of Birth */}
            <div className="col-md-6 mb-4">
              <label className="form-label fw-bold">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={details.dob}
                onChange={handleInputChange}
                className="form-control"
                disabled={!isEditing}
              />
            </div>

            {/* Phone */}
            <div className="col-md-6 mb-4">
              <label className="form-label fw-bold">Phone</label>
              <input
                type="text"
                name="phone"
                value={details.phone}
                onChange={handleInputChange}
                className="form-control"
                disabled={!isEditing}
              />
            </div>

            {/* Gender */}
            <div className="col-md-6 mb-4">
              <label className="form-label fw-bold">Gender</label>
              {!isEditing ? (
                <input
                  type="text"
                  value={details.gender}
                  className="form-control"
                  disabled
                />
              ) : (
                <select
                  value={selectedGender}
                  onChange={handleGenderChange}
                  className="form-control"
                  required
                >
                  <option value="">-- Select Gender --</option>
                  {genders.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Address */}
            <div className="col-md-6 mb-4">
              <label className="form-label fw-bold">Address</label>
              <input
                type="text"
                name="address"
                value={details.address}
                onChange={handleInputChange}
                className="form-control"
                disabled={!isEditing}
              />
            </div>

            {/* Marital Status */}
            <div className="col-md-6 mb-4">
              <label className="form-label fw-bold">Marital Status</label>
              {!isEditing ? (
                <input
                  type="text"
                  value={details.maritalStatus}
                  className="form-control"
                  disabled
                />
              ) : (
                <select
                  name="maritalStatus"
                  value={details.maritalStatus}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                >
                  <option value="">-- Select Marital Status --</option>
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                </select>
              )}
            </div>

            {/* Education */}
            <div className="col-md-6 mb-4">
              <label className="form-label fw-bold">Education</label>
              <input
                type="text"
                name="education"
                value={details.education}
                onChange={handleInputChange}
                className="form-control"
                disabled={!isEditing}
              />
            </div>

            {/* Work Experience */}
            <div className="col-md-6 mb-4">
              <label className="form-label fw-bold">Work Experience</label>
              <input
                type="text"
                name="workExp"
                value={details.workExp}
                onChange={handleInputChange}
                className="form-control"
                disabled={!isEditing}
              />
            </div>

            {/* Position */}
            <div className="col-md-6 mb-4">
              <label className="form-label fw-bold">Position</label>
              {!isEditing ? (
                <input
                  type="text"
                  value={details.position}
                  className="form-control"
                  disabled
                />
              ) : (
                <select
                  value={selectedPositionId}
                  onChange={handlePositionChange}
                  className="form-control"
                  required
                >
                  <option value="">-- Select Position --</option>
                  {positions.length > 0 ? (
                    positions.map((pos) => (
                      <option key={pos.id} value={pos.id}>
                        {pos.positionName}
                      </option>
                    ))
                  ) : (
                    <option disabled>Loading...</option>
                  )}
                </select>
              )}
            </div>

            {/* Department */}
            <div className="col-md-6 mb-4">
              <label className="form-label fw-bold">Department</label>
              {!isEditing ? (
                <input
                  type="text"
                  value={details.department}
                  className="form-control"
                  disabled
                />
              ) : (
                <select
                  value={selectedDepartmentId}
                  onChange={handleDepartmentChange}
                  className="form-control"
                  required
                >
                  <option value="">-- Select Department --</option>
                  {departments.length > 0 ? (
                    departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.departmentName}
                      </option>
                    ))
                  ) : (
                    <option disabled>Loading...</option>
                  )}
                </select>
              )}
            </div>

            {/* Role */}
            <div className="col-md-6 mb-4">
              <label className="form-label fw-bold">Role</label>
              {!isEditing ? (
                <input
                  type="text"
                  value={details.role}
                  className="form-control"
                  disabled
                />
              ) : (
                <select
                  value={selectedRoleId}
                  onChange={handleRoleChange}
                  className="form-control"
                  required
                >
                  <option value="">-- Select Role --</option>
                  {roles.length > 0 ? (
                    roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.roleName}
                      </option>
                    ))
                  ) : (
                    <option disabled>Loading...</option>
                  )}
                </select>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsEditing(true)}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>

            {isEditing && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleCancelEditing}
              >
                Cancel
              </button>
            )}

           {/* Show Reset Password Link only when not editing */}
           {!isEditing && (
                <a
                  href="#!"
                  onClick={() => setShowResetPasswordModal(true)}
                  className="btn btn-link mt-3"
                >
                  Reset Password
                </a>
              )}
          </div>
        </form>
      </div>

      {/* Reset Password Modal */}
      <ResetPasswordModal
        show={showResetPasswordModal}
        onClose={() => setShowResetPasswordModal(false)}
        onSubmit={handleResetPassword}
      />
    </div>
  );
};

export default EmpProfile;
