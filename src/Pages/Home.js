import React, { useState } from 'react';
import GameList from '../components/GameList';
import SearchFilter from '../components/SearchFilter';
import { Link } from 'react-router-dom';
import '../App.css';

function Home() {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  const API_KEY = 'bdaadfbc69b6442fb0a533ec2d7ccf87';

  const handleSearch = (query, year, rating) => {
    setLoading(true);
    setError(null);

    let url = `https://api.rawg.io/api/games?key=${API_KEY}`;
    if (query) url += `&search=${query}`;
    if (year) url += `&dates=${year}-01-01,${year}-12-31`;
    if (rating) url += `&rating=${rating}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setGames(data.results);
        setFilteredGames(data.results);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  };

  const addToWishlist = (game, userRating) => {
    // Add the user rating to the game data
    const gameWithRating = { ...game, userRating };

    // Add game to wishlist if not already in the wishlist
    if (!wishlist.find((item) => item.id === game.id)) {
      setWishlist((prevWishlist) => [...prevWishlist, gameWithRating]);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching games: {error}</div>;
  }

  return (
    <div>
      <SearchFilter onSearch={handleSearch} />
      <GameList games={filteredGames} addToWishlist={addToWishlist} />
      <Link to="/wishlist">Go to Wishlist</Link>
    </div>
  );
}

export default Home;