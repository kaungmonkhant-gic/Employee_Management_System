
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook



function AddLeave() {
    const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle button click
  const handleButtonClick = () => {
    navigate("/admin-dashboard/leave"); // Navigate to the "/details" route
  };

  return (
    <div className="container mt-5 vh-100">

      <h2 className="text-center mb-4">Add Leave</h2>
      <button className="btn btn-primary mb-4" onClick={handleButtonClick}>
            Return
          </button>
    

    </div>
  );
}

export default AddLeave;
