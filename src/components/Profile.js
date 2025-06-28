import React, { useEffect, useState } from 'react';
import axios from '../api';

function Profile() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      axios.get(`/users/${storedUser.id}`)
        .then((res) => {
          setUser(res.data);
          setUsername(res.data.username);
          setProfilePictureUrl(res.data.profile_picture || '');
        })
        .catch((err) => console.error('Error fetching user profile:', err));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    const updatePayload = {
      username,
      ...(password && { password }),
      ...(profilePictureUrl && { profile_picture: profilePictureUrl }),
    };

    try {
      const response = await axios.put(`/users/${user.id}`, updatePayload, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      setUser(response.data.user);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating profile:', err);
      alert(err.response?.data?.error || 'Update failed');
    }
  };

  if (!user) return <p className="loading-message">Loading profile...</p>;

  return (
    <div className="profile-container">
      <h1 className="profile-heading">Welcome, {user.username}</h1>

      {profilePictureUrl && (
        <img
          src={profilePictureUrl}
          alt="Profile"
          className="profile-picture"
        />
      )}

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            placeholder="Leave blank to keep current"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Profile Picture URL:</label>
          <input
            type="text"
            placeholder="https://example.com/image.jpg"
            value={profilePictureUrl}
            onChange={(e) => setProfilePictureUrl(e.target.value)}
          />
        </div>

        <button type="submit" className="update-button">Update Profile</button>
      </form>
    </div>
  );
}

export default Profile;
