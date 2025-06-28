import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api';
import { API_BASE_URL } from '../config';

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

  if (!outfit) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-purple-600 hover:underline"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-2 text-purple-700">{outfit.title}</h1>

      <img
        src={`${API_BASE_URL}/uploads/${outfit.image}`}
        alt={outfit.title}
        className="w-full h-auto rounded-xl shadow mb-4"
      />

      <p className="mb-2 text-lg">{outfit.description}</p>
      <p className="text-sm text-gray-500">Category: {outfit.category}</p>
      {outfit.created_at && (
        <p className="text-sm text-gray-400">
          Uploaded: {new Date(outfit.created_at).toLocaleString()}
        </p>
      )}

      <hr className="my-6" />

      {/* Placeholder for comments */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        <p className="text-gray-400 italic">Comments coming soon...</p>
      </section>
    </div>
  );
};

export default OutfitDetails;
