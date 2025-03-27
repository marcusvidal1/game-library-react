import React, { useEffect, useState } from 'react';
import GameCard from './components/GameCard';
import './styles/App.css';
import { GiConsoleController } from "react-icons/gi";
import { FaWindows, FaPlaystation, FaXbox } from "react-icons/fa";
import { BsNintendoSwitch } from "react-icons/bs";

function App() {
  const [jogos, setJogos] = useState([]);
  const [busca, setBusca] = useState('');
  const [generoSelecionado, setGeneroSelecionado] = useState(null);
  const [plataformaSelecionada, setPlataformaSelecionada] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  
  const buscarJogos = async (pagina = 1) => {
    try {
      const resposta = await fetch(`https://api.rawg.io/api/games?key=b26202915ae34f5e9889171335d53908&page=${pagina}&page_size=20`);
      const dados = await resposta.json();

      if (pagina === 1) {
        setJogos(dados.results);
      } else {
        setJogos(prev => [...prev, ...dados.results]);
      }
    } catch (erro) {
      console.log('Erro ao buscar jogos:', erro);
    }
  };

  useEffect(() => {
    buscarJogos();
  }, []);

  const carregarMais = () => {
    const proxima = paginaAtual + 1;
    setPaginaAtual(proxima);
    buscarJogos(proxima);
  };

  return (
    <div className="container">
      <div className="titulo">
        <GiConsoleController className="icone" />
        <span>Game Library</span>
      </div>

      <input
        type="text"
        placeholder="Buscar jogo..."
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        className="campo-busca"
      />

      {/* Filtro por gênero */}
      <div className="filtros-genero">
        <button
          onClick={() => setGeneroSelecionado(null)}
          className={!generoSelecionado ? 'ativo' : ''}
        >
          Todos
        </button>

        {[...new Set(jogos.flatMap(jogo => jogo.genres.map(g => g.name)))].sort()
          .map((genero) => (
            <button
              key={genero}
              onClick={() => setGeneroSelecionado(genero)}
              className={generoSelecionado === genero ? 'ativo' : ''}
            >
              {genero}
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

      {/* Lista de jogos */}
      <div className="lista-jogos">
        {jogos
          .filter((jogo) => {
            const nomeMatch = jogo.name.toLowerCase().includes(busca.toLowerCase());
            const generoMatch =
              !generoSelecionado || jogo.genres.some((g) => g.name === generoSelecionado);
            const plataformaMatch =
              !plataformaSelecionada || jogo.platforms.some((p) => p.platform.name === plataformaSelecionada);

            return nomeMatch && generoMatch && plataformaMatch;
          })
          .map((jogo) => (
            <GameCard key={jogo.id} jogo={jogo} />
          ))}
      </div>

      {/* Botão "Carregar mais" */}
      <div className="carregar-mais">
        <button onClick={carregarMais}>Carregar mais jogos</button>
      </div>
    </div>
  );
}

export default App;
