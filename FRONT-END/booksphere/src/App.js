import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';
import Librarian from './components/librarian';
import Student from './components/student';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/librarian" element={<Librarian />} />
        <Route path="/student" element={<Student />} />
      </Routes>
    </Router>
  );
}

export default App;