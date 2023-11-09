import React, { useState } from "react";
import "./About.css";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="container">
      <header className="sticky-header">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/cocktails">Cocktails</Link>
          <Link to="/about">About</Link>
        </nav>
      </header>
      <div className="main-content">
        <div className="left-section-about"></div>
        <div className="right-section-about">
          <h2>Hollywood Highball Overview</h2>
          <p>
            {" "}
            Hollywood Highball is an innovative web application designed to
            elevate your entertainment experience by combining two of life's
            pleasures: movies and cocktails. This dynamic app allows users to
            seamlessly integrate their moods, movie preferences, and available
            alcohol into a delightful and customised evening. {"\n"}
          </p>
          <p>
            <a
              href="https://github.com/jemmaclark/Hollywood-Highball"
              className="button-style-about"
            >
              Developers Github
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
