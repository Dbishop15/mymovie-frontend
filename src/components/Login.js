// Login.js
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { setToken, parseJwt } from "../services/auth";
import "../components/Login.css";

export default function Login({ setUser }) {
  const [username, setUsernameState] = useState("");
  const [password, setPasswordState] = useState("");
  const [message, setMessageState] = useState("");
  const [errors, setErrorsState] = useState({});
  const navigate = useNavigate();

  const setUsername = (value) => {
    setUsernameState(value);
    if (errors.username) {
      setErrorsState((prevErrors) => ({ ...prevErrors, username: null }));
    }
  };

  const setPassword = (value) => {
    setPasswordState(value);
    if (errors.password) {
      setErrorsState((prevErrors) => ({ ...prevErrors, password: null }));
    }
  };

  const setMessage = (value) => {
    setMessageState(value);
    // setTimeout(() => setMessageState(""), 5000);
  };

  const validateForm = () => {
    const newErrors = {};
    if (username.trim() === "") {
      newErrors.username = "Username is required.";
    }
    if (password.trim() === "") {
      newErrors.password = "Password is required.";
    }
    setErrorsState(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await login(username, password);
      console.log("Login response:", response);

      if (response.jwt) {
        const token = response.jwt;
        console.log("Received JWT token:", token);
        setToken(token);
        const userInfo = parseJwt(token);
        console.log("Decoded user info:", userInfo);
        setUser(userInfo);
        setMessage("Login successful!");
        navigate("/movies");
      } else {
        setMessage("Login failed! Incorrect username or password.");
        console.log("Login failed response:", response);
      }
    } catch (error) {
      console.error("Error during login:", error);

      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        console.error("Error response headers:", error.response.headers);

        // Handle specific status codes or error messages from the server
        if (error.response.status === 401 || error.response.status === 403) {
          setMessage("Login failed! Incorrect username or password.");
        } else if (error.response.status === 400) {
          setMessage("Bad request. Please check the data you are sending.");
        } else {
          setMessage(
            `An error occurred: ${error.response.statusText || "Unknown error"}`
          );
        }
      } else if (error.request) {
        console.error("Error request:", error.request);
        setMessage("No response from the server. Please try again later.");
      } else {
        console.error("Error message:", error.message);
        setMessage("An error occurred during login. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit">Sign In</button>
        <div className="login">
          <span>
            <p>
              Don't have an account yet? <a href="/register">Sign Up</a>
            </p>
          </span>
        </div>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
};
