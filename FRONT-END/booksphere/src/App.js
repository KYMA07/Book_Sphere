// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';   // ✅ import your Login component
import Home from './home';     // ✅ import Home (or any other page)

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route shows Login */}
        <Route path="/" element={<Login />} />

        {/* After login, navigate here */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;