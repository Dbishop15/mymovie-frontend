import React, { useState } from "react";
import "../components/Signup.css";
import { signup } from "../services/api";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function Signup({ setUser }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize navigate

  const validateForm = () => {
    const newErrors = {};
    if (username.trim() === "") {
      newErrors.username = "Username is required.";
    } else if (username.length < 4) {
      newErrors.username = "Username must be at least 4 characters long.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format.";
    }
    if (password.trim() === "") {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await signup(username, email, password);
      console.log("Signup response:", response); // Debugging log

      if (response && response.status === 201 && response.data) {
        setMessage("Signup successful! Please log in.");
        navigate("/login"); // Navigate to login page after successful signup
      } else {
        setMessage("Signup failed!");
      }
    } catch (error) {
      const newErrors = {};
      const errorMessage = error.response?.data || "";
      if (error.response && error.response.status === 409) {
        // Handle specific error messages
        if (errorMessage.toLowerCase().includes("username")) {
          newErrors.username = "Username already exists.";
        }
        if (errorMessage.toLowerCase().includes("email")) {
          newErrors.email = "Email already exists.";
        }
        setErrors(newErrors);
        setMessage(""); // Clear general message since specific errors are shown
      } else {
        setMessage("An error occurred during signup.");
      }
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup}>
        <h2>Sign Up</h2>
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
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
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
        <button type="submit">Sign Up</button>
        <div className="sign-up">
          <span>
            <p>
              Already have an account? <a href="/login">Sign In</a>
            </p>
          </span>
        </div>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

Signup.propTypes = {
  setUser: PropTypes.func.isRequired,
};
