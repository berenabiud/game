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
      console.log("Delete response:", response); // Debugging log
      if (!response.ok) {
        throw new Error('Failed to delete game');
      }
      console.log("Game deleted successfully"); // Debugging log
      setWishlist(prevWishlist => {
        console.log("Previous Wishlist:", prevWishlist); // Debugging log
        return prevWishlist.filter(game => game.id !== gameId);
      });
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
        <div style={styles.row}>
          {wishlist.map(game => (
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
          ))}
        </div>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f0f0f0',
  },
  row: {
    display: 'flex',
    flexDirection: 'row', // Arrange items in a row
    flexWrap: 'wrap', // Wrap items if they overflow
    gap: '20px', // Space between each card
    listStyle: 'none', // Ensure no bullet points appear
    padding: 0,
    margin: 0,
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '15px',
    width: '300px',
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
    backgroundColor: 'blue',
    color: 'white',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'inline-block',
  },
  error: {
    color: 'red',
  },
};

export default Wishlist;
