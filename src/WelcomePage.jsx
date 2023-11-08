import React from "react";
import { Link } from "react-router-dom";
import "./WelcomePage.css";

function WelcomePage() {
  return (
    <div class="container">
      <div class="header"></div>
      <div class="footer"></div>
      <div class="main-content">
        <div className="button">
          <Link to="/movies">Get Started</Link>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
