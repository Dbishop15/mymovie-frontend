import axios from "axios";

// Base Axios instance without JWT token
export const url = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});
