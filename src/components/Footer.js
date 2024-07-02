import React from "react";
import "../components/styles.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer-text">
        @{currentYear} MyMovies, All rights reserved
      </p>
    </footer>
  );
}
