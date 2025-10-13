import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './components/AuthContext';

import Login from './components/login';
import Student from './components/student';
import Dashboard from './components/dashboard';
import Books from './components/books';
import Users from './components/users';
import Layout from './components/Layout';

function App() {
  const { user } = useContext(AuthContext);
  const role = user?.role?.toLowerCase() || localStorage.getItem('role');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student" element={<Layout role={role}><Student /></Layout>} />
        <Route path="/dashboard" element={<Layout role={role}><Dashboard /></Layout>} />
        <Route path="/books" element={<Layout role={role}><Books /></Layout>} />
        <Route path="/users" element={<Layout role={role}><Users /></Layout>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;