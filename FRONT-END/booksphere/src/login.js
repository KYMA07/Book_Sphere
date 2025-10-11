import React from 'react';
import './Login.css'; 

function Login() {
  return (
    <div className="container">
      <div className="overlay"></div>

      <div className="login-section">
        <div className="title-group">
          <h1 className="brand-title">BOOKSPHERE</h1>
          <p className="tagline">WHERE EVERY PAGE OPENS A NEW WORLD</p>
        </div>

        <div className="login-box">
          <h2>Welcome Back</h2>
          <p className="subtitle">Log in to Continue your Reading Journey</p>

          <form className="login-form">
            <input type="text" placeholder="Username or Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit" className="login-btn">Login</button>
            <div className="divider"></div>
            <button type="button" className="register-btn">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;