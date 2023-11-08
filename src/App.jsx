import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WelcomePage from "./WelcomePage";
import Movies from "./Movies";
import Cocktails from "./Cocktails";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<WelcomePage />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/demo" element={<WelcomePage />} />
        <Route exact path="/cocktails" element={<Cocktails />} />
      </Routes>
    </Router>
  );
}

export default App;
