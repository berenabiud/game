import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // For routing back to HomePage

function WishlistPage() {
  const [wishlist, setWishlist] = useState([]); // State to store wishlist items
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Function to generate a random hex color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

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

  // Handle the delete operation
  const handleDelete = (gameId) => {
    fetch(`https://plantsy-q1eq.onrender.com/wishlist/${gameId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete game');
        }
        setWishlist((prevWishlist) =>
          prevWishlist.filter((game) => game.id !== gameId)
        );
      })
      .catch((error) => {
        console.error('Error deleting game:', error);
        setError(error.message);
      });
  };

  if (loading) {
    return <div>Loading Wishlist...</div>;
  }

  if (error) {
    return <div>Error fetching wishlist: {error}</div>;
  }

  return (
    <div style={styles.container}>
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div style={styles.row}>
          {wishlist.map((game) => (
            <div
              key={game.id}
              style={{
                ...styles.card,
                backgroundColor: getRandomColor(), // Apply random background color
              }}
            >
              <h3>{game.name}</h3>
              <p>Released: {game.released}</p>
              <p>Rating: {game.rating}</p>
              <img
                src={game.background_image}
                alt={game.name}
                style={styles.image}
              />
              <button
                onClick={() => handleDelete(game.id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      <Link to="/" style={styles.link}>
        Back to Home
      </Link>
    </div>
  );
}

// Updated styles for WishlistPage with background image and flex row layout
const styles = {
  container: {   padding: '20px',
    width: '100%', // Ensure container takes up 100% of the width
    margin: '0', // Remove margin to make sure it fills the viewport fully
    backgroundColor: '#f9f9f9', // Background color for the page
    backgroundImage: 'url("https://images.unsplash.com/photo-1589241062272-c0a000072dfa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTExfHxnYW1pbmd8ZW58MHx8MHx8fDA%3D")', // Background image URL
    backgroundSize: 'cover', // Ensure the background image covers the entire container
    backgroundPosition: 'center', // Center the background image
    backgroundRepeat: 'no-repeat', // Prevent the background from repeating
    height: '100vh', // Make the container occupy 100% of the viewport height
    display: 'flex',
    flexDirection: 'column', // Align content vertically
    justifyContent: 'flex-start', // Align content at the top
    alignItems: 'center', // Center content horizontally
  },
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px', // Space between cards
    justifyContent: 'center', // Center-align cards
    marginTop: '20px',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '15px',
    width: '250px', // Set a fixed width for each card
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    backgroundColor: '#fff', // Default color will be overridden by random color
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
    backgroundColor: '#ff4d4d', // Red color for delete button
    color: 'white',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  link: {
    display: 'inline-block',
    marginTop: '20px',
    color: '#007BFF',
    textDecoration: 'none',
    fontSize: '16px',
  },
};

export default WishlistPage;
