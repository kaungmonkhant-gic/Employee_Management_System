import React, { useState } from "react";

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const toggleEditing = () => {
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
    <div className="container mt-5">
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
              <tr>
                <th>Employee ID:</th>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      name="employeeId"
                      value={details.employeeId}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  ) : (
                    details.employeeId || "Not Provided"
                  )}
                </td>
              </tr>
              <tr>
                <th>Name:</th>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={details.name}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  ) : (
                    details.name || "Not Provided"
                  )}
                </td>
              </tr>
              <tr>
                <th>Date of Birth:</th>
                <td>
                  {isEditing ? (
                    <input
                      type="date"
                      name="dob"
                      value={details.dob}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  ) : (
                    details.dob || "Not Provided"
                  )}
                </td>
              </tr>
              <tr>
                <th>Email:</th>
                <td>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={details.email}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  ) : (
                    details.email || "Not Provided"
                  )}
                </td>
              </tr>
              <tr>
                <th>Facebook:</th>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      name="facebook"
                      value={details.facebook}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  ) : (
                    details.facebook || "Not Provided"
                  )}
                </td>
              </tr>
              <tr>
                <th>Phone:</th>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      name="phone"
                      value={details.phone}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  ) : (
                    details.phone || "Not Provided"
                  )}
                </td>
              </tr>
              <tr>
                <th>Gender:</th>
                <td>
                  {isEditing ? (
                    <select
                      name="gender"
                      value={details.gender}
                      onChange={handleInputChange}
                      className="form-select"
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    details.gender || "Not Provided"
                  )}
                </td>
              </tr>
              <tr>
                <th>City:</th>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      name="city"
                      value={details.city}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  ) : (
                    details.city || "Not Provided"
                  )}
                </td>
              </tr>
              <tr>
                <th>Country:</th>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      name="country"
                      value={details.country}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  ) : (
                    details.country || "Not Provided"
                  )}
                </td>
              </tr>
              <tr>
                <th>Department:</th>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      name="department"
                      value={details.department}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  ) : (
                    details.department || "Not Provided"
                  )}
                </td>
              </tr>
              <tr>
                <th>Position:</th>
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      name="position"
                      value={details.position}
                      onChange={handleInputChange}
                      className="form-control"
                    />
                  ) : (
                    details.position || "Not Provided"
                  )}
                </td>
              </tr>
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
