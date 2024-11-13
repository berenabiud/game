import React, { useState, useEffect } from 'react';

function GameCard({ gameId, addToWishlist }) { // addToWishlist should be passed as a prop here
  const [game, setGame] = useState(null); // Store fetched game data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    if (gameId) {
      setIsLoading(true); // Start loading
      fetch(`https://api.rawg.io/api/games/${gameId}?key=bdaadfbc69b6442fb0a533ec2d7ccf87`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setGame(data); // Set fetched game data
          setIsLoading(false); // Set loading to false once the data is loaded
        })
        .catch(error => {
          setError(error); // Handle error
          setIsLoading(false); // Set loading to false if there's an error
        });
    }
  }, [gameId]); // Effect will run only when the gameId changes

  const handleAddToWishlist = () => {
    addToWishlist(game); // Call addToWishlist prop function when button is clicked
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching game: {error.message}</div>;
  }

  if (!game) {
    return <div>No game data found</div>;
  }

  return (
    <div style={styles.card}>
      <img src={game.background_image} alt={game.name} style={styles.image} />
      <div style={styles.details}>
        <h3>{game.name}</h3>
        <p>Year: {game.released}</p>
        <p>Rating: {game.rating}</p>

        {/* Add to Wishlist Button */}
        <button onClick={handleAddToWishlist} style={styles.button}>
          Add to Wishlist
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'row',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
  },
  image: {
    width: '200px',
    height: 'auto',
    marginRight: '20px',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    padding: '6px 12px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default GameCard;
