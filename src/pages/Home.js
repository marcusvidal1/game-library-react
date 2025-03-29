import React, { useEffect, useState } from 'react';
import GameCard from '../components/GameCard';
import Filtros from '../components/filtros';
import { GiConsoleController } from "react-icons/gi";
import '../styles/App.css';

import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

function Home() {
  const [jogos, setJogos] = useState([]);
  const [busca, setBusca] = useState('');
  const [generoSelecionado, setGeneroSelecionado] = useState(null);
  const [plataformaSelecionada, setPlataformaSelecionada] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [carregando, setCarregando] = useState(false); // novo estado

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  const buscarJogos = async (pagina = 1, genero = generoSelecionado, plataforma = plataformaSelecionada) => {
    try {
      setCarregando(true); // inicia carregamento
      let url = `https://api.rawg.io/api/games?key=b26202915ae34f5e9889171335d53908&page=${pagina}&page_size=20`;

      if (genero) url += `&genres=${genero}`;
      const plataformasMap = {
        'PC': '4',
        'PlayStation 5': '187',
        'Xbox Series S/X': '186',
        'Nintendo Switch': '7'
      };
      if (plataforma && plataformasMap[plataforma]) {
        url += `&platforms=${plataformasMap[plataforma]}`;
      }

      const resposta = await fetch(url);
      const dados = await resposta.json();

      if (pagina === 1) setJogos(dados.results);
      else setJogos(prev => [...prev, ...dados.results]);

    } catch (erro) {
      console.log('Erro ao buscar jogos:', erro);
    } finally {
      setCarregando(false); // finaliza carregamento
    }
  };

  useEffect(() => {
    setPaginaAtual(1);
    buscarJogos(1, generoSelecionado, plataformaSelecionada);
  }, [generoSelecionado, plataformaSelecionada]);

  const carregarMais = () => {
    const proxima = paginaAtual + 1;
    setPaginaAtual(proxima);
    buscarJogos(proxima, generoSelecionado, plataformaSelecionada);
  };

  return (
    <div className="pagina-home">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: true, zIndex: -1 },
          background: { color: "transparent" },
          particles: {
            number: { value: 60 },
            color: { value: "#facc15" },
            size: { value: 2 },
            move: { enable: true, speed: 0.5 },
            links: { enable: true, color: "#facc15", distance: 150 }
          }
        }}
      />

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

        <Filtros
          jogos={jogos}
          generoSelecionado={generoSelecionado}
          setGeneroSelecionado={setGeneroSelecionado}
          plataformaSelecionada={plataformaSelecionada}
          setPlataformaSelecionada={setPlataformaSelecionada}
        />

        <div className="lista-jogos">
          {jogos
            .filter((jogo) => {
              const nomeMatch = jogo.name.toLowerCase().includes(busca.toLowerCase());
              const generoMatch = !generoSelecionado || jogo.genres.some((g) => g.id === generoSelecionado);
              const plataformaMatch = !plataformaSelecionada || jogo.platforms.some((p) => p.platform.name === plataformaSelecionada);
              return nomeMatch && generoMatch && plataformaMatch;
            })
            .map((jogo) => (
              <GameCard key={jogo.id} jogo={jogo} />
            ))}
        </div>

        <div className="carregar-mais">
          <button className="btn-loading" onClick={carregarMais} disabled={carregando}>
            {carregando ? (
              <>
                Carregando
                <span className="pontos">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </span>
              </>
            ) : (
              <>
                Carregar mais <GiConsoleController />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;