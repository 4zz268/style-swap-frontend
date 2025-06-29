import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="error-page">
      <h1 className="error-title">404 - Page Not Found</h1>
      <p className="error-message">The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="home-link">Go to Home</Link>
    </div>
  );
}

export default ErrorPage;
