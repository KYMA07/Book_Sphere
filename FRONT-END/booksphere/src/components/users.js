import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/user.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'Student' });
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // ✅ Retrieve token from localStorage
  const token = localStorage.getItem('token');

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/user/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
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
      await axios.post('http://localhost:5000/user/register', form);
      setMessage('User created successfully');
      setForm({ username: '', email: '', password: '', role: 'Student' });
      setShowForm(false);
      fetchUsers();
    } catch (err) {
      console.error(err);
      setMessage('Failed to create user');
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/user/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
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
            <option value="Admin">Staff</option>
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
          {users
            .slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage)
            .map((u) => (
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

      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ◀ Prev
        </button>
        <span>Page {currentPage} of {Math.ceil(users.length / usersPerPage)}</span>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              prev < Math.ceil(users.length / usersPerPage) ? prev + 1 : prev
            )
          }
          disabled={currentPage >= Math.ceil(users.length / usersPerPage)}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}

export default Users;