import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4">The page you’re looking for doesn’t exist.</p>
      <Link to="/" className="text-blue-500 underline mt-6 inline-block">Go to Home</Link>
    </div>
  );
}

export default ErrorPage;
