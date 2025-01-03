import React from "react";
import "./EmpProfile.css";

function EmpProfile() {
  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="profile-avatar"
        />
        <h2 className="profile-name">John Doe</h2>
        <p className="profile-email">johndoe@gmail.com</p>
        <div className="profile-details">
          <p>
            <strong>Position:</strong> Software Engineer
          </p>
          <p>
            <strong>Department:</strong> IT
          </p>
          <p>
            <strong>Joined:</strong> January 2022
          </p>
        </div>
      </div>
    </div>
  );
}

export default EmpProfile;
