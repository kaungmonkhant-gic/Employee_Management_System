import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EmpProfile = () => {
  const initialDetails = {
    name: "",
    email: "",
    position: "",
    department: "",
    role:"",
    empid: "",
    dob: "",
    gender: "",
    martialStatus: "",
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
  const positions = [
    "Intern",
    "Junior Developer",
    "Senior Developer",
    "Manager",
    "Director",
  ];

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
        console.log(data);

        if (response.status === 200) {
          console.log(data);
          setDetails({
            employeeId: data.employeeProfile.empid,
            name: data.employeeProfile.name,
            dob: data.employeeProfile.dob,
            email: data.employeeProfile.email,
            phone: data.employeeProfile.phone,
            gender: data.employeeProfile.gender,
            department: data.employeeProfile.departmentName,
            position: data.employeeProfile.positionName,
            role: data.employeeProfile.roleName,
            address: data.employeeProfile.address,
            martialStatus: data.employeeProfile.martialStatus,
            education: data.employeeProfile.education,
            workExp: data.employeeProfile.workExp,
            joinDate: data.employeeProfile.joinDate,
          });
          console.log("TEStung:" + setDetails);
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
    <div className="container mt-5 vh-100" style={{ maxWidth: "600px" }}>
  <div
    className="card shadow-sm border-0"
    style={{
      borderRadius: "12px",
      background: "linear-gradient(to bottom, #E3EAF4, #D9E2EC)",
    }}
  >
    {/* Header Section */}
    <div
      className="card-header d-flex align-items-center"
      style={{
        backgroundColor: "#D9E2EC",
        color: "#4A5D73",
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
        fontWeight: "600",
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
        style={{ color: "#4A5D73", fontWeight: "bold" }}
      >
        Profile Details
      </h5>
      <table className="table table-hover">
        <tbody>
          {Object.keys(initialDetails).map((key) => (
            <tr key={key}>
              <th
                style={{
                  backgroundColor: "#D0DAE9",
                  color: "#4A5D73",
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
                      className="form-control form-control-sm"
                    />
                  ) : key === "department" ? (
                    <select
                      name={key}
                      value={details[key]}
                      onChange={handleInputChange}
                      className="form-control form-control-sm"
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
                      className="form-control form-control-sm"
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
                      className="form-control form-control-sm"
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
      className="card-footer text-center d-flex justify-content-center gap-2"
      style={{
        backgroundColor: "#D9E2EC",
        borderBottomLeftRadius: "12px",
        borderBottomRightRadius: "12px",
      }}
    >
      {/* Save / Edit Button */}
      <button
        className={`btn ${isEditing ? "btn-success" : "btn-primary"} px-4 py-2`}
        onClick={toggleEditing}
        style={{
          backgroundColor: isEditing ? "#9BAEC8" : "#748DA6",
          borderColor: "transparent",
          color: "#FFF",
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
            backgroundColor: "#A8B8C8",
            borderColor: "transparent",
            color: "#4A5D73",
          }}
        >
          Cancel
        </button>
      )}
    </div>
  </div>
</div>

 );
}
export default EmpProfile;
