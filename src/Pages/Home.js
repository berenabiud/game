import React, { useState } from 'react';
import GameList from '../components/GameList';
import SearchFilter from '../components/SearchFilter';
import { Link } from 'react-router-dom';
import '../App.css'; // Import the CSS file

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

  const addToWishlist = (game, userRating = 5) => {
    const gameWithRating = { ...game, rating: userRating };

    if (!wishlist.find((item) => item.id === game.id)) {
      setWishlist((prevWishlist) => [...prevWishlist, gameWithRating]);

      fetch('https://plantsy-q1eq.onrender.com/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameWithRating),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add to wishlist');
        }
        return response.json();
      })
      .then(data => {
        console.log('Added to wishlist:', data);
      })
      .catch(error => console.error('Error adding to wishlist:', error));
    }
  };

  if (loading) {
    return <div className="home-loading">Loading...</div>;
  }

  if (error) {
    return <div className="home-error">Error fetching games: {error}</div>;
  }

  return (
    <div className="home-container">
      <div className="home-overlay">
        <h1 className="home-header">Game Library</h1>
        <SearchFilter onSearch={handleSearch} />
        <GameList games={filteredGames} addToWishlist={addToWishlist} />
        <Link to="/wishlist" className="home-wishlist-link">Go to Wishlist</Link>
      </div>
    </div>
  );
}

export default Home;
