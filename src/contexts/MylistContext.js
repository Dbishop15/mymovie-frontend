// // src/contexts/MyListContext.js
// import React, { createContext, useState, useContext } from "react";

// const MylistContext = createContext();

// export const MylistProvider = ({ children }) => {
//   const [movies, setMovies] = useState([]);

//   return (
//     <MylistContext.Provider value={{ movies, setMovies }}>
//       {children}
//     </MylistContext.Provider>
//   );
// };

// export const useMyList = () => {
//   return useContext(MylistContext);
// };
