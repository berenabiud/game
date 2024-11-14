// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import Navbar component
import Home from './Pages/Home'; // Path from App.js inside src to Home.js inside src/pages
import WishlistPage from './Pages/WishlistPage'; // Path from App.js inside src to WishlistPage.js inside src/pages
import About from './Pages/About';  // Import About component

function App() {
  return (
    <Router>
      <Navbar /> {/* Add Navbar component here */}
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/about" element={<About />} /> {/* Add route for About page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
