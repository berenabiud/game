import React from 'react';

function SearchBar({ setQuery }) {
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a game..."
        onChange={handleInputChange}
        className="search-bar"
      />
    </div>
  );
}

export default SearchBar;
