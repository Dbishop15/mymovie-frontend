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

// export const parseJwt = (token) => {
//   try {
//     const base64Url = token.split(".")[1];
//     const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//     const jsonPayload = decodeURIComponent(
//       atob(base64)
//         .split("")
//         .map((c) => {
//           return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
//         })
//         .join("")
//     );

//     const parsedPayload = JSON.parse(jsonPayload);
//     if (parsedPayload.userId) {
//       parsedPayload.userId = parseInt(parsedPayload.userId, 10);
//     }
//     return parsedPayload;
//   } catch (error) {
//     console.error("Failed to parse JWT token:", error);
//     return null;
//   }
// };
