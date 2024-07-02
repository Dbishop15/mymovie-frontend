import React, { useState } from "react";
import "../components/Login.css";
import { login } from "../services/apiService";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize navigate

  const validateForm = () => {
    const newErrors = {};
    if (username.trim() === "") {
      newErrors.username = "Username is required.";
    }
    if (password.trim() === "") {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await login(username, password);
      console.log("Login response:", response); // Debugging log
      if (
        response &&
        response.data &&
        response.data.username === username &&
        response.data.password === password
      ) {
        console.log("User object:", response.data); // Debugging log
        setUser(response.data); // Set the logged-in user from response
        setMessage("Login successful!");
        navigate("/movies"); // Navigate to movies page after login
      } else {
        setMessage("Login failed! Incorrect username or password.");
        console.log("Login failed response:", response);
      }
    } catch (error) {
      setMessage("An error occurred during login.");
      console.error("Login error:", error);
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
