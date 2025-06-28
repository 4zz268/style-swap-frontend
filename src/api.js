// src/api.js
import axios from 'axios';

// Set the base URL of your Flask backend
axios.defaults.baseURL = 'http://localhost:5000/api';

// ✅ Include credentials (cookies) with every request for session auth
axios.defaults.withCredentials = true;

export default axios;