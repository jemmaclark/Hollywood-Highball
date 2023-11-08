import React, { useState } from "react";
import "./Cocktails.css";
import { Link } from "react-router-dom";

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
  "Baileys",
  "Absinthe",
  "Champagne",
  "Tequila",
  "Dry Vermouth",
  "Scotch",
  "Cognac",
  "Ginger Beer",
  "Whiskey",
  "Aperol",
  // Add any other liquors here
];

function Cocktails() {
  const [selectedAlcohol, setSelectedAlcohol] = useState("");
  const [randomCocktail, setRandomCocktail] = useState(null);

  function handleFindCocktail() {
    if (selectedAlcohol) {
      const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${selectedAlcohol}`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

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
        console.log(data);
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
      <div className="header">Header Content</div>
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
        to="/movies"
        className={randomCocktail ? "cocktail-link show" : "cocktail-link"}
      >
        <button className="cocktail-button">Get Movie</button>
      </Link>
    </div>
  );
}

export default Cocktails;
