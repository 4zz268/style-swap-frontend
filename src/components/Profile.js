import React, { useEffect, useState } from 'react';
import OutfitForm from './OutfitForm';
import axios from '../api';
import { API_BASE_URL } from '../config'; // Optional: centralized base URL

const Profile = ({ user }) => {
  const [outfits, setOutfits] = useState([]);

  useEffect(() => {
    if (user) {
      fetchUserOutfits();
    }
  }, [user]);

  const fetchUserOutfits = async () => {
    try {
      const res = await axios.get('/outfits');
      const userOutfits = res.data.filter((o) => o.user_id === user.id);
      setOutfits(userOutfits);
    } catch (err) {
      console.error('Failed to fetch outfits:', err);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('category', values.category);
    formData.append('image', values.image);

    try {
      await axios.post('/outfits', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      resetForm();
      fetchUserOutfits();
    } catch (err) {
      console.error('Failed to submit outfit:', err.response?.data || err.message);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-purple-700">
        {user?.username}'s Profile
      </h1>

      <div className="mb-6">
        <OutfitForm onSubmit={handleSubmit} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {outfits.map((outfit) => (
          <div
            key={outfit.id}
            className="bg-white text-black rounded shadow p-4"
          >
            <h2 className="font-semibold text-lg mb-2">{outfit.title}</h2>
            <img
              src={`${API_BASE_URL}/uploads/${outfit.image}`}
              alt={outfit.title}
              className="w-full h-48 object-cover rounded"
            />
            <p className="text-sm text-gray-600 mt-2">Category: {outfit.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
