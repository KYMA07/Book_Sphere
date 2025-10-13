import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './components/AuthContext';

import Login from './components/login';
import Home from './components/home'; //  universal landing page
import Dashboard from './components/dashboard';
import Books from './components/books';
import Users from './components/users';
import Layout from './components/Layout';
import StudentAppointment from './components/studentAppointment';
import StaffAppointment from './components/staffAppointment';


function App() {
  const { user } = useContext(AuthContext);
  const role = user?.role?.toLowerCase() || localStorage.getItem('role');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Layout role={role}><Home /></Layout>} />
        <Route path="/dashboard" element={<Layout role={role}><Dashboard /></Layout>} />
        <Route path="/books" element={<Layout role={role}><Books /></Layout>} />
  <Route path="/users" element={<Layout role={role}><Users /></Layout>} />
  <Route path="/appointments" element={<Layout role={role}><StudentAppointment /></Layout>} />
  <Route path="/appointments/manage" element={<Layout role={role}><StaffAppointment /></Layout>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;