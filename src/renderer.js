async function search() {
    var movienameInput = document.getElementById("moviename");
    var moviename = movienameInput.value;
    await fetch(`https://www.omdbapi.com/?apikey=b109497b&s=${moviename}&type=movie`)
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        if (data.Response === "True" && data.Search) {
          alldatadict = data.Search;
          alldatadict.sort((x, y) => parseInt(y.Year) - parseInt(x.Year));
          console.log(alldatadict);
          displayPosters(alldatadict);
          movienameInput.value = ""; // Clear the search box
        }
      })
      .catch(error => {
        // handle the error
        console.log(error);
      });
  }

const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get("imdbID");
const recommendedMoviesContainer = document.getElementById('recommendedMovies');
  
function displayPosters(data) {
    var postersDiv = document.getElementById("posters");
    postersDiv.innerHTML = "";
    data.forEach((movie) => {
      var movieDiv = document.createElement("div");
      movieDiv.className = "movie";
      movieDiv.setAttribute("data-id", movie.imdbID);

  
      var movieImage = document.createElement("img");
      movieImage.src = movie.Poster;
      movieImage.alt = "Movie Poster";
      movieDiv.appendChild(movieImage);
  
      var movieDetails = document.createElement("div");
      movieDetails.className = "movie-details";
  
      var movieTitle = document.createElement("h3");
      movieTitle.textContent = movie.Title;
      movieDetails.appendChild(movieTitle);
  
      var movieYear = document.createElement("p");
      movieYear.textContent = "Year: " + movie.Year;
      movieDetails.appendChild(movieYear);
  
      var movieID = document.createElement("p");
      movieID.textContent = "ID: " + movie.imdbID;
      movieDetails.appendChild(movieID);
  
      var movieDescription = document.createElement("p");
      movieDescription.className = "description";
      movieDescription.textContent = "Description: ";
      movieDetails.appendChild(movieDescription);

  
      movieDiv.appendChild(movieDetails);
  
      movieDiv.addEventListener("click", function() {
        window.location.href = "descript.html?i=" + movie.imdbID; // Navigate to descript.html
        getRecommendations(movie.imdbRating, movieDiv);
      });
      
  
      postersDiv.appendChild(movieDiv);
  
      fetch(`https://www.omdbapi.com/?apikey=b109497b&i=${movie.imdbID}`)
        .then(response => response.json())
        .then((data) => {
          var movieDetails = document.querySelector(`[data-id="${movie.imdbID}"] .description`);
          movieDetails.textContent += data.Plot;
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  
// Function to fetch recommended movies
async function fetchRecommendedMovies() {
    const apiKey = 'b109497b';
    const genre = 'comics'; // Change the genre as per your requirement
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${genre}&type=movie`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      return data.Search;
    } catch (error) {
      console.error('Error fetching recommended movies:', error);
      return [];
    }
  }
  
// Function to display recommended movies in the UI
function displayRecommendedMovies(movies) {
  recommendedMoviesContainer.innerHTML = '';

  // Sort movies by year of release in descending order
  movies.sort((a, b) => b.Year - a.Year);

  // Display only the first three movies
  const limitedMovies = movies.slice(0, 3);

  limitedMovies.forEach((movie) => {
    const movieElement = document.createElement('div');
    movieElement.className = 'movie';
    movieElement.innerHTML = `
      <h3>${movie.Title}</h3>
      <p>Released: ${movie.Year}</p>
      <p>Imdb ID: ${movie.imdbID}</p>
      <img src="${movie.Poster}" alt="${movie.Title} Poster" width="200">
    `;

    // Add event listener to movie element
    movieElement.addEventListener('click', () => {
      window.location.href = "descript.html?i=" + movie.imdbID;
    });

    recommendedMoviesContainer.appendChild(movieElement);
  });
}
  
// Function to handle recommended movies loading
function loadRecommendedMovies() {
    fetchRecommendedMovies()
      .then((movies) => {
        displayRecommendedMovies(movies);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  // Load recommended movies

loadRecommendedMovies();

document.addEventListener('DOMContentLoaded', () => {
  
    // Add event listener to "My Watchlist" link
    const watchlistLink = document.getElementById('watchlistLink');
    watchlistLink.addEventListener('click', () => {
      window.location.href = 'watchlist.html';
    });
  });
  