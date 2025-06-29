import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api';

const Home = () => {
  const [outfits, setOutfits] = useState([]);

  useEffect(() => {
    axios
      .get('/outfits')
      .then((res) => setOutfits(res.data))
      .catch((err) => console.error('Failed to fetch outfits:', err));
  }, []);

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to StyleSwap</h1>
          <p>Share your style. Discover new looks. Get inspired.</p>
          <Link to="/explore" className="btn-primary">Explore Outfits</Link>
        </div>
      </section>

      <section className="outfit-section">
        <h2>Latest Uploads</h2>

        {outfits.length === 0 ? (
          <div className="no-outfits">
            <p>No outfits uploaded yet.</p>
            <Link to="/upload" className="btn-secondary">Be the first to share a look</Link>
          </div>
        ) : (
          <div className="outfit-grid">
            {outfits.map((outfit) => (
              <div className="outfit-card" key={outfit.id}>
                <img
                  src={outfit.image}
                  alt={outfit.title}
                  className="outfit-img"
                />
                <div className="outfit-info">
                  <h3>{outfit.title}</h3>
                  <Link to={`/outfits/${outfit.id}`} className="view-link">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
