import React, { useEffect, useState } from 'react';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the wishlist from the server
    fetch('https://plantsy-q1eq.onrender.com/wishlist')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch wishlist');
        }
        return response.json();
      })
      .then(data => setWishlist(data))
      .catch(error => setError(error.message));
  }, []);

  return (
    <div style={styles.container}>
      <h2>Your Wishlist</h2>
      {error && <p style={styles.error}>Error: {error}</p>}
      {wishlist.length > 0 ? (
        wishlist.map(game => (
          <div key={game.id} style={styles.card}>
            <h3>{game.name}</h3>
            <p>{game.description || 'No description available'}</p>
            <p><strong>Year:</strong> {game.year || 'N/A'}</p>
            <p><strong>Rating:</strong> {game.rating || 'N/A'}</p>
            <img src={game.imageUrl} alt={game.name} style={styles.image} />
          </div>
        ))
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  image: {
    width: '150px',
    height: 'auto',
    borderRadius: '4px',
  },
  error: {
    color: 'red',
  },
};

export default Wishlist;
