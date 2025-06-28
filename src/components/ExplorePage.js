import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ExplorePage() {
  const [outfits, setOutfits] = useState([]);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/outfits', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setOutfits(data))
      .catch(err => console.error('Error fetching outfits:', err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/api/search?q=${query}`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => setSearchResults(data.outfits))
      .catch(err => console.error('Search failed:', err));
  };

  const outfitsToDisplay = query ? searchResults : outfits;

  return (
    <div className="explore-container">
      <h1 className="explore-title">Explore Outfits</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          className="search-input"
          type="text"
          placeholder="Search outfits..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      <div className="explore-grid">
        {outfitsToDisplay.map((outfit) => (
          <Link key={outfit.id} to={`/outfits/${outfit.id}`} className="outfit-card">
            <img
              src={outfit.image}
              alt={outfit.title}
              className="outfit-image"
            />
            <h2 className="outfit-title">{outfit.title}</h2>
            <p className="outfit-category">{outfit.category}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ExplorePage;
