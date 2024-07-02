import React from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import PropTypes from "prop-types";
import "../components/Header.css";

export default function Header({ user, setUser }) {
  console.log("Header user:", user); // Debugging log
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
              <Link to="/addmovie">AddNewMovie</Link>
            </li>
            <li>
              <Link to="/mylist">AddedList</Link>
            </li>
            <li>
              <Link to="/watchlist">WatchList</Link>
            </li>
          </ul>
        </nav>
        <nav>
          <ul>
            {user ? (
              <>
                <li className="header-username">Welcome, {user.username}</li>
                <li>
                  <Logout setUser={setUser} />
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
