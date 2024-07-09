import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MoviesGrid from "./components/MoviesGrid";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import WatchList from "./components/WatchList";
import AddMovie from "./components/AddMovie";
import Mylist from "./components/Mylist";
import { getCurrentUser } from "./services/auth";
import { getMovies } from "./services/api";

function App() {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);

  const handleGetMovies = async () => {
    try {
      const fetchedMovies = await getMovies();
      setMovies(fetchedMovies);
    } catch (error) {
      console.error("Failed to fetch movies", error);
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

  useEffect(() => {
    const fetchUser = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
    };
    fetchUser();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header user={user} setUser={setUser} />
        {!user && <Home />}

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
                <WatchList user={user} movies={movies} setMovies={setMovies} />
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
