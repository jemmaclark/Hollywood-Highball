import React from "react";
import { Link } from "react-router-dom";
import "./WelcomePage.css";

function WelcomePage() {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <Link to="/movies">Get Started</Link>
      </div>
    </div>
  );
}

export default WelcomePage;
