import React, { useEffect, useState } from 'react';
import OutfitForm from './OutfitForm';
import axios from '../api'; // Adjust if needed

const Profile = ({ user }) => {
  const [outfits, setOutfits] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get('/outfits')
        .then((res) => {
          const userOutfits = res.data.filter((o) => o.user_id === user.id);
          setOutfits(userOutfits);
        })
        .catch((err) => console.error('Failed to fetch outfits:', err));
    }
  }, [user]);

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

      const res = await axios.get('/outfits');
      const userOutfits = res.data.filter((o) => o.user_id === user.id);
      setOutfits(userOutfits);
    } catch (err) {
      console.error('Failed to submit outfit:', err.response?.data || err.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">{user?.username}'s Profile</h1>
      <OutfitForm onSubmit={handleSubmit} />
      <div className="grid grid-cols-3 gap-4 mt-4">
        {outfits.map((outfit) => (
          <div
            key={outfit.id}
            className="bg-white text-black p-4 rounded shadow"
          >
            <h2>{outfit.title}</h2>
            <img
              src={`http://localhost:5000/uploads/${outfit.image}`}
              alt={outfit.title}
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
