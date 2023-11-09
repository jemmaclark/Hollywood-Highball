import React, { useState } from "react";
import "./Cocktails.css";
import { Link, useLocation } from "react-router-dom";

const availableCocktails = [
  "Vodka",
  "Gin",
  "Dark Rum",
  "Bourbon",
  "Cointreau",
  "Amaretto",
  "Light Rum",
  "Beer",
  "Wine",
  "Brandy",
  "Absinthe",
  "Champagne",
  "Tequila",
  "Dry Vermouth",
  "Scotch",
  "Cognac",
  "Ginger Beer",
  "Whiskey",
  "Aperol",
];

function Cocktails() {
  const [selectedAlcohol, setSelectedAlcohol] = useState("");
  const [randomCocktail, setRandomCocktail] = useState(null);
  const location = useLocation();
  const randomMovie = location.state && location.state.randomMovie;
  console.log(location);

  // function to fetch cocktail by alcohol
  function handleFindCocktail() {
    if (selectedAlcohol) {
      const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${selectedAlcohol}`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          //   console.log(data);

          const drinks = data.drinks || [];
          if (drinks.length > 0) {
            const randomIndex = Math.floor(Math.random() * drinks.length);
            const selectedCocktail = drinks[randomIndex];

            fetchCocktailDetailsById(selectedCocktail.idDrink);
          } else {
            setRandomCocktail(null);
          }
        })
        .catch((error) => console.error(error));
    }
  }

  // Function to fetch cocktail details by ID
  function fetchCocktailDetailsById(cocktailId) {
    const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const cocktailDetails = data.drinks ? data.drinks[0] : null;
        setRandomCocktail(cocktailDetails);
      })
      .catch((error) => console.error(error));
  }

  function getIngredientsList(cocktail) {
    const ingredients = [];

    for (let i = 1; i <= 50; i++) {
      const ingredient = cocktail[`strIngredient${i}`];
      const measure = cocktail[`strMeasure${i}`];

      if (ingredient) {
        ingredients.push(`${measure} ${ingredient}`);
      } else {
        break;
      }
    }

    return ingredients;
  }

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
        <span className="left-section"></span>
        <span className="right-section">
          <h1>SELECT YOUR ALCOHOL OF CHOICE</h1>
          <div>
            <label>Select One:</label>
            {availableCocktails.map((cocktail) => (
              <label key={cocktail}>
                <input
                  type="radio"
                  name="selectedAlcohol"
                  value={cocktail}
                  checked={selectedAlcohol === cocktail}
                  onChange={() => setSelectedAlcohol(cocktail)}
                />
                {cocktail}
              </label>
            ))}
          </div>
          <button className="cocktail-button" onClick={handleFindCocktail}>
            Find Cocktail
          </button>
          {randomCocktail && (
            <div className={`cocktail-display ${randomCocktail ? "show" : ""}`}>
              <h2>{randomCocktail.strDrink}</h2>
              <h4>Ingredients:</h4>
              <ul>
                {getIngredientsList(randomCocktail).map((ingredient, i) => (
                  <li key={i}>{ingredient}</li>
                ))}
              </ul>
              <p>Instructions: {randomCocktail.strInstructions}</p>
              <img
                src={randomCocktail.strDrinkThumb}
                alt={randomCocktail.strDrink}
              />
            </div>
          )}
        </span>
      </div>
      <Link
        state={{ cocktail: randomCocktail, movie: randomMovie }}
        to={{
          pathname: "/final",
        }}
        className={
          randomCocktail && randomMovie ? "button-link show" : "button-link"
        }
      >
        Go to Final Page
      </Link>
    </div>
  );
}

export default Cocktails;
