import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import GameList from './components/GameList';

function App() {
  const [games, setGames] = useState([]);
  const [query, setQuery] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  const API_KEY = 'bdaadfbc69b6442fb0a533ec2d7ccf87';  // Replace with your actual API key from RAWG

  // Fetch games from the RAWG API
  const fetchGames = async () => {
    if (!query) return;  // Prevent fetch if query is empty
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

  // Fetch games whenever `query` or `rating` changes
  useEffect(() => {
    fetchGames();
  }, [query, rating]);

  // Optional: Add a manual search button to trigger fetch
  const handleSearch = () => {
    fetchGames();
  };

  return (
    <div className="App">
      <h1>Game Library</h1>
      
      {/* Search Bar */}
      <SearchBar setQuery={setQuery} />

      {/* Rating Filter */}
      <div className="rating-filter">
        <label htmlFor="rating">Minimum Rating: </label>
        <select 
          id="rating" 
          value={rating} 
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {[...Array(11).keys()].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      {/* Optional Search Button */}
      <button onClick={handleSearch}>Search</button>

      {/* Loading and Games List */}
      {loading ? <div>Loading...</div> : <GameList games={games} />}
    </div>
  );
}

export default App;
