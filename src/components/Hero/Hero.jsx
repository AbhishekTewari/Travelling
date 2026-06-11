import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/css/effect-fade';
import "./Hero.css";

const slides = [
   {
    image:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1920&q=80',
    title: 'Beautiful Landscapes',
  },
  {
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1920&q=80',
    title: 'Discover New Destinations',
  },
  {
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80',
    title: 'Travel Without Limits',
  },
  {
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1920&q=80',
    title: 'Explore Nature',
  },
  {
    image:
      'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1920&q=80',
    title: 'Mountain Adventures',
  },
  {
    image:
      'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1920&q=80',
    title: 'Ocean Escapes',
  },
  {
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80',
    title: 'Journey Beyond',
  },
  {
    image:
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1920&q=80',
    title: 'Wilderness Awaits',
  },
];

function Hero() {
  return (
    <section className="hero">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        slidesPerView={1}
        loop={true}
        fadeEffect={{ crossFade: true }}
        navigation
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="hero-slide">
              <img src={slide.image} alt={slide.title} />

              <div className="overlay"></div>
              <div className="hero-content">
                <div className="hero-content-inner">
                  <span className="tag">Explore The World</span>

                  <h1>Discover Amazing Places Around The Globe</h1>

                  <p>
                    Experience unforgettable adventures, breathtaking landscapes,
                    and personalized travel packages designed for you.
                  </p>

                  <div className="hero-buttons">
                    <button className="primary-btn">
                      Plan Your Trip
                    </button>

                    <button className="secondary-btn">
                      Explore Destinations
                    </button>
                  </div>
                </div>

                <div className="hero-contact-form">
                  <h2>Get Free Consultation</h2>

                  <form>
                    <input type="text" placeholder="Full Name" />
                    <input type="email" placeholder="Email Address" />
                    <input type="tel" placeholder="Phone Number" />

                    <select>
                      <option>Select Destination</option>
                      <option>Dubai</option>
                      <option>Bali</option>
                      <option>Thailand</option>
                      <option>Europe</option>
                    </select>

                    <button type="submit">
                      Request Quote
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Hero;