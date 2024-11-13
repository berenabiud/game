import React from 'react';
import GameCard from './GameCard';

function GameList({ games, addToWishlist }) {
  if (games.length === 0) {
    return <p>No games found</p>;
  }

  const styles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px', // Space between cards
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
    },
  };

  return (
    <div style={styles.container}>
      {games.map((game) => (
        <GameCard
          key={game.id}
          gameId={game.id}
          addToWishlist={addToWishlist}
        />
      ))}
    </div>
  );
}

export default GameList;

