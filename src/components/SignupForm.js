import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password || !profilePictureUrl) {
      alert('All fields are required.');
      return;
    }

    const signupData = {
      username,
      password,
      profile_picture: profilePictureUrl
    };

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(signupData)
      });

      const data = await response.json();

      if (response.ok && data.user) {
        alert('Signup successful! Please log in.');
        navigate('/login');
      } else {
        alert(data.error || 'Signup failed.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form signup-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Create an Account</h2>
        <input
          className="form-input"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          className="form-input"
          type="text"
          value={profilePictureUrl}
          onChange={e => setProfilePictureUrl(e.target.value)}
          placeholder="Profile Picture URL"
          required
        />
        <button className="form-button" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupForm;
