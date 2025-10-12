import React from 'react';
import './Signup.css'; 

function Signup() {
  return (
    <div className="container">
      <div className="overlay"></div>

      <div className="login-section">
        <div className="title-group">
          <h1 className="brand-title">BOOKSPHERE</h1>
          <p className="tagline">WHERE EVERY PAGE OPENS A NEW WORLD</p>
        </div>

        <div className="login-box">
          <h2>Create Account</h2>

          <form className="login-form">
            <input type="text" placeholder="Full Name" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />
            <button type="submit" className="login-btn">Sign Up</button>
            <div className="divider"></div>
            <button type="button" className="register-btn">Already have an account? Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;