import React, { useState } from 'react';
import GameCard from './GameCard';
import '../App.css'; // Import the new CSS file

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

  return (
    <div className="game-list-container">
      {games.map((game) => (
        <div className="game-card-wrapper" key={game.id}>
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
