import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import '../styles/slides.css';
import { Link } from 'react-router-dom'; 


const jogosDestaque = [
  { id: 846303, imagem: 'https://cdn.mobygames.com/covers/17663261-cyberpunk-2077-phantom-liberty-xbox-series-front-cover.png' },
  { id: 28, imagem: 'https://assets.vg247.com/current//2018/05/red_dead_redemption_2_cover_art_1.jpg' },
  { id: 545015, imagem: 'https://maceandcrown.com/wp-content/uploads/2023/10/IMG_20231027_150031-900x1200.jpg' },
  { id: 3328, imagem: 'https://cdn1.epicgames.com/offer/14ee004dadc142faaaece5a6270fb628/EGS_TheWitcher3WildHuntCompleteEdition_CDPROJEKTRED_S2_1200x1600-53a8fb2c0201cd8aea410f2a049aba3f' },
  { id: 51325, imagem: 'https://image.api.playstation.com/vulcan/img/rnd/202010/2618/Y02ljdBodKFBiziorYgqftLE.png' }
];

function Slides() {
  return (
    <div className="carrossel">
      <Swiper
        modules={[Autoplay, Pagination]}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        slidesPerGroup={1}
        spaceBetween={20}
        loop={true}
        speed={1000}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
      >
        {jogosDestaque.map((jogo, index) => (
          <SwiperSlide key={index}>
           
            <Link to={`/jogo/${jogo.id}`} className="slide-link" style={{ display: 'block' }}>
              <div className="slide-item">
                <img
                  src={jogo.imagem}
                  alt={`Slide ${index + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </Link>
            
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Slides;
