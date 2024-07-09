// import { useState, useEffect } from "react";
// import { getToken, clearToken } from "../../services/auth";
// import { useNavigate } from "react-router-dom";

// const useAuth = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = getToken();
//     if (token) {
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//   }, []);

//   const logout = () => {
//     clearToken();
//     setIsAuthenticated(false);
//     navigate("/login");
//   };

//   return { isAuthenticated, logout };
// };

// export default useAuth;
