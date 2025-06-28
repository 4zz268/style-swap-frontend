import React, { useEffect, useState } from 'react';
import OutfitForm from './OutfitForm';

const Profile = ({ user }) => {
  const [outfits, setOutfits] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5000/api/outfits?user_id=${user.id}`)
        .then((res) => res.json())
        .then((data) => setOutfits(data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleSubmit = (values, { resetForm }) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('category', values.category);
    formData.append('image', values.image);

    fetch('http://localhost:5000/api/outfits', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        resetForm();
        fetch(`http://localhost:5000/api/outfits?user_id=${user.id}`)
          .then((res) => res.json())
          .then((data) => setOutfits(data));
      })
      .catch((err) => console.error(err));
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
