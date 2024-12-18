const movies = [
    { title: "Inception", genre: "Sci-Fi", rating: 8.8, releaseYear: 2010 },
    { title: "The Dark Knight", genre: "Action", rating: 9.0, releaseYear: 2008 },
    { title: "Interstellar", genre: "Sci-Fi", rating: 8.6, releaseYear: 2014 }
];

const movieListElement = document.getElementById('movie-list');
const genreFilterElement = document.getElementById('genre-filter');
const outputElement = document.getElementById('output');


const renderMovieList = (moviesToDisplay) => {
    movieListElement.innerHTML = '';
    moviesToDisplay.forEach(movie => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${movie.title}</strong> (${movie.releaseYear})
            <br>Genre: ${movie.genre} | Rating: ${movie.rating}
        `;
        movieListElement.appendChild(li);
    });
};


const addMovie = (movie) => {
    movies.push(movie);
    renderMovieList(movies); 
};


const filterMoviesByGenre = (genre) => {
    const filteredMovies = genre ? movies.filter(movie => movie.genre === genre) : movies;
    renderMovieList(filteredMovies);
};


const findHighestRatedMovie = () => {
    return movies.reduce((highest, movie) => (movie.rating > highest.rating ? movie : highest), movies[0]);
};


const getMovieTitles = () => {
    return movies.map(movie => movie.title);
};


const moviesAfterYear = (year) => {
    return movies.filter(movie => movie.releaseYear > year);
};


const displayResults = () => {
    const highestRated = findHighestRatedMovie();
    const titles = getMovieTitles();
    const recentMovies = moviesAfterYear(2010);

    outputElement.innerHTML = `
        <p><strong>Highest Rated Movie:</strong> ${highestRated.title} (${highestRated.rating})</p>
        <p><strong>All Movie Titles:</strong> ${titles.join(', ')}</p>
        <p><strong>Movies Released After 2010:</strong> ${recentMovies.map(m => m.title).join(', ')}</p>
    `;
};


document.getElementById('add-movie-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const genre = document.getElementById('genre').value;
    const rating = parseFloat(document.getElementById('rating').value);
    const releaseYear = parseInt(document.getElementById('releaseYear').value);

    if (title && genre && !isNaN(rating) && !isNaN(releaseYear)) {
        addMovie({ title, genre, rating, releaseYear });
        e.target.reset(); // Clear form
        displayResults(); // Update results
    } else {
        alert("Please fill in all fields!");
    }
});


genreFilterElement.addEventListener('change', (e) => {
    filterMoviesByGenre(e.target.value);
});

renderMovieList(movies);
displayResults();
