import React from 'react';
import '../css/styles.css'; 

function BookSphere() {
  return (
    <>
      <header className="header">
        <div className="brand-group">
          <div className="logo">BookSphere | </div>
          <div className="tagline-in-header">WHERE EVERY PAGE OPENS A NEW WORLD</div>
        </div>

        <nav className="nav-links">
          <a href="#">HOME</a>
          <a href="#">DASHBOARD</a>
          <a href="#">BOOKS</a>
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