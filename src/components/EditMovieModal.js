import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../components/Mylist.css";
import "../components/EditMovieModal.css";

const EditMovieModal = ({ movie, isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen && movie) {
      setTitle(movie.title);
      setDirector(movie.director);
      setReleaseYear(movie.releaseYear);
      setGenre(movie.genre);
      setRating(movie.rating);
      setUrl(movie.url);
    }
  }, [isOpen, movie]);

  const validateForm = () => {
    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = "Title is required.";
    }
    if (!director.trim()) {
      newErrors.director = "Director is required.";
    }
    const year = parseInt(releaseYear, 10);
    if (!releaseYear || isNaN(year) || year < 1900 || year > 2100) {
      newErrors.releaseYear =
        "Release year must be a number between 1900 and 2100.";
    }
    if (!genre.trim()) {
      newErrors.genre = "Genre is required.";
    }
    const rate = parseFloat(rating);
    if (rating && (isNaN(rate) || rate < 0 || rate > 10)) {
      newErrors.rating = "Rating must be a number between 0 and 10.";
    }
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    if (url && !urlPattern.test(url)) {
      newErrors.url = "URL is not valid.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }
    const updatedMovie = {
      ...movie,
      title,
      director,
      releaseYear,
      genre,
      rating,
      url,
    };
    onSave(updatedMovie);
  };

  if (!isOpen || !movie) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Edit Movie</h2>
        <form>
          <div className="form-group">
            <input
              type="text"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p className="error">{errors.title}</p>}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Director"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
            />
            {errors.director && <p className="error">{errors.director}</p>}
          </div>
          <div className="form-group">
            <input
              type="number"
              value={releaseYear}
              placeholder="Release Year"
              onChange={(e) => setReleaseYear(e.target.value)}
            />
            {errors.releaseYear && (
              <p className="error">{errors.releaseYear}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              value={genre}
              placeholder="Genre"
              onChange={(e) => setGenre(e.target.value)}
            />
            {errors.genre && <p className="error">{errors.genre}</p>}
          </div>
          <div className="form-group">
            <input
              type="number"
              step="0.1"
              value={rating}
              placeholder="Rating"
              onChange={(e) => setRating(e.target.value)}
            />
            {errors.rating && <p className="error">{errors.rating}</p>}
          </div>
          <div className="form-group">
            <input
              type="text"
              value={url}
              placeholder="URL"
              onChange={(e) => setUrl(e.target.value)}
            />
            {errors.url && <p className="error">{errors.url}</p>}
          </div>
          <div className="modal-actions">
            <button type="button" onClick={handleSave}>
              Save
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditMovieModal.propTypes = {
  movie: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditMovieModal;
