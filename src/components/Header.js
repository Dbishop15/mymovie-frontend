import React from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "../components/Header.css";
import { clearToken } from "../services/auth";

export default function Header({ user, setUser, onLogout }) {
  console.log("Header user:", user); // Debugging log
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">MyMovies</h1>
        <nav>
          <ul>
            <li>
              <Link to="/movies">Home</Link>
            </li>
            <li>
              <Link to="/addmovie">Add New Movie</Link>
            </li>
            <li>
              <Link to="/mylist">Added List</Link>
            </li>
            <li>
              <Link to="/watchlist">Watch List</Link>
            </li>
          </ul>
        </nav>
        <nav>
          <ul>
            {user ? (
              <>
                <li className="header-username">Welcome, {user.username}</li>
                <li>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/register">Signup</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

Header.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
  }),
  setUser: PropTypes.func.isRequired,
};
