import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPlus,
  faMinus,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import "../components/Movies.css";

export default function Movies({
  movie,
  user,
  onDelete,
  showDeleteButton,
  updateWatchlistStatus,
  showEditButton,
  showWatchlistButtons,
  onEdit,
  handleAddToWatchlist,
  inWatchlist = false,
  inWatchlistContext = false,
}) {
  const [isInWatchlist, setIsInWatchlist] = useState(inWatchlist);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setIsInWatchlist(inWatchlist);
  }, [inWatchlist]);

  const handleAdd = async () => {
    setIsAdding(true);
    await handleAddToWatchlist(movie.id);
    setIsInWatchlist(true);
    setIsAdding(false);
  };

  const handleRemove = async () => {
    await updateWatchlistStatus(movie.id, false);
    setIsInWatchlist(false);
  };

  return (
    <div className="movie">
      <div className="movie-header">
        {showWatchlistButtons && !inWatchlistContext && !isInWatchlist && (
          <button
            className="add-to-watchlist"
            onClick={handleAdd}
            disabled={isAdding}
          >
            <FontAwesomeIcon icon={faPlus} /> Add to Watchlist
          </button>
        )}
        {inWatchlistContext && (
          <button className="remove-from-watchlist" onClick={handleRemove}>
            <FontAwesomeIcon icon={faMinus} /> Remove from Watchlist
          </button>
        )}
        {showEditButton && user && (
          <button className="edit" onClick={() => onEdit(movie)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
        )}
        {showDeleteButton && user && (
          <button className="delete" onClick={() => onDelete(movie.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        )}
      </div>
      <img src={movie.url} alt={movie.title} className="movie-image" />
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-director">{movie.director}</p>
        <p className="movie-releaseYear">{movie.releaseYear}</p>
        <p className="movie-genre">{movie.genre}</p>
        <p className="movie-rating">Rating: {movie.rating}</p>
      </div>
    </div>
  );
}

Movies.propTypes = {
  movie: PropTypes.object.isRequired,
  user: PropTypes.object,
  onDelete: PropTypes.func,
  updateWatchlistStatus: PropTypes.func,
  showDeleteButton: PropTypes.bool.isRequired,
  showEditButton: PropTypes.bool,
  showWatchlistButtons: PropTypes.bool,
  onEdit: PropTypes.func,
  handleAddToWatchlist: PropTypes.func,
  inWatchlist: PropTypes.bool,
  inWatchlistContext: PropTypes.bool,
};
