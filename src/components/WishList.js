import React, { useState } from 'react';

function Wishlist({ game }) {
  const [isAdded, setIsAdded] = useState(false);

  // Function to handle adding a game to the wishlist
  const addToWishlist = () => {
    fetch('https://your-json-server.onrender.com/wishlist', { // Replace with your actual API endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game), // Sending the game data to the wishlist
    })
      .then(response => response.json())
      .then(data => {
        console.log('Game added to wishlist:', data);
        setIsAdded(true);
      })
      .catch(error => console.error('Error adding game to wishlist:', error));
  };

  return (
    <div style={{
      marginBottom: '20px',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    }}>
      <h3>{game.title}</h3>
      <p>{game.description}</p>
      <p><strong>Year:</strong> {game.year}</p>
      <p><strong>Rating:</strong> {game.rating}</p>
      <img 
        src={game.imageUrl} 
        alt={game.title} 
        style={{
          width: '150px',
          height: 'auto',
          marginTop: '10px',
        }} 
      />
      {!isAdded ? (
        <button 
          onClick={addToWishlist}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            textAlign: 'center',
            textDecoration: 'none',
            display: 'inline-block',
            fontSize: '16px',
            marginTop: '10px',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
        >
          Add to Wishlist
        </button>
      ) : (
        <p style={{ marginTop: '10px', color: 'green' }}>Game added to wishlist!</p>
      )}
    </div>
  );
}

export default Wishlist;
