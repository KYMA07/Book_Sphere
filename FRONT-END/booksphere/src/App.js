// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';   // import your login.js
import Home from './home';     //import home.js

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