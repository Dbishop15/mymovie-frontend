import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  getUserMovies,
  updateMovie,
  deleteMovieById,
} from "../services/apiService";
import "../components/Mylist.css";
import Movies from "./Movies";
import EditMovieModal from "./EditMovieModal";

const MyList = ({ user }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    if (user && user.id) {
      fetchUserMovies();
    }
  }, [user]);

  const fetchUserMovies = async () => {
    try {
      const response = await getUserMovies(user.id);
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching user movies:", error);
    }
  };

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
      setEditModalOpen(false); // Close the modal after saving
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
              key={movie.id} // Ensure each movie in the watchlist has a unique key
              movie={movie}
              user={user}
              onDelete={handleDelete} // Pass the handleDelete function
              onEdit={handleEdit} // Pass the handleEdit function
              showDeleteButton={true}
              showWatchlistButtons={false}
              showEditButton={true} // Show the edit button only in MyList
            />
          ))
        ) : (
          <p>You have no movies in your list.</p>
        )}
      </div>
      <EditMovieModal
        movie={selectedMovie}
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};

MyList.propTypes = {
  user: PropTypes.object.isRequired,
};

export default MyList;
