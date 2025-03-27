import React from 'react';
import { FaWindows, FaPlaystation, FaXbox } from "react-icons/fa";
import { BsNintendoSwitch } from "react-icons/bs";
import '../styles/filtros.css';

function Filtros({
    jogos,
    generoSelecionado,
    setGeneroSelecionado,
    plataformaSelecionada,
    setPlataformaSelecionada
}) {

    const generosDisponiveis = [...new Map(jogos.flatMap(jogo => jogo.genres.map(g => [g.id, g]))).values()]
        .sort((a, b) => a.name.localeCompare(b.name));

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

                {generosDisponiveis.map((genero) => (
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

                {['PC', 'PlayStation 5', 'Xbox Series S/X', 'Nintendo Switch'].map((plataforma) => (
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