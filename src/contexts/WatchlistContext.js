import React, { createContext, useState, useEffect } from "react";
import {
  getWatchlist,
  saveWatchlist,
  deleteFromWatchlist,
} from "../services/api";

export const WatchlistContext = createContext();
debugger;
export const WatchlistProvider = ({ children, user }) => {
  const [watchlist, setWatchlist] = useState([]);
  debugger;
  useEffect(() => {
    if (user && user.id) {
      fetchUserWatchlist(user.id);
    }
  }, [user]);

  const fetchUserWatchlist = async (userId) => {
    try {
      const watchlistData = await getWatchlist(userId);
      setWatchlist(watchlistData);
    } catch (error) {
      console.error("Error fetching watchlist:", error);
    }
  };

  const addToWatchlist = async (movie) => {
    if (!user || !user.id) {
      console.error("User is not defined");
      return;
    }
    try {
      const updatedWatchlist = await saveWatchlist(user.id, movie);
      setWatchlist(updatedWatchlist);
    } catch (error) {
      console.error("Error adding to watchlist:", error);
    }
  };

  const removeFromWatchlist = async (movieId) => {
    if (!user || !user.id) {
      console.error("User is not defined");
      return;
    }
    try {
      const updatedWatchlist = await deleteFromWatchlist(user.id, movieId);
      setWatchlist(updatedWatchlist);
    } catch (error) {
      console.error("Error removing from watchlist:", error);
    }
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};
