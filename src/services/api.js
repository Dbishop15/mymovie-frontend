import { url } from "../services/axiosInstance";
import { authURL } from "../services/authURL";

// Login function using baseURL
const login = async (username, password) => {
  try {
    const response = await url.post("/login", { username, password });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

const signup = (username, email, password) =>
  url.post("/register", { username, email, password });
// Function to get a protected resource
const getProtectedResource = async () => {
  try {
    const response = await url.get("/protected-endpoint");
    return response.data;
  } catch (error) {
    console.error("Error fetching protected resource:", error);
    throw error;
  }
};

const getCurrentUser = async (userId) => {
  try {
    const response = await authURL.get(`/movies/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

// Movie-related API calls
const getMovies = async () => {
  try {
    const response = await authURL.get("/movies");
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

const getMovieDetails = async (id) => {
  try {
    const response = await authURL.get(`/movies/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

const saveMovie = async (movie) => {
  try {
    const response = await authURL.post("/movies", movie);
    return response.data;
  } catch (error) {
    console.error("Error saving movie:", error);
    throw error;
  }
};

const updateMovie = async (id, movie) => {
  try {
    const response = await authURL.put(`/movies/${id}`, movie);
    return response.data;
  } catch (error) {
    console.error("Error updating movie:", error);
    throw error;
  }
};

const deleteMovieById = async (id) => {
  try {
    const response = await authURL.delete(`/movies/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};

// Fetch watchlist using authURL
const getWatchlist = async (userId) => {
  try {
    const response = await authURL.get(`/watchlist/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    throw error;
  }
};

const getWatchlistMovies = async () => {
  try {
    const response = await authURL.get("/movies/watchlist");
    return response.data;
  } catch (error) {
    console.error("Error fetching watchlist movies:", error);
    throw error;
  }
};

// Function to add a movie to the watchlist
const saveWatchlist = async (userId, movieId) => {
  try {
    const response = await authURL.post("/watchlist", {
      userId: userId,
      movieId: movieId,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    throw error;
  }
};

const deleteFromWatchlist = async (userId, movieId) => {
  try {
    const response = await authURL.delete(`/watchlist/${userId}/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting from watchlist:", error);
    throw error;
  }
};

const updateWatchlistStatus = async (movieId, status) => {
  try {
    const response = await authURL.put(
      `/watchlist/${movieId}?status=${status}`
    );
    return response.data;
  } catch (error) {
    console.error("Error updating watchlist status:", error);
    throw error;
  }
};

// User-specific movie-related API calls
const getUserMovies = async (userId) => {
  try {
    const response = await authURL.get(`/movies/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user movies:", error);
    throw error;
  }
};

const getUserWatchlist = async (userId) => {
  try {
    const response = await authURL.get(`/movies/user/${userId}/watchlist`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user watchlist:", error);
    throw error;
  }
};

export {
  login,
  signup,
  getProtectedResource,
  getMovies,
  getMovieDetails,
  saveMovie,
  updateMovie,
  deleteMovieById,
  getWatchlist,
  getWatchlistMovies,
  saveWatchlist,
  deleteFromWatchlist,
  updateWatchlistStatus,
  getUserMovies,
  getUserWatchlist,
  getCurrentUser,
};
