import React, { useState, useEffect } from 'react';

function GameCard({ gameId, addToWishlist, isSelected, onClick }) {
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(0);

  // Define an array of background colors
  const colors = ["#FFB6C1", "#87CEFA", "#90EE90", "#FFD700", "#FF69B4", "#FFA07A", "#20B2AA"];
  const backgroundColor = colors[gameId % colors.length]; // Choose a color based on gameId

  useEffect(() => {
    if (gameId) {
      setIsLoading(true);
      fetch(`https://api.rawg.io/api/games/${gameId}?key=bdaadfbc69b6442fb0a533ec2d7ccf87`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setGame(data);
          setIsLoading(false);
        })
        .catch(error => {
          setError(error);
          setIsLoading(false);
        });
    }
  }, [gameId]);

  const handleAddToWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();
    addToWishlist(game, userRating);
  };

  const handleRatingChange = (event) => {
    event.stopPropagation();
    setUserRating(Number(event.target.value));
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
    <div style={{ ...styles.card, backgroundColor }} onClick={onClick}>
      <img src={game.background_image} alt={game.name} style={styles.image} />
      <div style={styles.details}>
        <h3>{game.name}</h3>

        {isSelected && (
          <>
            <p>Year: {game.released}</p>
            <p>Rating: {game.rating}</p>
            <p>Genres: {game.genres.map(genre => genre.name).join(', ')}</p>
            <p>Playtime: {game.playtime} hours</p>
            <p>Tags: {game.tags.map(tag => tag.name).join(', ')}</p>

            <div style={styles.ratingContainer}>
              <label htmlFor="rating">Rate this game:</label>
              <input
                type="number"
                id="rating"
                value={userRating}
                onClick={(e) => e.stopPropagation()}
                onChange={handleRatingChange}
                min="0"
                max="10"
                style={styles.ratingInput}
              />
            </div>

            <button onClick={handleAddToWishlist} style={styles.button}>
              Add to Wishlist
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    alignItems: 'stretch',
    height: '100%',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  image: {
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
    maxHeight: '200px',
    borderRadius: '8px',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '10px',
    flex: '1',
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
  ratingContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
  },
  ratingInput: {
    padding: '6px',
    width: '50px',
    marginTop: '5px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
};

export default GameCard;
