import React, { useState } from "react";
import "./Movies.css";
import { Link } from "react-router-dom";

function Movies() {
  const [moods, setMoods] = useState([
    { name: " Excited ", genre: "Action" },
    { name: " Energetic ", genre: "Action" },
    { name: " Wanderlust ", genre: "Adventure" },
    { name: " Thrilled ", genre: "Adventure" },
    { name: " Silly ", genre: "Animation" },
    { name: " Whimsy ", genre: "Animation" },
    { name: " Cheerful ", genre: "Animation" },
    { name: " Happy ", genre: "Comedy" },
    { name: " Suspense ", genre: "Crime" },
    { name: " Informative ", genre: "Documentary" },
    { name: " Thoughtful ", genre: "Documentary" },
    { name: " Emotional ", genre: "Drama" },
    { name: " Serious ", genre: "Drama" },
    { name: " Introspective ", genre: "Drama" },
    { name: " Heartwarming ", genre: "Family" },
    { name: " Wholesome ", genre: "Family" },
    { name: " Nurturing ", genre: "Family" },
    { name: " Wonder ", genre: "Fantasy" },
    { name: " Curious ", genre: "Fantasy" },
    { name: " Escaping Reality ", genre: "Fantasy" },
    { name: " Reflective ", genre: "History" },
    { name: " Fearful ", genre: "Horror" },
    { name: " Rhythmic ", genre: "Music" },
    { name: " Intrigued ", genre: "Mystery" },
    { name: " Love ", genre: "Romance" },
    { name: " Futuristic ", genre: "Science Fiction" },
    { name: " Relaxed ", genre: "TV Movie" },
    { name: " Tense ", genre: "Thriller" },
    { name: " Intense ", genre: "War" },
    { name: " Adventurous ", genre: "Western" },
  ]);
  const [selectedMood, setSelectedMood] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);

  function handleMoodChange(e, moodName) {
    if (e.target.checked) {
      setSelectedMood([...selectedMood, moodName]);
    } else {
      setSelectedMood(selectedMood.filter((mood) => mood !== moodName));
    }
  }

  async function fetchMovies(genres, page) {
    const genreIds = genres.join(",");
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=b75b5f4a27e7045c2f8e0064a29790ba&with_genres=${genreIds}&page=${page}`
    );
    const data = await response.json();
    return data.results;
  }
  async function fetchRandomMovie() {
    if (selectedMood.length > 0) {
      const selectedMoodInfo = moods.filter((mood) =>
        selectedMood.includes(mood.name)
      );
      const selectedGenres = selectedMoodInfo.map((mood) => mood.genre);

      const fetchedMovies = [];

      const promises = [];

      for (let page = 1; page <= 10; page++) {
        promises.push(fetchMovies(selectedGenres, page));
      }

      Promise.all(promises)
        .then((results) => {
          results.forEach((movies) => {
            fetchedMovies.push(...movies);
          });

          if (fetchedMovies.length > 0) {
            const randomIndex = Math.floor(
              Math.random() * fetchedMovies.length
            );
            setRandomMovie(fetchedMovies[randomIndex]);
          }
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
        });
    }
  }

  return (
    <div className="container">
      <div className="header">Header Content</div>
      <div className="main-content">
        <div className="left-section"></div>
        <div className="right-section">
          <h1>Movie Mood</h1>
          <div className="mood-boxes">
            {moods.map((mood, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  value={mood.name}
                  checked={selectedMood.includes(mood.name)}
                  onChange={(e) => handleMoodChange(e, mood.name)}
                />
                {mood.name}
              </label>
            ))}
          </div>
          <button className="cocktail-button" onClick={fetchRandomMovie}>
            Get Movie
          </button>

          {randomMovie && (
            <div className={`movie-display ${randomMovie ? "show" : ""}`}>
              <h2>Random Movie</h2>
              <h3>{randomMovie.title}</h3>
              <img
                src={`https://image.tmdb.org/t/p/w185${randomMovie.poster_path}`}
                alt={randomMovie.title}
              />
            </div>
          )}
        </div>
      </div>
      <Link
        to="/cocktails"
        className={randomMovie ? "cocktail-link show" : "cocktail-link"}
      >
        <button className="cocktail-button">Get Cocktail</button>
      </Link>
    </div>
  );
}

export default Movies;
