import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import axios from '../api';

function SearchResults() {
  const [results, setResults] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');

  useEffect(() => {
    if (query) {
      axios.get(`/outfits/search?q=${query}`)
        .then(res => setResults(res.data))
        .catch(err => console.error('Search failed:', err));
    }
  }, [query]);

  return (
    <div>
      <h2>Search Results for "{query}"</h2>
      {results.length === 0 ? (
        <p>No outfits found.</p>
      ) : (
        <ul>
          {results.map((item) => (
            <li key={item.id}>
              <Link to={`/outfits/${item.id}`}>{item.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchResults;
