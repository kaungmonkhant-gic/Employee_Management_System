import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const EmpProfile = () => {
  const initialDetails = {
    employeeId: "",
    name: "",
    dob: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    department: "",
    position: "",
    role: "",
  };

  const [details, setDetails] = useState(initialDetails);
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(
    "https://via.placeholder.com/150" // Default profile picture
  );

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
        const response = await fetch("http://localhost:8080/profile", {
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

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result); // Update profile picture with the base64 image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container mt-5 vh-100" style={{ maxWidth: "600px" }}>

      <div
        className="card shadow border-0"
        style={{
          borderRadius: "15px",
          background: "linear-gradient(to bottom,#E2EAF4,#E2EAF4)",
        }}
      >
        {/* Header Section */}
        <div
          className="card-header d-flex align-items-center"
          style={{
            backgroundColor: "#FFFFFF",
            color: "#004080",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
          }}
        >
          <div className="me-4">
            <img
              src={profilePic}
              alt="Profile"
              className="rounded-circle border border-white"
              style={{ width: "120px", height: "120px" }}
            />
            {isEditing && (
              <div className="mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  className="form-control form-control-sm"
                />
              </div>
            )}
          </div>
          <div>
            <h3 className="mb-1">{details.name || "Your Name"}</h3>
            <p className="mb-0">{details.position || "Position"}</p>
            <p className="mb-0">{details.department || "Department"}</p>
          </div>
        </div>

        {/* Body Section */}
        <div className="card-body">
          <h5
            className="text-center mb-4"
            style={{ color: "#004080", fontWeight: "bold" }}
          >
            Profile Details
          </h5>
          <table className="table table-hover">
            <tbody>
              {Object.keys(initialDetails).map((key) => (
                <tr key={key}>
                  <th
                    style={{
                      backgroundColor: "#e6f4ff",
                      color: "#004080",
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
          className="card-footer text-center"
          style={{
            backgroundColor: "#d7ecff",
            borderBottomLeftRadius: "15px",
            borderBottomRightRadius: "15px",
          }}
        >
          <button
            className={`btn ${
              isEditing ? "btn-success" : "btn-primary"
            } px-4 py-2`}
            onClick={toggleEditing}
            style={{
              backgroundColor: isEditing ? "#7ec4ff" : "#004080",
              borderColor: "transparent",
            }}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmpProfile;
