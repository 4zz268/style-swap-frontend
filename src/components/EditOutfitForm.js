import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api';

function EditOutfitForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [outfit, setOutfit] = useState({
    title: '',
    description: '',
    category: '',
    image: ''
  });

  useEffect(() => {
    axios.get(`/outfits/${id}`)
      .then(res => setOutfit(res.data))
      .catch(err => console.error('Failed to load outfit:', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOutfit(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`/outfits/${id}`, outfit, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' }
    })
      .then(() => navigate(`/outfits/${id}`))
      .catch(err => {
        console.error('Failed to update outfit:', err);
        alert('Update failed');
      });
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <h2>Edit Your Outfit</h2>

      <label>Title</label>
      <input
        type="text"
        name="title"
        value={outfit.title}
        onChange={handleChange}
        required
      />

      <label>Description</label>
      <textarea
        name="description"
        value={outfit.description}
        onChange={handleChange}
        placeholder="Describe your outfit..."
        required
      />

      <label>Category</label>
      <input
        type="text"
        name="category"
        value={outfit.category}
        onChange={handleChange}
        placeholder="Casual, Formal, etc."
        required
      />

      <label>Image URL</label>
      <input
        type="text"
        name="image"
        value={outfit.image}
        onChange={handleChange}
        placeholder="https://example.com/image.jpg"
        required
      />

      {outfit.image && (
        <div className="upload-preview">
          <img src={outfit.image} alt="Preview" />
        </div>
      )}

      <button type="submit">Update Outfit</button>
    </form>
  );
}

export default EditOutfitForm;
