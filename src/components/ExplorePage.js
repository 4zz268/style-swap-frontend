import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ExplorePage() {
  const [outfits, setOutfits] = useState([]);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

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

  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this outfit?')) return;

    fetch(`http://localhost:5000/api/outfits/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) {
          setOutfits(prev => prev.filter(o => o.id !== id));
          setSearchResults(prev => prev.filter(o => o.id !== id));
        } else {
          throw new Error('Failed to delete outfit');
        }
      })
      .catch(err => console.error('Delete failed:', err));
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
          <div key={outfit.id} className="outfit-card">
            <Link to={`/outfits/${outfit.id}`}>
              <img
                src={outfit.image}
                alt={outfit.title}
                className="outfit-image"
              />
              <div className="outfit-card-content">
                <h2 className="outfit-title">{outfit.title}</h2>
                <p className="outfit-category">Category: {outfit.category}</p>
                <p className="outfit-description">
                  {outfit.description.length > 24
                    ? outfit.description.slice(0, 24) + '...'
                    : outfit.description}
                </p>
              </div>
            </Link>

            {user && user.id === outfit.user_id && (
              <div className="button-group">
                <Link to={`/outfits/${outfit.id}/edit`} className="edit-button">Edit</Link>
                <button onClick={() => handleDelete(outfit.id)} className="delete-button">Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExplorePage;
