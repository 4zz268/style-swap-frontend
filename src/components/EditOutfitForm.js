import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api';

function EditOutfitForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [outfit, setOutfit] = useState({ title: '', image: '' });

  useEffect(() => {
    axios.get(`/outfits/${id}`)
      .then(res => setOutfit(res.data))
      .catch(err => console.error('Failed to load outfit:', err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOutfit({ ...outfit, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/outfits/${id}`, outfit)
      .then(() => navigate(`/outfits/${id}`))
      .catch(err => console.error('Failed to update outfit:', err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input name="title" value={outfit.title} onChange={handleChange} required />
      </label>
      <button type="submit">Update Outfit</button>
    </form>
  );
}

export default EditOutfitForm;
