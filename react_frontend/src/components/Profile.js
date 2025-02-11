import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import profileController from "../Controller/profileController";

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
  };

  const [details, setDetails] = useState(initialDetails);
  const [isEditing, setIsEditing] = useState(false);

  const departments = ["HR", "Engineering", "Marketing", "Sales", "Finance"];
  const positions = [
    "Intern",
    "Junior Developer",
    "Senior Developer",
    "Manager",
    "Director",
  ];
  const genders = ["Male", "Female", "Other"];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileController.fetchEmpProfile();
        if (data.statusCode === 200) {
          setDetails({
            id: data.employeeProfile.id,
            name: data.employeeProfile.name,
            dob: data.employeeProfile.dob,
            email: data.employeeProfile.email,
            phone: data.employeeProfile.phone,
            gender: data.employeeProfile.gender,
            department: data.employeeProfile.departmentName,
            position: data.employeeProfile.positionName,
            role: data.employeeProfile.roleName,
            address: data.employeeProfile.address,
            maritalStatus: data.employeeProfile.maritalStatus,
            education: data.employeeProfile.education,
            workExp: data.employeeProfile.workExp,
            joinDate: data.employeeProfile.joinDate,
          });
        } else {
          console.error("Error fetching profile:", data.message);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      try {
        const response = await fetch("/api/user/profile", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(details),
        });

        if (!response.ok) {
          console.error("Failed to update profile:", response.statusText);
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Employee Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Name */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Full Name</label>
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
            <div className="col-md-6 mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={details.email}
                onChange={handleInputChange}
                className="form-control"
                disabled={!isEditing}
              />
            </div>

            {/* DOB */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={details.dob}
                onChange={handleInputChange}
                className="form-control"
                disabled={!isEditing}
              />
            </div>

            {/* Gender */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Gender</label>
              <select
                name="gender"
                value={details.gender}
                onChange={handleInputChange}
                className="form-control"
                disabled={!isEditing}
              >
                <option value="">Select Gender</option>
                {genders.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Department */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Department</label>
              <select
                name="department"
                value={details.department}
                onChange={handleInputChange}
                className="form-control"
                disabled={!isEditing}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Position */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Position</label>
              <select
                name="position"
                value={details.position}
                onChange={handleInputChange}
                className="form-control"
                disabled={!isEditing}
              >
                <option value="">Select Position</option>
                {positions.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
            </div>

            {/* Phone */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Phone</label>
              <input
                type="text"
                name="phone"
                value={details.phone}
                onChange={handleInputChange}
                className="form-control"
                disabled={!isEditing}
              />
            </div>

            {/* Address */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                name="address"
                value={details.address}
                onChange={handleInputChange}
                className="form-control"
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="text-center mt-4">
            <button type="submit" className={`btn ${isEditing ? "btn-success" : "btn-primary"} me-2`}>
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
            {isEditing && (
              <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmpProfile;
