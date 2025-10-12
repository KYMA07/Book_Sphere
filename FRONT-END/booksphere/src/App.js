import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';
import Librarian from './components/librarian';
import Student from './components/student';
import Dashboard from './components/dashboard';
import Books from './components/books';
import Users from './components/users';
import Layout from './components/Layout';


function App() {
  const role = localStorage.getItem('role'); 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Layout role={role}><Home /></Layout>} />
        <Route path="/librarian" element={<Layout role={role}><Librarian /></Layout>} />
        <Route path="/student" element={<Layout role={role}><Student /></Layout>} />
        <Route path="/dashboard" element={<Layout role={role}><Dashboard /></Layout>} />
        <Route path="/books" element={<Layout role={role}><Books /></Layout>} />
        <Route path="/users" element={<Layout role={role}><Users /></Layout>} />
      </Routes>

    </Router>
  );
}

export default App;