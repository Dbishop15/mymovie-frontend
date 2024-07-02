import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/Home.css";

const Home = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register", { state: { email } });
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Unlimited movies, TV shows, and more</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        <div className="email-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
          />
          <button onClick={handleGetStarted}>Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
