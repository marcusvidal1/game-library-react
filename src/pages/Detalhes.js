import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/detalhes.css';
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const particlesOptions = {
  fullScreen: false,
  background: {
    color: { value: "transparent" }
  },
  fpsLimit: 60,
  particles: {
    number: { value: 180 },
    color: { value: "#facc15" },
    shape: { type: "circle" },
    opacity: { value: 0.3 },
    size: { value: { min: 1, max: 3 } },
    collisions: {
      enable: true
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      random: true,
      straight: false,
      outMode: "out"
    }
  },
  detectRetina: true
};

function Detalhes() {
  const { id } = useParams();
  const [jogo, setJogo] = useState(null);

  useEffect(() => {
    const buscarDetalhes = async () => {
      try {
        const resposta = await fetch(`https://api.rawg.io/api/games/${id}?key=b26202915ae34f5e9889171335d53908`);
        const dados = await resposta.json();
        setJogo(dados);
      } catch (erro) {
        console.log('Erro ao buscar detalhes do jogo:', erro);
      }
    };

    buscarDetalhes();
  }, [id]);

  if (!jogo) return <p className="carregando">Carregando...</p>;

  return (
    <div
      className="pagina-detalhes"
      style={{ backgroundImage: `url(${jogo.background_image})` }}
    >
      <Particles
        className="particles-overlay"
        options={particlesOptions}
      />
  
      <div className="conteudo-detalhes">
        <Link to="/" className="btn-voltar-home">
          <FaHome />
        </Link>
        <h1>{jogo.name}</h1>
        <img
          className="detalhes-capa"
          src={jogo.background_image_additional || jogo.background_image}
          alt={jogo.name}
        />
        <p><strong>Descrição:</strong> <span dangerouslySetInnerHTML={{ __html: jogo.description }} /></p>
        <p><strong>Gêneros:</strong> {jogo.genres.map(g => g.name).join(', ')}</p>
        <p><strong>Plataformas:</strong> {jogo.platforms.map(p => p.platform.name).join(', ')}</p>
        <p><strong>Avaliação:</strong> {jogo.rating}</p>
        <p><strong>Data de Lançamento:</strong> {jogo.released}</p>
      </div>
    </div>
  );
}

export default Detalhes;
