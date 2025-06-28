import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const defaultProfilePicture = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP8ndSwnF6GyinN-5s5IgjC-UuH0A6F9TOPfKBA010abgWVTadVvYlHus&s';

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      localStorage.removeItem('user');
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">StyleSwap</Link>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/explore">Explore</Link>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/upload">Upload</Link>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>

      {user && (
        <div className="navbar-profile-pic">
          <Link to="/profile">
            <img
              src={user.profile_picture || defaultProfilePicture}
              alt="Profile"
              className="profile-image"
            />
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
