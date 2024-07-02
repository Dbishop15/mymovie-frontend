import React, { useState, useEffect } from "react";
import Movies from "./Movies";
import "../components/WatchList.css";
import {
  addToWatchlist,
  updateWatchlistStatus,
  getMovies,
  getWatchlist,
} from "../services/apiService";

export default function MoviesGrid({
  user,
  movies = [],
  setMovies,
  updateWatchlistStatus,
  onDelete,
  onEdit,
  handleGetMovies,
}) {
  const [watchlist, setWatchlist] = useState([]);

  const [search, setSearch] = useState("");
  const [director, setDirector] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");

  const searchHandler = (e) => setSearch(e.target.value);
  const directorHandler = (e) => setDirector(e.target.value);
  const releaseYearHandler = (e) => setReleaseYear(e.target.value);
  const genreHandler = (e) => setGenre(e.target.value);
  const ratingHandler = (e) => setRating(e.target.value);

  const filteredMovies = movies.filter((movie) => {
    return (
      (!search || movie.title.toLowerCase().includes(search.toLowerCase())) &&
      (!director || movie.director === director) &&
      (!releaseYear ||
        (releaseYear === "<1990" && movie.releaseYear < 1990) ||
        (releaseYear === "1990-2000" &&
          movie.releaseYear >= 1990 &&
          movie.releaseYear <= 2000) ||
        (releaseYear === "2001-2010" &&
          movie.releaseYear >= 2001 &&
          movie.releaseYear <= 2010) ||
        (releaseYear === "2011-2020" &&
          movie.releaseYear >= 2011 &&
          movie.releaseYear <= 2020) ||
        (releaseYear === ">2021" && movie.releaseYear > 2021)) &&
      (!genre || movie.genre === genre) &&
      (!rating ||
        (rating === "0-3.9" && movie.rating >= 0 && movie.rating <= 3.9) ||
        (rating === "4.0-7.9" && movie.rating >= 4.0 && movie.rating <= 7.9) ||
        (rating === "8.0-10.0" && movie.rating >= 8.0 && movie.rating <= 10.0))
    );
  });

  const handleAddToWatchlist = async (movieId) => {
    try {
      await addToWatchlist(user.id, movieId);
      setWatchlist((prevWatchlist) => [...prevWatchlist, movieId]);
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie.id === movieId ? { ...movie, watchlist: true } : movie
        )
      );
      console.log("Movie added to watchlist:", movieId);
    } catch (error) {
      console.error("Failed to add movie to watchlist", error);
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getMovies();
        setMovies(moviesData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const fetchWatchlist = async () => {
      try {
        const watchlistData = await getWatchlist(user.id);
        setWatchlist(watchlistData.map((movie) => movie.id)); // Store only movie IDs in watchlist
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    };

    fetchMovies();
    fetchWatchlist();
  }, [user.id]);

  return (
    <div className="watchlist-container">
      <div className="search">
        <div className="search-box">
          <label className="search-label">Search: </label>
          <input
            type="text"
            className="search-input"
            placeholder="Search movie"
            value={search}
            onChange={searchHandler}
          />
        </div>
        <div className="filter">
          <div className="filter-slot">
            <label>Director: </label>
            <select className="filter-dropdown" onChange={directorHandler}>
              <option value="">Select a director</option>
              {[...new Set(movies.map((movie) => movie.director))].map(
                (director, index) => (
                  <option key={index} value={director}>
                    {director}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="filter-slot">
            <label>Release Year: </label>
            <select className="filter-dropdown" onChange={releaseYearHandler}>
              <option value="">Select a release year</option>
              <option value="<1990">Before 1990</option>
              <option value="1990-2000">1990-2000</option>
              <option value="2001-2010">2001-2010</option>
              <option value="2011-2020">2011-2020</option>
              <option value=">2021">After 2021</option>
            </select>
          </div>
          <div className="filter-slot">
            <label>Genre: </label>
            <select className="filter-dropdown" onChange={genreHandler}>
              <option value="">Select a genre</option>
              {[...new Set(movies.map((movie) => movie.genre))].map(
                (genre, index) => (
                  <option key={index} value={genre}>
                    {genre}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="filter-slot">
            <label>Rating: </label>
            <select className="filter-dropdown" onChange={ratingHandler}>
              <option value="">Select a rating</option>
              <option value="0-3.9">0-3.9</option>
              <option value="4.0-7.9">4.0-7.9</option>
              <option value="8.0-10.0">8.0-10.0</option>
            </select>
          </div>
        </div>
      </div>
      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <Movies
            key={movie.id}
            movie={movie}
            user={user}
            showDeleteButton={false}
            updateWatchlistStatus={updateWatchlistStatus}
            showWatchlistButtons={!watchlist.includes(movie.id)} // Show add button if movie is not in watchlist
            handleAddToWatchlist={handleAddToWatchlist}
            inWatchlist={watchlist.includes(movie.id)}
            inWatchlistContext={false} // Not in the watchlist context
          />
        ))}
      </div>
    </div>
  );
}
