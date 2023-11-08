import React, { useState } from "react";

function CocktailApp() {
  const [cocktailData, setCocktailData] = useState([]);
  const [selectedAlcohol, setSelectedAlcohol] = useState("");
  const [randomCocktail, setRandomCocktail] = useState(null);

  function handleFetchCocktails() {
    if (selectedAlcohol) {
      const apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${selectedAlcohol}`;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Debug: Log the data to the console
          setCocktailData(data.drinks || []);
        })
        .catch((error) => console.error(error));
    }
  }

  function handleFindCocktail() {
    if (cocktailData.length > 0) {
      const randomIndex = Math.floor(Math.random() * cocktailData.length);
      const selectedCocktail = cocktailData[randomIndex];
      setRandomCocktail(selectedCocktail);
    }
  }

  return (
    <div>
      <h1>Cocktail App</h1>
      <div>
        <label>
          Select Alcohol:
          <input
            type="text"
            value={selectedAlcohol}
            onChange={(e) => setSelectedAlcohol(e.target.value)}
          />
        </label>
        <button onClick={handleFetchCocktails}>Fetch Cocktails</button>
      </div>

      <button onClick={handleFindCocktail}>Find Cocktail</button>

      {randomCocktail && (
        <div>
          <h2>Random Cocktail:</h2>
          <h3>Name: {randomCocktail.strDrink}</h3>
          <img
            src={randomCocktail.strDrinkThumb}
            alt={randomCocktail.strDrink}
          />
          {/* Add more cocktail information here */}
        </div>
      )}
    </div>
  );
}

export default CocktailApp;
