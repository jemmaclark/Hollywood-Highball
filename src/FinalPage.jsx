import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./FinalPage.css";

function FinalPage(props) {
  const location = useLocation();
  const { movie, cocktail } = location.state || {};
  console.log(props);
  console.log("Movie:", movie);
  console.log("Cocktail:", cocktail);

  return (
    <div className="container final-page">
      <header className="sticky-header">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <Link to="/cocktails">Cocktails</Link>
        </nav>
      </header>
      <div className="main-content">
        <div className="left-section-final">
          <h1>Selected Movie</h1>
          {movie && (
            <div>
              <h3>{movie.title}</h3>
              <div className="center-image">
                <img
                  src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                  alt={movie.title}
                  className="image-size"
                />
                <div className="plot">
                  <h4 className="final">{movie.overview}</h4>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="right-section-movies">
          <h2>Selected Cocktail</h2>
          {cocktail && (
            <div>
              <h3>Name: {cocktail.strDrink}</h3>
              <div className="center-image">
                <img
                  src={cocktail.strDrinkThumb}
                  alt={cocktail.strDrink}
                  className="image-size"
                />
              </div>
              <h3>Ingredients:</h3>
              <ul>
                {Array.from({ length: 15 }, (_, i) => i + 1).map((i) => {
                  const ingredient = cocktail[`strIngredient${i}`];
                  if (ingredient) {
                    const measure = cocktail[`strMeasure${i}`];
                    return (
                      <li key={i}>
                        {measure} {ingredient}
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
              <h3>Instructions:</h3>
              <p>{cocktail.strInstructions}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FinalPage;
