import React, { useState } from 'react';
import GameCard from './GameCard';

function GameList({ games, addToWishlist }) {
  const [selectedGameId, setSelectedGameId] = useState(null); // Track the selected game ID

  if (games.length === 0) {
    return <p>No games found</p>;
  }

  const handleCardClick = (gameId, event) => {
    event.preventDefault(); // Prevent page reload
    event.stopPropagation(); // Prevent event from bubbling up
    // Toggle the selected game, if clicked again, it collapses
    setSelectedGameId(gameId === selectedGameId ? null : gameId);
  };

  const styles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      justifyContent: 'center',
      alignItems: 'stretch',
      padding: '20px',
    },
    cardWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      flex: '1 1 300px',
      maxWidth: '300px',
      minHeight: '400px',
      boxSizing: 'border-box',
    },
  };

  return (
    <div style={styles.container}>
      {games.map((game) => (
        <div style={styles.cardWrapper} key={game.id}>
          <GameCard
            gameId={game.id}
            addToWishlist={addToWishlist}
            isSelected={game.id === selectedGameId} // Determine if this card is selected
            onClick={(event) => handleCardClick(game.id, event)} // Handle card click
          />
        </div>
      ))}
    </div>
  );
}

export default GameList;
