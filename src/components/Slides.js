import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import '../styles/slides.css';

const jogosDestaque = [
  { imagem: 'https://cdn.mobygames.com/covers/17663261-cyberpunk-2077-phantom-liberty-xbox-series-front-cover.png' },
  { imagem: 'https://assets.vg247.com/current//2018/05/red_dead_redemption_2_cover_art_1.jpg' },
  { imagem: 'https://maceandcrown.com/wp-content/uploads/2023/10/IMG_20231027_150031-900x1200.jpg' },
  { imagem: 'https://cdn1.epicgames.com/offer/14ee004dadc142faaaece5a6270fb628/EGS_TheWitcher3WildHuntCompleteEdition_CDPROJEKTRED_S2_1200x1600-53a8fb2c0201cd8aea410f2a049aba3f' },
  { imagem: 'https://blogs-images.forbes.com/erikkain/files/2012/12/cover_close-upDESIGN05.jpg' }
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
            <div className="slide-item">
              <img
                src={jogo.imagem}
                alt={`Slide ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Slides;