import React from 'react';
import './GameCard.css'; // Add custom styling for the card (optional)

function GameCard({ game }) {
  return (
    <div className="game-card">
      <img src={game.background_image} alt={game.name} className="game-card-img" />
      <div className="game-card-content">
        <h3>{game.name}</h3>
        <p>Rating: {game.rating}</p>
        <p>{game.description_raw}</p> {/* Optional: If description is available */}
      </div>
    </div>
  );
}

export default GameCard;
