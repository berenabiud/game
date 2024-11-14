import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // For routing back to HomePage

function WishlistPage() {
  const [wishlist, setWishlist] = useState([]); // State to store wishlist items
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch wishlist from the backend (json-server)
  useEffect(() => {
    fetch('https://plantsy-q1eq.onrender.com/wishlist')
      .then((response) => response.json())
      .then((data) => {
        setWishlist(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading Wishlist...</div>;
  }

  if (error) {
    return <div>Error fetching wishlist: {error}</div>;
  }

  return (
    <div>
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul>
          {wishlist.map((game) => (
            <li key={game.id}>
              <h3>{game.name}</h3>
              <p>{game.released}</p>
              <p>Rating: {game.rating}</p>
              <img src={game.background_image} alt={game.name} width="200" />
            </li>
          ))}
        </ul>
      )}
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default WishlistPage;
