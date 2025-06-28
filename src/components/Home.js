import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [outfits, setOutfits] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/outfits')
      .then((res) => res.json())
      .then((data) => setOutfits(data))
      .catch((err) => console.error(err));
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
              src={`http://localhost:5000/uploads/${outfit.image}`}
              alt={outfit.title}
              className="w-full h-48 object-cover mb-2"
            />
            <Link
              to={`/outfits/${outfit.id}`}
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
