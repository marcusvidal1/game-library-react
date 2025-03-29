import React from 'react';
import { FaWindows, FaPlaystation, FaXbox } from "react-icons/fa";
import { BsNintendoSwitch } from "react-icons/bs";
import '../styles/filtros.css';

function Filtros({
  generoSelecionado,
  setGeneroSelecionado,
  plataformaSelecionada,
  setPlataformaSelecionada
}) {
 
  const generosPrincipais = [
    { id: 4, name: "Action" },
    { id: 51, name: "Indie" },
    { id: 3, name: "Adventure" },
    { id: 5, name: "RPG" },
    { id: 10, name: "Strategy" },
    { id: 2, name: "Shooter" },
    { id: 7, name: "Puzzle" }
  ];

  const plataformasFixas = [
    'PC',
    'PlayStation 5',
    'Xbox Series S/X',
    'Nintendo Switch'
  ];

  return (
    <div className="filtros-container">

      {/* Filtro por gênero */}
      <div className="filtros-genero">
        <button
          onClick={() => setGeneroSelecionado(null)}
          className={!generoSelecionado ? 'ativo' : ''}
        >
          Todos
        </button>

        {generosPrincipais.map((genero) => (
          <button
            key={genero.id}
            onClick={() => setGeneroSelecionado(genero.id)}
            className={generoSelecionado === genero.id ? 'ativo' : ''}
          >
            {genero.name}
          </button>
        ))}
      </div>

      {/* Filtro por plataforma */}
      <div className="filtros-plataforma">
        <button
          onClick={() => setPlataformaSelecionada(null)}
          className={!plataformaSelecionada ? 'ativo' : ''}
        >
          Todas
        </button>

        {plataformasFixas.map((plataforma) => (
          <button
            key={plataforma}
            onClick={() => setPlataformaSelecionada(plataforma)}
            className={plataformaSelecionada === plataforma ? 'ativo' : ''}
          >
            {plataforma === 'PC' && <FaWindows />}
            {plataforma === 'PlayStation 5' && <FaPlaystation />}
            {plataforma === 'Xbox Series S/X' && <FaXbox />}
            {plataforma === 'Nintendo Switch' && <BsNintendoSwitch />}
            {` ${plataforma}`}
          </button>
        ))}
      </div>

    </div>
  );
}

export default Filtros;
