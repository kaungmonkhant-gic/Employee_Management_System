import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function EmpProfile() {
  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div className="card shadow-sm text-center" style={{ width: "18rem" }}>
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="card-img-top rounded-circle mx-auto mt-3"
          style={{ width: "150px", height: "150px" }}
        />
        <div className="card-body">
          <h5 className="card-title">John Doe</h5>
          <p className="card-text text-muted">johndoe@gmail.com</p>
          <div className="mt-3">
            <p className="mb-1">
              <strong>Position:</strong> Software Engineer
            </p>
            <p className="mb-1">
              <strong>Department:</strong> IT
            </p>
            <p>
              <strong>Joined:</strong> January 2022
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmpProfile;
