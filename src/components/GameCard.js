import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/GameCard.css';

function GameCard({ jogo }) {
  return (
    <Link to={`/jogo/${jogo.id}`} className="card-jogo">
      <img src={jogo.background_image} alt={jogo.name} />
      <h3>{jogo.name}</h3>
      <p>Nota: {jogo.rating}</p>
    </Link>
  );
}

export default GameCard;