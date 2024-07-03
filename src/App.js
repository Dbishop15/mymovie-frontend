import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MoviesGrid from "./components/MoviesGrid";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import {
  getMovies,
  updateWatchlistStatus,
  getWatchlist,
} from "./services/apiService";
import WatchList from "./components/WatchList";
import AddMovie from "./components/AddMovie";
import Mylist from "./components/Mylist";

function App() {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  const handleGetMovies = async () => {
    try {
      const fetchedMovies = await getMovies();
      setMovies(fetchedMovies);
    } catch (error) {
      console.error("Failed to fetch movies", error);
    }
  };

  const handleGetWatchlist = async () => {
    try {
      const fetchedWatchlist = await getWatchlist(user.id);
      setWatchlist(fetchedWatchlist.map((movie) => movie.id)); // Store only movie IDs in watchlist
    } catch (error) {
      console.error("Failed to fetch watchlist", error);
    }
  };

  const handleUpdateWatchlistStatus = async (id, status) => {
    try {
      await updateWatchlistStatus(id, status);
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie.id === id ? { ...movie, watchlist: status } : movie
        )
      );
      handleGetWatchlist();
    } catch (error) {
      console.error("There was an error updating the movie!", error);
    }
  };

  const handleAddMovie = (newMovie) => {
    setMovies((prevMovies) => [...prevMovies, newMovie]);
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

    fetchMovies();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header user={user} setUser={setUser} />
        {!user && <Home />}
        <h1>{ProcessingInstruction.env.WELCOME_TEXT || "hello Everyone"}</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Signup setUser={setUser} />} />
          <Route
            path="/addmovie"
            element={
              user ? (
                <AddMovie user={user} onAddMovie={handleAddMovie} />
              ) : (
                <Login setUser={setUser} />
              )
            }
          />
          <Route
            path="/movies"
            element={
              user ? (
                <MoviesGrid
                  user={user}
                  movies={movies}
                  setMovies={setMovies}
                  updateWatchlistStatus={handleUpdateWatchlistStatus}
                  handleGetMovies={handleGetMovies}
                />
              ) : (
                <Login setUser={setUser} />
              )
            }
          />
          <Route
            path="/watchlist"
            element={
              user ? (
                <WatchList
                  user={user}
                  movies={movies}
                  setMovies={setMovies}
                  updateWatchlistStatus={handleUpdateWatchlistStatus}
                  watchlist={watchlist}
                  handleGetWatchlist={handleGetWatchlist}
                />
              ) : (
                <Login setUser={setUser} />
              )
            }
          />
          <Route
            path="/mylist"
            element={
              user ? <Mylist user={user} /> : <Login setUser={setUser} />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
