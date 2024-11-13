import React, { useState } from 'react';
import '../App.css';
function SearchFilter({ onSearch }) {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the form from submitting the traditional way
    // Trigger the onSearch function passed as a prop to fetch and filter games
    onSearch(query, year, rating);
  };

  return (
    <form className="search-filter" onSubmit={handleSearch}>
      <div className="filter-item">
        <label htmlFor="search">Search by Name:</label>
        <input
          type="text"
          id="search"
          placeholder="Search by game name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="filter-item">
        <label htmlFor="year">Year:</label>
        <input
          type="date"
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>

      <div className="filter-item">
        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          min="0"
          max="10"
          placeholder="Enter minimum rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </div>

      <button type="submit">Search</button>
    </form>
  );
}

export default SearchFilter;
