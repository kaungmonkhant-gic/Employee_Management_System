import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to My React App</h1>
      <Link
        to="/login"
        style={{
          padding: "10px 20px",
          textDecoration: "none",
          background: "#007BFF",
          color: "white",
          borderRadius: "5px",
        }}
      >
        Go to Login hhhh
      </Link>
    </div>
  );
}

export default App;
