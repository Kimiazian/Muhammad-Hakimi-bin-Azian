// Get the IMDb ID from the URL's query parameters
const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get("i");

// Fetch the movie details using the IMDb ID
fetch(`https://www.omdbapi.com/?apikey=b109497b&i=${imdbID}`)
  .then(response => response.json())
  .then((data) => {
    // Use the movie details to display information on the descript.html page
    console.log(data);
    document.getElementById("poster").src = data.Poster;
    document.getElementById("title").textContent = data.Title;
    document.getElementById("year").textContent = "Year: " + data.Year;
    document.getElementById("rating").textContent = "Rating: " + data.imdbRating;

    // Get movie recommendations based on the year
    getRecommendations(data.Year);
    // Get movie details including cast, crew, synopsis, and release date
    getMovieDetails(imdbID);
  })
  .catch(error => {
    console.log(error);
  });

function getRecommendations(year) {
  fetch(`https://www.omdbapi.com/?apikey=b109497b&s=&type=movie&r=json&v=1&y=${year}`)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "True" && data.Search) {
        const recommendations = data.Search.sort((a, b) => b.Year.localeCompare(a.Year)).slice(0, 3);
        displayRecommendations(recommendations);
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function displayRecommendations(recommendations) {
  var recommendationList = document.getElementById("recommendationList");

  for (let i = 0; i < 3 && i < recommendations.length; i++) {
    var recommendationItem = document.createElement("div");
    recommendationItem.className = "recommendation-item";

    var recommendationPoster = document.createElement("img");
    recommendationPoster.src = recommendations[i].Poster;
    recommendationPoster.alt = "Movie Poster";
    recommendationItem.appendChild(recommendationPoster);

    var recommendationTitle = document.createElement("h4");
    recommendationTitle.textContent = recommendations[i].Title;
    recommendationItem.appendChild(recommendationTitle);

    recommendationList.appendChild(recommendationItem);
  }
}

function getMovieDetails(imdbID) {
  fetch(`https://www.omdbapi.com/?apikey=b109497b&i=${imdbID}&plot=full`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Display cast and crew
      if (data.Actors) {
        var cast = document.getElementById("cast");
        cast.textContent = "Cast: " + data.Actors;
      }
      if (data.Director) {
        var director = document.getElementById("director");
        director.textContent = "Director: " + data.Director;
      }
      if (data.Writer) {
        var writer = document.getElementById("writer");
        writer.textContent = "Writer: " + data.Writer;
      }

      // Display synopsis
      if (data.Plot) {
        var synopsis = document.getElementById("synopsis");
        synopsis.textContent = "Synopsis: " + data.Plot;
      }

      // Display release date
      if (data.Released) {
        var releaseDate = document.getElementById("release-date");
        releaseDate.textContent = "Release Date: " + data.Released;
      }
    })
    .catch(error => {
      console.log(error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const addToWatchlistButtons = document.querySelectorAll('.add-to-watchlist-btn');

  addToWatchlistButtons.forEach(button => {
    button.addEventListener('click', () => {
      const movieId = button.getAttribute('data-movie-id');
      const movieDetails = {
        id: movieId,
        title: document.getElementById('title').textContent,
        year: document.getElementById('year').textContent,
        rating: document.getElementById('rating').textContent,
        // Add other movie details you want to store
      };

      // Retrieve existing watchlist data from local storage
      let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

      // Check if the movie is already in the watchlist
      const existingMovie = watchlist.find(movie => movie.id === movieId);
      if (!existingMovie) {
        // Add the movie to the watchlist
        watchlist.push(movieDetails);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        alert('Movie added to watchlist!');
      } else {
        alert('Movie is already in the watchlist!');
      }
    });
  });
});



const addToWatchlistButton = document.getElementById('addToWatchlistButton');
addToWatchlistButton.addEventListener('click', addToWatchlist);

function addToWatchlist() {
  // Retrieve watchlist from localStorage
  let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

  // Get the movie details from the page
  const movieTitleElement = document.getElementById('title');
  const movieYearElement = document.getElementById('year');
  const movieRatingElement = document.getElementById('rating');
  const moviePosterElement = document.getElementById('poster');

  // Check if the movie details are available
  if (!movieTitleElement || !movieYearElement || !movieRatingElement || !moviePosterElement) {
    console.log('Movie details not found.');
    return;
  }

  const movieTitle = movieTitleElement.textContent;
  const movieYear = movieYearElement.textContent.replace('Year:', '').trim();
  const movieRating = movieRatingElement.textContent.replace('Rating:', '').trim();
  const moviePoster = moviePosterElement.src;

  // Check if the movie already exists in the watchlist
  const isMovieExists = watchlist.some((item) => item.title === movieTitle);
  if (isMovieExists) {
    alert('Movie is already in the watchlist!');
    return;
  }

  // Create an object to store the movie details
  const movie = {
    title: movieTitle,
    year: movieYear,
    rating: movieRating,
    poster: moviePoster
  };

  // Save the movie object to local storage
  watchlist.push(movie);
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
  alert('Movie added to watchlist!');
}




// Add event listener to back button
const backButton = document.getElementById('backButton');
backButton.addEventListener('click', () => {
  window.history.back();
});
