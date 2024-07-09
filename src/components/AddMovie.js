import React, { useState } from "react";
import PropTypes from "prop-types";
import { saveMovie } from "../services/api";
import { Link } from "react-router-dom";
import "./AddMovie.css";

const AddMovie = ({ user }) => {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");
  const [url, setUrl] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState({});

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const newMovie = {
      title,
      director,
      releaseYear: parseInt(releaseYear, 10),
      genre,
      rating: parseFloat(rating),
      url,
      watchlist: false,
      user: { id: user.userId }, // Ensure proper user structure
    };
    try {
      console.log("Submitting movie:", newMovie);
      await saveMovie(newMovie);
      setTitle("");
      setDirector("");
      setReleaseYear("");
      setGenre("");
      setRating("");
      setUrl("");
      setShowSuccessModal(true); // Show success modal
    } catch (error) {
      console.error("Error saving movie:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="add-movie-container">
        <h2 className="add-movie-title">Add New Movie</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            {errors.title && <p className="error">{errors.title}</p>}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Director"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
              required
            />
            {errors.director && <p className="error">{errors.director}</p>}
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="Release Year"
              value={releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
              required
            />
            {errors.releaseYear && (
              <p className="error">{errors.releaseYear}</p>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />
            {errors.genre && <p className="error">{errors.genre}</p>}
          </div>
          <div className="form-group">
            <input
              type="number"
              step="0.1"
              placeholder="Rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
            {errors.rating && <p className="error">{errors.rating}</p>}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            {errors.url && <p className="error">{errors.url}</p>}
          </div>
          <button type="submit">Add Movie</button>
          <Link to="/movies" className="add-movie-nav">
            Back to MyMovies
          </Link>
        </form>
        {showSuccessModal && (
          <div className="success-modal">
            <div className="modal-content">
              <h3 className="success-modal-title">Movie added successfully!</h3>
              <p className="add-movie-para">
                Your movie has been added to MyList.
              </p>
              <Link to="/mylist" className="navigate-link">
                Back to MyMovies
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

AddMovie.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AddMovie;
// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import { saveMovie } from "../services/api";
// import { Link } from "react-router-dom";
// import "./AddMovie.css";

// const AddMovie = ({ user }) => {
//   const [title, setTitle] = useState("");
//   const [director, setDirector] = useState("");
//   const [releaseYear, setReleaseYear] = useState("");
//   const [genre, setGenre] = useState("");
//   const [rating, setRating] = useState("");
//   const [url, setUrl] = useState("");
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     const newErrors = {};
//     if (!title.trim()) newErrors.title = "Title is required.";
//     if (!director.trim()) newErrors.director = "Director is required.";
//     const year = parseInt(releaseYear, 10);
//     if (!releaseYear || isNaN(year) || year < 1900 || year > 2100)
//       newErrors.releaseYear =
//         "Release year must be a number between 1900 and 2100.";
//     if (!genre.trim()) newErrors.genre = "Genre is required.";
//     const rate = parseFloat(rating);
//     if (rating && (isNaN(rate) || rate < 0 || rate > 10))
//       newErrors.rating = "Rating must be a number between 0 and 10.";
//     const urlPattern = new RegExp(
//       "^(https?:\\/\\/)" +
//         "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" +
//         "((\\d{1,3}\\.){3}\\d{1,3}))" +
//         "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
//         "(\\?[;&a-z\\d%_.~+=-]*)?" +
//         "(\\#[-a-z\\d_]*)?$",
//       "i"
//     );
//     if (url && !urlPattern.test(url)) newErrors.url = "URL is not valid.";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     const newMovie = {
//       title,
//       director,
//       releaseYear: parseInt(releaseYear, 10),
//       genre,
//       rating: parseFloat(rating),
//       url,
//       watchlist: false,
//       user: { id: user.id }, // Ensure proper user structure
//     };
//     try {
//       console.log("Submitting movie:", newMovie);
//       await saveMovie(newMovie);
//       setTitle("");
//       setDirector("");
//       setReleaseYear("");
//       setGenre("");
//       setRating("");
//       setUrl("");
//       setShowSuccessModal(true);
//     } catch (error) {
//       console.error("Error saving movie:", error);
//     }
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="add-movie-container">
//         <h2 className="add-movie-title">Add New Movie</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <input
//               type="text"
//               placeholder="Title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//             {errors.title && <p className="error">{errors.title}</p>}
//           </div>
//           <div className="form-group">
//             <input
//               type="text"
//               placeholder="Director"
//               value={director}
//               onChange={(e) => setDirector(e.target.value)}
//               required
//             />
//             {errors.director && <p className="error">{errors.director}</p>}
//           </div>
//           <div className="form-group">
//             <input
//               type="number"
//               placeholder="Release Year"
//               value={releaseYear}
//               onChange={(e) => setReleaseYear(e.target.value)}
//               required
//             />
//             {errors.releaseYear && (
//               <p className="error">{errors.releaseYear}</p>
//             )}
//           </div>
//           <div className="form-group">
//             <input
//               type="text"
//               placeholder="Genre"
//               value={genre}
//               onChange={(e) => setGenre(e.target.value)}
//               required
//             />
//             {errors.genre && <p className="error">{errors.genre}</p>}
//           </div>
//           <div className="form-group">
//             <input
//               type="number"
//               step="0.1"
//               placeholder="Rating"
//               value={rating}
//               onChange={(e) => setRating(e.target.value)}
//             />
//             {errors.rating && <p className="error">{errors.rating}</p>}
//           </div>
//           <div className="form-group">
//             <input
//               type="text"
//               placeholder="URL"
//               value={url}
//               onChange={(e) => setUrl(e.target.value)}
//             />
//             {errors.url && <p className="error">{errors.url}</p>}
//           </div>
//           <button type="submit">Add Movie</button>
//           <Link to="/movies" className="add-movie-nav">
//             Back to MyMovies
//           </Link>
//         </form>
//         {showSuccessModal && (
//           <div className="success-modal">
//             <div className="modal-content">
//               <h3 className="success-modal-title">Movie added successfully!</h3>
//               <p className="add-movie-para">
//                 Your movie has been added to MyList.
//               </p>
//               <Link to="/mylist" className="navigate-link">
//                 Back to MyMovies
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// AddMovie.propTypes = {
//   user: PropTypes.object.isRequired,
// };

// export default AddMovie;
