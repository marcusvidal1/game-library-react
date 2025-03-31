import React, { useEffect, useState, useRef } from 'react';
import GameCard from '../components/GameCard';
import Filtros from '../components/filtros';
import { GiConsoleController } from "react-icons/gi";
import '../styles/App.css';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import Slides from '../components/Slides';

function Home() {
  const [jogos, setJogos] = useState([]);
  const [busca, setBusca] = useState('');
  const [generoSelecionado, setGeneroSelecionado] = useState(null);
  const [plataformaSelecionada, setPlataformaSelecionada] = useState(null);
  const [ordenacao, setOrdenacao] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [carregando, setCarregando] = useState(false);
  const [totalResultados, setTotalResultados] = useState(0);
  const observerRef = useRef(null);

  const jogosExcluidos = [428090, 974923, 505805, 1000149, 1000019, 684945];
  const jogosPorPagina = 20;

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  const buscarJogos = async (
    pagina = 1,
    genero = generoSelecionado,
    plataforma = plataformaSelecionada,
    order = ordenacao,
    termoBusca = busca
  ) => {
    try {
      setCarregando(true);
      let url = `https://api.rawg.io/api/games?key=b26202915ae34f5e9889171335d53908&page=${pagina}&page_size=${jogosPorPagina}`;

      if (genero) url += `&genres=${genero}`;
      const plataformasMap = {
        'PC': '4',
        'PlayStation 5': '187',
        'Xbox Series S/X': '186',
        'Nintendo Switch': '7',
      };
      if (plataforma && plataformasMap[plataforma]) {
        url += `&platforms=${plataformasMap[plataforma]}`;
      }
      if (order) url += `&ordering=${order}`;
      if (termoBusca) url += `&search=${encodeURIComponent(termoBusca)}`;

      const resposta = await fetch(url);
      const dados = await resposta.json();

      const novosJogos = dados.results || [];
      setTotalResultados(dados.count || 0);

      if (pagina === 1) {
        setJogos(novosJogos);
      } else {
        setJogos((prev) => [...prev, ...novosJogos]);
      }

      return novosJogos.length > 0;
    } catch (erro) {
      console.log('Erro ao buscar jogos:', erro);
      return false;
    } finally {
      setCarregando(false);
    }
  };


  useEffect(() => {
    setPaginaAtual(1);
    setJogos([]);
    buscarJogos(1, generoSelecionado, plataformaSelecionada, ordenacao, busca);
  }, [generoSelecionado, plataformaSelecionada, ordenacao, busca]);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !carregando && jogos.length < totalResultados) {
          const proximaPagina = paginaAtual + 1;
          setPaginaAtual(proximaPagina);
          buscarJogos(proximaPagina, generoSelecionado, plataformaSelecionada, ordenacao, busca);
        }
      },
      { threshold: 0.1 } 
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [carregando, jogos.length, totalResultados, generoSelecionado, plataformaSelecionada, ordenacao, busca]);

  const jogosFiltrados = jogos.filter((jogo) => {
    const nomeMatch = jogo.name.toLowerCase().includes(busca.toLowerCase());
    const generoMatch = !generoSelecionado || jogo.genres.some((g) => g.id === generoSelecionado);
    const plataformaMatch = !plataformaSelecionada || jogo.platforms.some((p) => p.platform.name === plataformaSelecionada);
    const excluido = jogosExcluidos.includes(jogo.id);
    return nomeMatch && generoMatch && plataformaMatch && !excluido;
  });

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
            links: { enable: true, color: "#facc15", distance: 150 },
          },
        }}
      />

      <div className="container">
        <div className="titulo">
          <GiConsoleController className="icone" />
          <span>Game Library</span>
        </div>

        <Slides />

        <div className="barra-superior">
          <input
            type="text"
            placeholder="Buscar jogo..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="campo-busca"
          />

          <div className="ordenar-dropdown">
            <label htmlFor="ordenar">Sort by:</label>
            <select
              id="ordenar"
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value)}
            >
              <option value="">Default</option>
              <option value="-rating">Top Rated</option>
              <option value="-released">Newest</option>
              <option value="released">Oldest</option>
            </select>
          </div>
        </div>

        <Filtros
          generoSelecionado={generoSelecionado}
          setGeneroSelecionado={setGeneroSelecionado}
          plataformaSelecionada={plataformaSelecionada}
          setPlataformaSelecionada={setPlataformaSelecionada}
        />

        <div className="lista-jogos">
          {jogosFiltrados.map((jogo) => (
            <GameCard key={jogo.id} jogo={jogo} />
          ))}
        </div>

        
        {carregando && (
          <div className="loading-indicator">
            Carregando mais jogos...
          </div>
        )}

        
        <div ref={observerRef} style={{ height: '20px' }}></div>

        {/* Debug */}
        <div style={{ marginTop: '20px', color: '#fff' }}>
          Jogos exibidos: {jogosFiltrados.length} | Jogos carregados: {jogos.length} | Total: {totalResultados}
        </div>
      </div>
    </div>
  );
}

export default Home;