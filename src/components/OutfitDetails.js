import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api'; // Adjust path if needed

const OutfitDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [outfit, setOutfit] = useState(null);

  useEffect(() => {
    axios
      .get(`/outfits/${id}`)
      .then((res) => setOutfit(res.data))
      .catch((err) => console.error('Failed to fetch outfit:', err));
  }, [id]);

  if (!outfit) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-purple-600 hover:underline"
      >
        Back
      </button>
      <h1 className="text-2xl font-bold mb-2">{outfit.title}</h1>
      <img
        src={`http://localhost:5000/uploads/${outfit.image}`}
        alt={outfit.title}
        className="w-1/2 h-auto rounded shadow mb-4"
      />
      <p className="mb-2">{outfit.description}</p>
      <p className="text-sm text-gray-200">Category: {outfit.category}</p>
    </div>
  );
};

export default OutfitDetails;
