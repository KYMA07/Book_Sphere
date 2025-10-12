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

      </header>

      <div className="container">
        <h1> Student instruction tas button sa baba </h1>
        <button> search books </button>
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