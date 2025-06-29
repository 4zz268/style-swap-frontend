import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UploadForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !category || !imageUrl) {
      alert('All fields including image URL are required.');
      return;
    }

    const payload = {
      title,
      description,
      category,
      image: imageUrl
    };

    try {
      const response = await fetch('http://localhost:5000/api/outfits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.outfit) {
        navigate(`/outfits/${data.outfit.id}`);
      } else {
        alert(data.error || 'Upload failed.');
      }
    } catch (err) {
      console.error('Upload error:', err);
      alert('An error occurred while uploading.');
    }
  };

  return (
    <form className="upload-form" onSubmit={handleSubmit}>
      <h2>Upload Your Look</h2>

      <label>Title</label>
      <input
        type="text"
        placeholder="Summer Vibes, Streetwear, etc."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label>Description</label>
      <textarea
        placeholder="Describe your outfit, materials, vibe..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <label>Category</label>
      <input
        type="text"
        placeholder="Casual, Formal, Vintage..."
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />

      <label>Image URL</label>
      <input
        type="text"
        placeholder="https://example.com/my-outfit.jpg"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />

      {imageUrl && (
        <div className="upload-preview">
          <img src={imageUrl} alt="Preview" />
        </div>
      )}

      <button type="submit">Upload</button>
    </form>
  );
}

export default UploadForm;
