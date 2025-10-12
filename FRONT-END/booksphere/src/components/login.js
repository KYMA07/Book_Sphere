import React, { useState } from 'react';
import axios from 'axios';
import '../css/login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/user/login', {
        username,
        password,
      });

      // ✅ Success
      setMessage('Login successful! Welcome back ');
      setMessageType('success');
      localStorage.setItem('token', res.data.token);

      // Get user role from backend response
      const role = res.data.user.role;

      setTimeout(() => {
        if (role === 'Admin') {
          navigate('/home');        // Admin = home.js
        } else if (role === 'Librarian') {
          navigate('/librarian');   // Librarian = librarian.js
        } else if (role === 'Student') {
          navigate('/student');     // Student → student.js
        } else {
          navigate('/');
        }
      }, 1000);

    } catch (err) {
      if (err.response) {
        setMessage(err.response.data.message || 'Login failed');
      } else {
        setMessage('Server error. Please try again later.');
      }
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
          <h2>Welcome Back</h2>
          <p className="subtitle">Log in to Continue your Reading Journey</p>

          {message && (
            <div className={`message ${messageType}`}>
              {message}
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username or Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-btn">Login</button>
            <div className="divider"></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;