import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api'; // Adjust path if api.js is in src/

const Home = () => {
  const [outfits, setOutfits] = useState([]);

  useEffect(() => {
    axios
      .get('/outfits') // No need to write full URL thanks to axios baseURL
      .then((res) => setOutfits(res.data))
      .catch((err) => console.error('Failed to fetch outfits:', err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">All Outfits</h1>
      <div className="grid grid-cols-3 gap-4">
        {outfits.map((outfit) => (
          <div
            key={outfit.id}
            className="bg-white text-black p-4 rounded shadow"
          >
            <h2 className="text-lg font-semibold mb-2">{outfit.title}</h2>
            <img
              src={`http://localhost:5000/uploads/${outfit.image}`} // ✅ Corrected
              alt={outfit.title}
              className="w-full h-48 object-cover mb-2"
            />
            <Link
              to={`/outfits/${outfit.id}`} // ✅ Corrected
              className="text-purple-600 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
