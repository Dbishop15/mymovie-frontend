import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getUserMovies, updateMovie, deleteMovieById } from "../services/api";
import "../components/Mylist.css";
import Movies from "./Movies";
import EditMovieModal from "./EditMovieModal";

const Mylist = ({ user }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserMovies = async () => {
      try {
        if (user && user.userId) {
          const userMovies = await getUserMovies(user.userId);
          console.log("Fetched user movies:", userMovies);
          setMovies(userMovies);
        } else {
          console.log("User or user ID is undefined");
        }
      } catch (error) {
        console.error("Error fetching user movies:", error);
      }
    };

    fetchUserMovies();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await deleteMovieById(id);
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error("Failed to delete movie", error);
    }
  };

  const handleEdit = (movie) => {
    setSelectedMovie(movie);
    setEditModalOpen(true);
  };

  const handleSave = async (updatedMovie) => {
    try {
      await updateMovie(updatedMovie.id, updatedMovie);
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie.id === updatedMovie.id ? updatedMovie : movie
        )
      );
      setEditModalOpen(false);
    } catch (error) {
      console.error("Failed to update movie", error);
    }
  };

  return (
    <div className="mylist-container">
      <h2 className="mylist-title">My Added Movies</h2>
      <div className="movies-grid">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Movies
              key={movie.id}
              movie={movie}
              user={user}
              onDelete={handleDelete}
              onEdit={handleEdit}
              showDeleteButton={true}
              showWatchlistButtons={false}
              showEditButton={true}
            />
          ))
        ) : (
          <p>You have no movies in your list.</p>
        )}
      </div>
      {selectedMovie && (
        <EditMovieModal
          movie={selectedMovie}
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

Mylist.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Mylist;
