import React from 'react';
import GameCard from './GameCard'; // Import GameCard component

function GameList({ games }) {
  return (
    <div className="game-list">
      {games.length === 0 ? (
        <p>No games found</p>
      ) : (
        <div className="game-cards-container">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}

export default GameList;
