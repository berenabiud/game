import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import './App.css';
import SearchBar from './SearchBar';
import GameList from './GameList';
// import Loading from './Loading';

function App() {
  const [games, setGames] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (query) {
      fetchGames(query);
    }
  }, [query]);

  const fetchGames = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.rawg.io/api/games`, {
        params: {
          page_size: 10,
          search: query
        }
      });
      setGames(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Game Library</h1>
      <SearchBar setQuery={setQuery} />
      {loading ? <Loading /> : <GameList games={games} />}
    </div>
  );
}

export default App;
