import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./WelcomePage";
import Movies from "./Movies";
import Cocktails from "./Cocktails";
import FinalPage from "./FinalPage";
import About from "./About";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<WelcomePage />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/demo" element={<WelcomePage />} />
        <Route exact path="/cocktails" element={<Cocktails />} />
        <Route exact path="/final" element={<FinalPage />} />
        <Route exact path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
