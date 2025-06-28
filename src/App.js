import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import OutfitDetails from './components/OutfitDetails';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = sessionStorage.getItem('user_id');
    if (userId) {
      fetch(`http://localhost:5000/api/users/${userId}`)
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-pink-500 to-purple-600 text-white font-poppins">
        <nav className="p-4">
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/profile">Profile</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/outfits/:id" element={<OutfitDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
