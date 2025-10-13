import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/styles.css';

function Layout({ role, children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      localStorage.clear(); // Clear token, role, user_id, etc.
      navigate('/login');
    }
  };

  return (
    <div className="layout">
      <header className="header">
        <button className="logout-x" onClick={handleLogout}>✖</button>

        <div className="brand-group">
          <div className="logo">BookSphere | </div>
          <div className="tagline-in-header">WHERE EVERY PAGE OPENS A NEW WORLD</div>
        </div>

        <nav className="nav-links">
          <Link to="/home">HOME</Link>

          {role === 'staff' && (
            <>
              <Link to="/dashboard">DASHBOARD</Link>
              <Link to="/books">BOOKS</Link>
              <Link to="/users">USERS</Link>
              <Link to="/appointments/manage">APPOINTMENTS</Link>
            </>
          )}

          {role === 'student' && (
            <>
              <Link to="/books">BOOKS</Link>
              <Link to="/appointments">APPOINTMENTS</Link>
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