import React from 'react';
import { Link } from 'react-router-dom';
import '../css/styles.css';

function Layout({ role, children }) {
    
  return (
    <div className="layout">
      <header className="header">
        <div className="brand-group">
          <div className="logo">BookSphere | </div>
          <div className="tagline-in-header">WHERE EVERY PAGE OPENS A NEW WORLD</div>
        </div>

        <nav className="nav-links">
          {/* Common link */}
          <Link to="/home">HOME</Link>

          {/* Role-specific links */}
          {role === 'admin' && (
            <>
              <Link to="/dashboard">DASHBOARD</Link>
              <Link to="/books">BOOKS</Link>
              <Link to="/users">USERS</Link>
            </>
          )}

          {role === 'librarian' && (
            <>
              <Link to="/dashboard">DASHBOARD</Link>
              <Link to="/books">BOOKS</Link>
            </>
          )}

          {role === 'student' && (
            <>
              <Link to="/books">BOOKS</Link>
            </>
          )}
        </nav>
      </header>

      <main className="page-content">{children}</main>

      <footer className="footer">
        <div className="footer-content">
          <span>&copy; 2025 BookSphere Inc. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

export default Layout;