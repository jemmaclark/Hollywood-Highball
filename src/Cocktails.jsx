import React, { useState } from "react";

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
    <div>
      <h1>Cocktail App</h1>
      <div>
        <label>Select a Cocktail or Liquor:</label>
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

      <button onClick={handleFindCocktail}>Find Cocktail</button>

      {randomCocktail && (
        <div>
          <h2>Random Cocktail:</h2>
          <h3>Name: {randomCocktail.strDrink}</h3>
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
    </div>
  );
}

export default Cocktails;
