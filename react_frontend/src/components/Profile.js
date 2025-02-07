import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EmpProfile = () => {
  const initialDetails = {
    employeeId: "",
    name: "",
    email: "",
    position: "",
    department: "",
    role: "",
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

  // Dropdown options
  const departments = ["HR", "Engineering", "Marketing", "Sales", "Finance"];
  const positions = ["Intern", "Junior Developer", "Senior Developer", "Manager", "Director"];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:8081/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();

        if (response.status === 200) {
          setDetails({
            employeeId: data.employeeProfile.id,
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

  const toggleEditing = async () => {
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
    <div className="container mt-5" style={{ maxWidth: "800px" }}>
      <div
        className="card shadow-lg border-0"
        style={{
          borderRadius: "15px",
          background: "#FFFFFF", // White background
          border: "1px solid #E0E0E0", // Subtle border to define edges
        }}
      >
        {/* Header Section */}
        <div
          className="card-header d-flex align-items-center"
          style={{
            backgroundColor: "#F5F5F5", // Soft light gray
            color: "#333333", // Dark gray text
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            fontWeight: "700",
          }}
        >
          <div className="d-flex flex-column align-items-center text-center w-100">
            <h3 className="mb-1">{details.name || "Your Name"}</h3>
            <p className="mb-0">{details.position || "Position"}</p>
            <p className="mb-0">{details.department || "Department"}</p>
          </div>
        </div>

        {/* Body Section */}
        <div className="card-body">
          <h5
            className="text-center mb-4"
            style={{ color: "#333333", fontWeight: "bold" }} // Dark text for the title
          >
            Profile Details
          </h5>
          <table className="table table-bordered table-hover">
            <tbody>
              {Object.keys(initialDetails).map((key) => (
                <tr key={key}>
                  <th
                    style={{
                      backgroundColor: "#F5F5F5", // Light gray for the header
                      color: "#333333", // Dark gray text
                      width: "30%",
                    }}
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </th>
                  <td>
                    {isEditing ? (
                      key === "dob" ? (
                        <input
                          type="date"
                          name={key}
                          value={details[key]}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      ) : key === "department" ? (
                        <select
                          name={key}
                          value={details[key]}
                          onChange={handleInputChange}
                          className="form-control"
                        >
                          <option value="">Select Department</option>
                          {departments.map((dept) => (
                            <option key={dept} value={dept}>
                              {dept}
                            </option>
                          ))}
                        </select>
                      ) : key === "position" ? (
                        <select
                          name={key}
                          value={details[key]}
                          onChange={handleInputChange}
                          className="form-control"
                        >
                          <option value="">Select Position</option>
                          {positions.map((pos) => (
                            <option key={pos} value={pos}>
                              {pos}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          name={key}
                          value={details[key]}
                          onChange={handleInputChange}
                          className="form-control"
                        />
                      )
                    ) : (
                      details[key] || "Not Provided"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Section */}
        <div
          className="card-footer text-center d-flex justify-content-center gap-3"
          style={{
            backgroundColor: "#F5F5F5", // Light gray footer
            borderBottomLeftRadius: "15px",
            borderBottomRightRadius: "15px",
          }}
        >
          {/* Save / Edit Button */}
          <button
            className={`btn ${isEditing ? "btn-success" : "btn-primary"} px-4 py-2`}
            onClick={toggleEditing}
            style={{
              backgroundColor: isEditing ? "#4CAF50" : "#007BFF", // Green for save, blue for edit
              borderColor: "transparent",
              color: "#FFFFFF", // White text for better contrast
            }}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>

          {/* Cancel Button (Only when editing) */}
          {isEditing && (
            <button
              className="btn btn-secondary px-4 py-2 ms-2"
              onClick={() => setIsEditing(false)}
              style={{
                backgroundColor: "#B0BEC5", // Soft gray for cancel button
                borderColor: "transparent",
                color: "#333333", // Dark gray text
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmpProfile;
