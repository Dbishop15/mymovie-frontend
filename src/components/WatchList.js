import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Movies from "./Movies";
import "../components/WatchList.css";
import { getWatchlist, deleteFromWatchlist } from "../services/apiService";

export default function WatchList({ user }) {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const watchlistData = await getWatchlist(user.id);
        setWatchlist(Array.isArray(watchlistData) ? watchlistData : []);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
        setWatchlist([]);
      }
    };

    fetchWatchlist();
  }, [user.id]);

  const handleRemoveFromWatchlist = async (movieId) => {
    try {
      await deleteFromWatchlist(user.id, movieId);
      setWatchlist((prevMovies) =>
        prevMovies.filter((movie) => movie.id !== movieId)
      );
      console.log("Movie removed from watchlist:", movieId);
    } catch (error) {
      console.error("Failed to remove movie from watchlist", error);
    }
  };

  return (
    <div className="watchlist-container">
      <h2 className="watchlist-title">My Watchlist</h2>
      <div className="movies-grid">
        {watchlist.length > 0 ? (
          watchlist.map((movie) => (
            <Movies
              key={movie.id}
              movie={movie}
              user={user}
              showDeleteButton={false}
              updateWatchlistStatus={handleRemoveFromWatchlist}
              showWatchlistButtons={false} // We don't show add to watchlist button here
              inWatchlistContext={true}
            />
          ))
        ) : (
          <p>Your watchlist is empty.</p>
        )}
      </div>
    </div>
  );
}

WatchList.propTypes = {
  user: PropTypes.object.isRequired,
  setMovies: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
