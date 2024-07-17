import { jwtDecode } from "jwt-decode";
export const setToken = (token) => {
  localStorage.setItem("jwtToken", token);
};

export const getToken = () => {
  return localStorage.getItem("jwtToken");
};

export const clearToken = () => {
  localStorage.removeItem("token");
};
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const parseJwt = (token) => {
  try {
    return jwtDecode(token);
  } catch (e) {
    console.error("Failed to decode JWT", e);
    return null;
  }
};
