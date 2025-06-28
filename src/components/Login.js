import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/login', form);
      navigate('/upload'); // redirect after login
    } catch (err) {
      alert(err.response?.data.error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {/* input fields */}
      <button type="submit">Login</button>
    </form>
  );
}
