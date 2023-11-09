import React, { useState } from "react";
import ReactFlipCard from "reactjs-flip-card";
import "./About.css";
import { Link } from "react-router-dom";

function About() {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const cardStyles = {
    card: {
      background: "purple",
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: "20px",
      width: "250px",
      height: "350px",
    },
  };

  const aboutMeText = `
    I'm a recent graduate of a 3-month intensive software engineering course, 
    where I've acquired a strong foundation in web development and software engineering. 
    My goal is to apply my technical knowledge to create practical solutions for everyday 
    challenges. I developed this app with a commitment to providing efficient, 
    user-friendly experiences for various tasks.
  `;

  return (
    <div className="container">
      <header className="sticky-header">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/cocktails">Cocktails</Link>
        </nav>
      </header>
      <div className="main-content">
        <div className="left-section"></div>
        <div className="right-section">
          <h2>A little about me</h2>
          <div className="content-card" onClick={flipCard}>
            <ReactFlipCard
              frontStyle={cardStyles.card}
              backStyle={cardStyles.card}
              isFlipped={isFlipped}
            >
              <div>Hover me!</div>
              <div>Click to flip</div>
            </ReactFlipCard>
          </div>
          <p>{isFlipped ? aboutMeText : ""}</p>
        </div>
      </div>
    </div>
  );
}

export default About;
