import React from 'react';
import '../styles/GameCard.css';

function GameCard({ jogo }) {
  return (
    <div className="card-jogo">
      <img
        src={jogo.background_image}
        alt={jogo.name}
      />
      <h3>{jogo.name}</h3>
      <p>Nota: {jogo.rating}</p>
    </div>
  );
}

export default GameCard;