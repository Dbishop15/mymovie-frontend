import axios from "axios";

const url = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

const getMovies = async () => {
  try {
    const response = await url.get("/movies");
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

const saveMovie = async (movie) => {
  try {
    const response = await url.post("/movies", movie);
    return response.data;
  } catch (error) {
    console.error("Error saving movie:", error);
    throw error;
  }
};

const updateMovie = async (id, movie) => {
  try {
    const response = await url.put(`/movies/${id}`, movie);
    return response.data;
  } catch (error) {
    console.error("Error updating movie:", error);
    throw error;
  }
};

const updateMovieById = (id, updatedMovie) =>
  url.put(`/movies/${id}`, updatedMovie);

const deleteMovieById = async (id) => {
  try {
    const response = await url.delete(`/movies/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};

const signup = (username, email, password) =>
  url.post("/register", { username, email, password });

const login = (username, password) =>
  url.post("/login", { username, password });

const getMovieDetails = (id) => url.get(`/movies/${id}`);

const getWatchlistMovies = async () => {
  try {
    const response = await url.get("/movies/watchlist");
    return response.data;
  } catch (error) {
    console.error("Error fetching watchlist movies:", error);
    throw error;
  }
};

const updateWatchlistStatus = async (movieId, status) => {
  try {
    const response = await url.put(`/watchlist/${movieId}`, null, {
      params: { status },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating watchlist status:", error);
    throw error;
  }
};

const getUserWatchlist = async (userId) => {
  try {
    const response = await url.get(`/movies/user/${userId}/watchlist`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user watchlist:", error);
    throw error;
  }
};
const getUserMovies = async (userId) => {
  try {
    const response = await url.get(`/movies/user/${userId}`);
    return response;
  } catch (error) {
    console.error("Error fetching user movies:", error);
    throw error;
  }
};

const getWatchlist = async (userId) => {
  try {
    const response = await url.get(`/watchlist/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    throw error;
  }
};

const addToWatchlist = async (userId, movieId) => {
  try {
    const response = await url.post(`/watchlist`, {
      user: { id: userId },
      movie: { id: movieId },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    throw error;
  }
};

const deleteFromWatchlist = async (userId, movieId) => {
  try {
    const response = await url.delete(`/watchlist/${userId}/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting from watchlist:", error);
    throw error;
  }
};
export {
  getMovies,
  saveMovie,
  deleteMovieById,
  signup,
  login,
  updateMovieById,
  getWatchlist,
  getMovieDetails,
  getWatchlistMovies,
  getUserWatchlist,
  updateWatchlistStatus,
  getUserMovies,
  updateMovie,
  addToWatchlist,
  deleteFromWatchlist,
};
