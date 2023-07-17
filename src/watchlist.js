// Get the watchlist from local storage
let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

// Display watchlist items
const watchlistContainer = document.getElementById('watchlist');

function displayWatchlist() {
  watchlistContainer.innerHTML = '';

  watchlist.forEach((movie, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <div class="poster">
          <a href="movie.html?id=${movie.id}">
            <img src="${movie.poster}" alt="${movie.title} Poster" width="300">
          </a>
      </div>
      <div>
        <h2>
          ${movie.title}
        </h2>
        <div class="movie-actions">
          <label for="watchStatus_${index}">Watch Status:</label>
          <button id="watchStatus_${index}_not_watched" onclick="updateWatchStatus(${index}, 'Not Watched')" ${movie.watchStatus === 'Not Watched' ? 'class="active"' : ''}>Not Watched</button>
          <button id="watchStatus_${index}_watched" onclick="updateWatchStatus(${index}, 'Watched')" ${movie.watchStatus === 'Watched' ? 'class="active"' : ''}>Watched</button>
          <button onclick="deleteMovie(${index})" class="delete-button">Delete</button>
        </div>
      </div>
      <div class="watch-status">
        <strong>Watch Status:</strong> ${movie.watchStatus}
      </div>
    `;
    watchlistContainer.appendChild(listItem);
  });
}

// Add "watchStatus" property to each movie in watchlist if not already present
watchlist = watchlist.map((movie) => {
  if (!movie.hasOwnProperty('watchStatus')) {
    movie.watchStatus = 'Not Watched';
  }
  return movie;
});

function updateWatchStatus(index, status) {
  watchlist[index].watchStatus = status;
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
  displayWatchlist();
}

function deleteMovie(index) {
  watchlist.splice(index, 1);
  localStorage.setItem('watchlist', JSON.stringify(watchlist));
  displayWatchlist();
}

displayWatchlist();


// watchlist.js
document.addEventListener('DOMContentLoaded', () => {
  const backButton = document.getElementById('backButton');

  backButton.addEventListener('click', () => {
    window.history.back();
  });
});
