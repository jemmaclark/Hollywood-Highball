import React from "react";
import { Link } from "react-router-dom";
import "./WelcomePage.css";

function WelcomePage() {
  return (
    <div className="container">
      <header className="sticky-header">Header Content</header>
      <div className="main-content">
        <div className="left-section"></div>
        <div className="right-section">
          <div className="text">
            LIGHTS, CAMERA, COCKTAILS! HOLLYWOOD HIGHBALL: WHERE MOVIE MAGIC
            MEETS MIXOLOGY FOR A NIGHT OF CINEMATIC SIPS.
          </div>
        </div>
      </div>
      <footer className="sticky-footer">
        <Link to="/movies">Get Started</Link>
      </footer>
    </div>
  );
}

export default WelcomePage;
