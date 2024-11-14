import React, { useEffect, useState } from 'react';
import GameList from './GameList';
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
      .then(data => {
        console.log("Fetched wishlist data:", data); // Debugging log
        setWishlist(data);
      })
      .catch(error => {
        console.error("Fetch error:", error.message); // Debugging log
        setError(error.message);
      });
  }, []);

  // Function to handle deleting a game
  const handleDelete = (gameId) => {
    console.log("Attempting to delete game with ID:", gameId); // Debugging log
    fetch(`https://plantsy-q1eq.onrender.com/wishlist/${gameId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete game');
      }
      console.log("Game deleted successfully"); // Debugging log
      setWishlist(prevWishlist => prevWishlist.filter(game => game.id !== gameId));
    })
    .catch(error => {
      console.error("Delete error:", error.message); // Debugging log
      setError(error.message);
    });
  };

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
            <button
              style={styles.deleteButton}
              onClick={() => handleDelete(game.id)}
            >
              Delete
            </button>
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
    display: 'flex',
    flexWrap: 'wrap', // Allows cards to wrap if they overflow the container width
    gap: '20px', // Space between cards
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '15px',
    width: '300px', // Width for each card
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  deleteButton: {
    marginTop: '10px',
    padding: '8px 12px',
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
};

export default Wishlist;
