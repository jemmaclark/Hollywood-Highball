import React, { useState } from "react";
import "./Movies.css";

function Movies() {
  const [moods, setMoods] = useState([
    { name: "Excited", genre: "Action" },
    { name: "Adrenalized", genre: "Action" },
    { name: "Energetic", genre: "Action" },
    { name: "Wanderlust", genre: "Adventure" },
    { name: "Thrilled", genre: "Adventure" },
    { name: "Childlike", genre: "Animation" },
    { name: "Whimsy", genre: "Animation" },
    { name: "Cheerful", genre: "Animation" },
    { name: "Silly", genre: "Comedy" },
    { name: "Happy", genre: "Comedy" },
    { name: "Light-hearted", genre: "Comedy" },
    { name: "Suspense", genre: "Crime" },
    { name: "Intruiged", genre: "Crime" },
    { name: "Tense", genre: "Crime" },
    { name: "Informative", genre: "Documentary" },
    { name: "Thoughtful", genre: "Documentary" },
    { name: "Emotional", genre: "Drama" },
    { name: "Serious", genre: "Drama" },
    { name: "Introspective", genre: "Drama" },
    { name: "Heartwarming", genre: "Family" },
    { name: "Wholesome", genre: "Family" },
    { name: "Nurturing", genre: "Family" },
    { name: "Wonder", genre: "Fantasy" },
    { name: "Curious", genre: "Fantasy" },
    { name: "Escaping Reality", genre: "Fantasy" },
    { name: "Reflective", genre: "History" },
    { name: "Fearful", genre: "Horror" },
    { name: "Rhythmic", genre: "Music" },
    { name: "Intrigued", genre: "Mystery" },
    { name: "Love", genre: "Romance" },
    { name: "Futuristic", genre: "Science Fiction" },
    { name: "Relaxed", genre: "TV Movie" },
    { name: "Tension", genre: "Thriller" },
    { name: "Intense", genre: "War" },
    { name: "Adventurous", genre: "Western" },
  ]);
  const [selectedMood, setSelectedMood] = useState([]);
  const [randomMovie, setRandomMovie] = useState(null);

  const handleMoodChange = (e, moodName) => {
    if (e.target.checked) {
      setSelectedMood([...selectedMood, moodName]);
    } else {
      setSelectedMood(selectedMood.filter((mood) => mood !== moodName));
    }
  };

  const fetchMovies = async (genres, page) => {
    const genreIds = genres.join(",");
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=b75b5f4a27e7045c2f8e0064a29790ba&with_genres=${genreIds}&page=${page}`
    );
    const data = await response.json();
    return data.results;
  };
  const fetchRandomMovie = async () => {
    if (selectedMood.length > 0) {
      const selectedMoodInfo = moods.filter((mood) =>
        selectedMood.includes(mood.name)
      );
      const selectedGenres = selectedMoodInfo.map((mood) => mood.genre);

      const fetchedMovies = [];

      const promises = [];

      for (let page = 1; page <= 100; page++) {
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
  };

  //   const fetchRandomMovie = async () => {
  //     if (selectedMood.length > 0) {
  //       const selectedMoodInfo = moods.filter((mood) =>
  //         selectedMood.includes(mood.name)
  //       );
  //       const selectedGenres = selectedMoodInfo.map((mood) => mood.genre);

  //       const fetchedMovies = [];

  //       for (let page = 1; page <= 10; page++) {
  //         const movies = await fetchMovies(selectedGenres, page);
  //         fetchedMovies.push(...movies);
  //       }

  //       if (fetchedMovies.length > 0) {
  //         const randomIndex = Math.floor(Math.random() * fetchedMovies.length);
  //         setRandomMovie(fetchedMovies[randomIndex]);
  //       }
  //     }
  //   };

  return (
    <div className="movie-container">
      {/* <img src="src/images/blank.png" alt="background" /> */}
      <div className="wrapper">
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
        <button onClick={fetchRandomMovie}>Get Movie</button>
        {randomMovie && (
          <div className="movie-display">
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
  );
}

export default Movies;
//   const [selectedMood, setSelectedMood] = useState([]);
//   const [randomMovie, setRandomMovie] = useState(null);

//   const handleMoodChange = (e, moodName) => {
//     if (e.target.checked) {
//       setSelectedMood([...selectedMood, moodName]);
//     } else {
//       setSelectedMood(selectedMood.filter((mood) => mood !== moodName));
//     }
//   };

//   const fetchRandomMovie = async () => {
//     if (selectedMood.length > 0) {
//       const selectedMoodInfo = moods.filter((mood) =>
//         selectedMood.includes(mood.name)
//       );
//       const selectedGenres = selectedMoodInfo.map((mood) => mood.genre);

//       const genreIds = selectedGenres.join(",");

//       const response = await fetch(
//         `https://api.themoviedb.org/3/discover/movie?api_key=b75b5f4a27e7045c2f8e0064a29790ba&with_genres=${genreIds}`
//       );

//       const data = await response.json();

//       if (data.results.length > 0) {
//         const randomIndex = Math.floor(Math.random() * data.results.length);
//         setRandomMovie(data.results[randomIndex]);
//       }
//     }
//   };

//   return (
//     <div>
//       <h1>Movie Mood</h1>
//       <div>
//         {moods.map((mood, index) => (
//           <label key={index}>
//             <input
//               type="checkbox"
//               value={mood.name}
//               checked={selectedMood.includes(mood.name)}
//               onChange={(e) => handleMoodChange(e, mood.name)}
//             />
//             {mood.name}
//           </label>
//         ))}
//       </div>
//       <button onClick={fetchRandomMovie}>Get Movie</button>
//       {randomMovie && (
//         <div>
//           <h2>Random Movie</h2>
//           <h3>{randomMovie.title}</h3>
//           <img
//             src={`https://image.tmdb.org/t/p/w185${randomMovie.poster_path}`}
//             alt={randomMovie.title}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default Movies;
//   const [selectedMood, setSelectedMood] = useState([]);
//   const [movies, setMovies] = useState([]);
//   const [showRandomMovie, setShowRandomMovie] = useState(false);

//   let fetchMovies = async (genre) => {
//     const genreIds = genre.join(",");
//     for (let page = 1; page <= 5; page++) {
//       console.log(page);
//       const response = await fetch(
//         `https://api.themoviedb.org/3/discover/movie?api_key=b75b5f4a27e7045c2f8e0064a29790ba&with_genres=${genre}&page=${page}`
//       );

//       const data = await response.json();
//       console.log(data.results);
//       setMovies(data.results);
//     }
//   };

//   function handleMoodChange(e) {
//     const moodName = e.target.value;
//     if (e.target.checked) {
//       setSelectedMood([...selectedMood, moodName]);
//     } else {
//       setSelectedMood(selectedMood.filter((mood) => mood !== moodName));
//     }
//   }
//   const handleSubmit = async () => {
//     if (selectedMood.length > 0) {
//       const selectedMoodInfo = moods.filter((mood) =>
//         selectedMood.includes(mood.name)
//       );
//       const selectedGenres = selectedMoodInfo.map((mood) => mood.genre);

//       const fetchedMovies = [];

//       for (let page = 1; page <= 5; page++) {
//         await fetchMovies(selectedGenres, page);
//         fetchedMovies.push(...movies);
//       }

//       setMovies(fetchedMovies);
//       setShowRandomMovie(true);
//     }
//   };

//   function getRandomMovie() {
//     if (movies.length === 0) {
//       return "No movies available.";
//     }
//     const randomMovie = movies[Math.floor(Math.random() * movies.length)];
//     return randomMovie;
//   }

//   return (
//     <div>
//       <h1>Movie Mood</h1>
//       <div>
//         {moods.map((mood, index) => (
//           <label key={index}>
//             <input
//               type="checkbox"
//               value={mood.name}
//               checked={selectedMood.includes(mood.name)}
//               onChange={handleMoodChange}
//             />
//             {mood.name}
//           </label>
//         ))}
//       </div>
//       <button onClick={handleSubmit}>Get Movie</button>
//       {showRandomMovie && (
//         <div>
//           <h2>Random Movie</h2>
//           <p>{getRandomMovie()}</p>
//         </div>
//       )}
//       <div>
//         {movies.map((movie) => (
//           <div key={movie.id}>
//             <h3>{movie.title}</h3>
//             <img
//               src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
//               alt={movie.title}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Movies;

//   const handleSubmit = async () => {
//     if (selectedMood.length > 0) {
//       const selectedMoodInfo = moods.filter((mood) =>
//         selectedMood.includes(mood.name)
//       );
//       const selectedGenres = selectedMoodInfo.map((mood) => mood.genre);
//       await fetchMovies(selectedGenres);
//       setShowRandomMovie(true);
//     }
//   };

//   function getRandomMovie() {
//     if (movies.length === 0) {
//       return "No movies available.";
//     }
//     const randomMovie = movies[Math.floor(Math.random() * movies.length)];
//     return randomMovie.title;
//   }
//   return (
//     <div>
//       <h1>Movie Mood</h1>
//       <div>
//         {moods.map((mood, index) => (
//           <label key={index}>
//             <input
//               type="checkbox"
//               value={mood.name}
//               checked={selectedMood.includes(mood.name)}
//               onChange={handleMoodChange}
//             />
//             {mood.name}
//           </label>
//         ))}
//       </div>
//       <button onClick={handleSubmit}>Get Movie</button>
//       {showRandomMovie && (
//         <div>
//           <h2>Random Movie</h2>
//           <p>{getRandomMovie()}</p>
//         </div>
//       )}
//     </div>
//   );
// }
// export default Movies;
