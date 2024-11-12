import React, { useState,  } from 'react';
import './App.css';

// Importing components from the /src/components folder
import SearchBar from './components/SearchBar';  
import GameList from './components/GameList';

function App() {
  const [games, setGames] = useState([]);
  const [query, setQuery] = useState('');
  const [rating, setRating] = useState(0);  // Add state to track the selected rating filter
  const [loading, setLoading] = useState(false);

  const API_KEY = 'bdaadfbc69b6442fb0a533ec2d7ccf87'; // Replace with your actual API key from RAWG

  // Fetch games from the RAWG API with rating filter
  const fetchGames = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=10&search=${query}&rating=${rating}`);
      const data = await response.json();
      setGames(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Button click handler to trigger game fetch
  const handleSearch = () => {
    if (query) {
      fetchGames();
    }
  };

  return (
    <div className="App">
      <h1>Game Library</h1>
      <SearchBar setQuery={setQuery} />

      {/* Rating Filter */}
      <div className="rating-filter">
        <label htmlFor="rating">Minimum Rating: </label>
        <select 
          id="rating" 
          value={rating} 
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </select>
      </div>

      {/* Search Button */}
      <button onClick={handleSearch}>Search</button>

      {/* Loading and Games List */}
      {loading ? <div>Loading...</div> : <GameList games={games} />}
    </div>
  );
}

export default App;
