import React, { useState } from 'react';
import axios from 'axios';
import '../css/signup.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setMessageType('error');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/user/register', {
        username: fullName,
        password,
        email,
        role: 'Student' // ✅ Only Student role allowed
      });

      setMessage('Account created successfully!');
      setMessageType('success');

      setTimeout(() => {
        navigate('/'); // ✅ Redirect to login
      }, 1000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Signup failed. Please try again.';
      setMessage(errorMsg);
      setMessageType('error');
    }
  };

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
          {message && <div className={`message ${messageType}`}>{message}</div>}
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-btn">Sign Up</button>
            <div className="divider"></div>
            <button type="button" className="register-btn" onClick={() => navigate('/')}>
              Already have an account? Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;