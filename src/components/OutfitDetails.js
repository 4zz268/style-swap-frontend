import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api';

function OutfitDetails() {
  const { id } = useParams();
  const [outfit, setOutfit] = useState(null);

  useEffect(() => {
    axios.get(`/outfits/${id}`)
      .then(res => setOutfit(res.data))
      .catch(err => console.error('Error fetching outfit:', err));
  }, [id]);

  if (!outfit) return <p>Loading outfit...</p>;

  return (
    <div>
      <h2>{outfit.title}</h2>
      <img src={`http://localhost:5000/uploads/${outfit.image}`} alt={outfit.title} />
      <p>Description: {outfit.description}</p>
    </div>
  );
}

export default OutfitDetails;
