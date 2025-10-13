import React from 'react';
import '../css/styles.css'; 
import { Link } from 'react-router-dom';

function BookSphere() {
  return (
    <>
      <header className="header">
        <div className="brand-group">
          <div className="logo">BookSphere | </div>
          <div className="tagline-in-header">WHERE EVERY PAGE OPENS A NEW WORLD</div>
        </div>

        <nav className="nav-links">
          <Link to="/home">HOME</Link>
          <Link to="/dashboard">DASHBOARD</Link>
          <Link to="/books">BOOKS</Link>
        </nav>
      </header>

      <div className="container">
      </div>

      <footer className="footer">
        <div className="footer-content">
          <span>&copy; 2025 BookSphere Inc. All rights reserved.</span>
        </div>
      </footer>
    </>
  );
}

export default BookSphere;