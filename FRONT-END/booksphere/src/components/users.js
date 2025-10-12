import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/styles.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'Student' });
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false); // toggle state

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/user/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      setMessage('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/user/register', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('User created successfully');
      setForm({ username: '', email: '', password: '', role: 'Student' });
      setShowForm(false); // ✅ hide form after submit
      fetchUsers();
    } catch (err) {
      console.error(err);
      setMessage('Failed to create user');
    }
  };

  const handleRemove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/user/remove/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('User removed successfully');
      fetchUsers();
    } catch (err) {
      console.error(err);
      setMessage('Failed to remove user');
    }
  };

  return (
    <div className="users-page">
      <h1>Users Management</h1>
      {message && <p className="message">{message}</p>}

      <button className="toggle-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Create User'}
      </button>

      
      {showForm && (
        <form className="user-form" onSubmit={handleCreate}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="Admin">Admin</option>
            <option value="Librarian">Librarian</option>
            <option value="Student">Student</option>
          </select>
          <button type="submit">Save</button>
        </form>
      )}

     
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th><th>Username</th><th>Email</th><th>Role</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.user_id}>
              <td>{u.user_id}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => handleRemove(u.user_id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;