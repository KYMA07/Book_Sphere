import React, { useState, useContext } from 'react';
import axios from 'axios';
import '../css/login.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/user/login', {
        username,
        password,
      });

      const { token, user } = res.data;
      const role = user.role.toLowerCase();

      // Store essential user info
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('user_id', user.user_id); // ✅ Needed for borrowing
      localStorage.setItem('username', user.username);

      setUser({ ...user, token });

      setMessage(`Login successful! Welcome back, ${user.username}`);
      setMessageType('success');

      setTimeout(() => {
        navigate('/home'); // ✅ All roles land on home
      }, 1000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed. Please try again.';
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
          <h2>Welcome Back</h2>
          <p className="subtitle">Log in to Continue your Reading Journey</p>
          {message && <div className={`message ${messageType}`}>{message}</div>}
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