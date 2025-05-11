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
    positionId: "",
    departmentId: "",
  };

  const [details, setDetails] = useState(initialDetails);
  const [originalDetails, setOriginalDetails] = useState(initialDetails);
  const [isEditing, setIsEditing] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(''); // success or error
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
  const [selectedPositionId, setSelectedPositionId] = useState(details.positionID);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(details.departmentId);
  const [selectedRoleId, setSelectedRoleId] = useState(details.roleId);

  const [selectedGender, setSelectedGender] = useState("");

  useEffect(() => {
    setSelectedPositionId(details.positionID);
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
  
          // ✅ Ensure selected state values are set
          setSelectedDepartmentId(employeeProfile.departmentId || "");
          setSelectedPositionId(employeeProfile.positionId || "");
          setSelectedRoleId(employeeProfile.roleId || "");
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

  //Show position in editing
  useEffect(() => {
      if (originalDetails.positionName) {
        const pos = positions.find(pos => pos.positionName === originalDetails.positionName);
        if (pos) {
          setSelectedPositionId(pos.id);
          console.log("Selected pos ID:", pos.id);
        }
        console.log("Selected position ID:", selectedPositionId);
      }
    }, [positions, originalDetails.positionName]);
  
    // useEffect(() => {
    //   console.log("Updated Selected Position ID:", selectedPositionId);
    // }, [selectedPositionId]);

    //show department in editing]
 useEffect(() => {
    if (originalDetails.departmentName) {
      const dept = departments.find(dept => dept.departmentName === originalDetails.departmentName);
      if (dept) {
        setSelectedDepartmentId(dept.id);
        console.log("Selected dept ID:", dept.id);
      }
      console.log("Selected Department ID:", selectedDepartmentId);
    }
  }, [departments, originalDetails.departmentName]);

  // useEffect(() => {
  //   console.log("Updated Selected Department ID:", selectedDepartmentId);
  // }, [selectedDepartmentId]);

  //show role in edit
   useEffect(() => {
      if (originalDetails.roleName) {
        const rol = roles.find(rol => rol.roleName === originalDetails.roleName);
        if (rol) {
          setSelectedRoleId(rol.id);
          console.log("Selected role ID:", rol.id);
        }
        console.log("Selected role ID:", selectedRoleId);
      }
    }, [roles, originalDetails.roleName]);
  
    // useEffect(() => {
    //   console.log("Updated Selected Role ID:", selectedRoleId);
    // }, [selectedRoleId]);


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
        // Update displayed details
        setDetails({
          ...details,
          position: positions.find(pos => pos.id === selectedPositionId)?.positionName || "",
          department: departments.find(dept => dept.id === selectedDepartmentId)?.departmentName || "",
          role: roles.find(role => role.id === selectedRoleId)?.roleName || "",
        });
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
    setSelectedPositionId(originalDetails.positionId);
    setSelectedDepartmentId(originalDetails.departmentId);
    setSelectedRoleId(originalDetails.roleId);
    setDetails(originalDetails); // Restore original details
  };
  

  const handleResetPassword = async (currentPassword, newPassword, confirmPassword) => {
    console.log("handleResetPassword called with:", { currentPassword, newPassword, confirmPassword });
  
    // Reset previous message
    setMessage('');
    setMessageType('');
  
    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("All fields are required!");
      setMessageType('error');
      return;
    }
  
    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password must match.");
      setMessageType('error');
      return;
    }
  
    try {
      // Assuming `profileController.updatePassword` is a function that calls your API.
      const response = await profileController.updatePassword(currentPassword, newPassword, confirmPassword);
  
      // Check for current password error
      if (response.statusCode === 400 && response.message === "Current password is incorrect") {
        setMessage("Current password is incorrect.");
        setMessageType('error');
        return;
      }
  
      if (response.statusCode === 200) {
  setMessage("Password reset successfully.");
  setMessageType("success");

  // Optional: short delay to show message
  setTimeout(() => {
    // Clear auth tokens or session
    localStorage.removeItem("authToken"); // or sessionStorage.removeItem("authToken")
    // Redirect to login page
    window.location.href = "/login"; // Update this route to match your login page route
  }, 1500);
  
  setShowResetPasswordModal(false);
}
 else {
        setMessage(response.message || "Failed to reset password.");
        setMessageType('error');
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage("Error resetting password. Please try again.");
      setMessageType('error');
    }
  };
  
  

  return (
    <div className="container mt-4">
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

             {/* Marital Status */}
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
                  name="gender"
                  value={details.gender}
                  onChange={handleInputChange}
                  className="form-control"
                  required
                >
                  <option value="">-- Select Gneder --</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  
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
                <input
                  type="text"
                  value={details.position}
                  className="form-control"
                  disabled
                />
            </div>


            {/* Department */}
         <div className="col-md-6 mb-4">
              <label className="form-label fw-bold">Department</label>
              <input
                type="text"
                value={details.department}
                className="form-control"
                disabled
              />
            </div>

            {/* Role */}
            <div className="col-md-6 mb-4">
              <label className="form-label fw-bold">Role</label>
                <input
                  type="text"
                  value={details.role}
                  className="form-control"
                  disabled
                />
            </div>
          </div>

          {/* Action Buttons */}
<div className="d-flex justify-content-between">
  <button
    type="button"
    className="btn btn-primary"
    onClick={() => {
      if (isEditing) {
        handleSaveChanges(); // Call the save function when editing
      } else {
        setIsEditing(true); // Enable editing mode
      }
    }}
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
       {showResetPasswordModal && (
       <ResetPasswordModal
       show={showResetPasswordModal}
       onClose={() => setShowResetPasswordModal(false)}
       onSubmit={handleResetPassword} // ✅ Ensure function is passed
     />      
      )}

{message && (
        <div className={`message ${messageType}`}>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default EmpProfile;