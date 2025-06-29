import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api';

function OutfitDetails() {
  const { id } = useParams();
  const [outfit, setOutfit] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    axios.get(`/outfits/${id}`)
      .then(res => {
        setOutfit(res.data);
        return axios.get(`/users/${res.data.user_id}`);
      })
      .then(userRes => {
        setUsername(userRes.data.username);
      })
      .catch(err => console.error('Error fetching outfit/user:', err));
  }, [id]);

  if (!outfit) return <p className="loading-message">Loading outfit...</p>;

  const { title, description, category, image, created_at } = outfit;

  return (
    <div className="outfit-details">
      <div className="outfit-card">
        <div className="outfit-card-image">
          {image ? (
            <img src={image} alt={title} />
          ) : (
            <div className="no-image">No image available</div>
          )}
        </div>

        <div className="outfit-card-info">
          <h2>{title}</h2>
          <p className="meta">
            <span>By <strong>{username || 'Unknown'}</strong></span> •{' '}
            <span>{new Date(created_at).toLocaleString()}</span>
          </p>
          <p className="category"><strong>Category:</strong> {category}</p>
          <p className="photographer"><strong>Photographer:</strong> {username}</p>
          <p className="description">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default OutfitDetails;
