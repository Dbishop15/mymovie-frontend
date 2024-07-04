import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/Logout.css";

const Logout = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null); // Clear the user state
    navigate("/login"); // Redirect to login page
  };

  return (
    <button onClick={handleLogout} className="logout-btn">
      Logout
    </button>
  );
};

export default Logout;
