const fetchMovies = async (genres, page) => {
  const genreIds = genres.join(",");
  const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=b75b5f4a27e7045c2f8e0064a29790ba&with_genres=${genreIds}&page=${page}`;
  console.log("API URL: ", apiUrl);

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log("API Response: ", data);
    return data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};
console.log(fetchMovies);
console.log(data.results);
