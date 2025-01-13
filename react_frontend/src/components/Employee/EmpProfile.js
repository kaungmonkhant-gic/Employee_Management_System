import React, { useState, useEffect } from "react";

const EmpProfile = () => {
  const initialDetails = {
    employeeId: "",
    name: "",
    dob: "",
    email: "",
    facebook: "",
    phone: "",
    gender: "",
    city: "",
    country: "",
    department: "",
    position: "",
  };

  const [details, setDetails] = useState(initialDetails);
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState(
    "https://via.placeholder.com/150" // Default profile picture
  );

  // Fetch user profile when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDetails(data.profile); 
          setProfilePic(data.profilePic || profilePic); 
        } else {
          console.error("Failed to fetch profile:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []); // Empty dependency array ensures this runs only once

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const toggleEditing = async () => {
    if (isEditing) {
      // Save updated details to the backend
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
    <div className="container md">
      <div className="card shadow">
        {/* Header Section */}
        <div className="card-header d-flex align-items-center">
          {/* Profile Picture */}
          <div className="me-3">
            <img
              src={profilePic}
              alt="Profile"
              className="rounded-circle"
              style={{ width: "150px", height: "150px" }}
            />
            {isEditing && (
              <div className="mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  className="form-control"
                />
              </div>
            )}
          </div>
          {/* Name */}
          <div>
            <h2>{details.name || "Your Name"}</h2>
          </div>
        </div>

        {/* Body Section */}
        <div className="card-body">
          <h4 className="card-title mb-4">Profile Details</h4>
          <table className="table table-striped">
            <tbody>
              {Object.keys(initialDetails).map((key) => (
                <tr key={key}>
                  <th>{key.charAt(0).toUpperCase() + key.slice(1)}:</th>
                  <td>
                    {isEditing ? (
                      <input
                        type="text"
                        name={key}
                        value={details[key]}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    ) : (
                      details[key] || "Not Provided"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Edit Button at Bottom */}
        <div className="card-footer text-center">
          <button
            className={`btn ${isEditing ? "btn-success" : "btn-primary"} mt-2`}
            onClick={toggleEditing}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmpProfile;
