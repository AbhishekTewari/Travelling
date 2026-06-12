import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import './Gallery.css'

const galleryItems = [
  { src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', location: 'Bali, Indonesia' },
  { src: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', location: 'Dubai, UAE' },
  { src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80', location: 'Manali, India' },
  { src: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=600&q=80', location: 'Bangkok, Thailand' },
  { src: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600&q=80', location: 'Santorini, Greece' },
  { src: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80', location: 'Serengeti, Tanzania' },
  { src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&q=80', location: 'Swiss Alps' },
  { src: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80', location: 'Goa, India' },
  { src: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&q=80', location: 'Kerala, India' },
  { src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80', location: 'Manali Snow' },
]

export default function Gallery() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Travel Log Book Destinations',
    description: 'Beautiful travel destinations captured by our travelers and guides.',
  }

  return (
    <section className="gallery" id="gallery">
      <div className="gallery__inner">
        {/* Header */}
        <div className="gallery__header">
          <span className="gallery__tagline">Instagram Moments</span>
          <h2 className="gallery__heading">
            Wanderlust <span className="gallery__heading-accent">Gallery</span>
          </h2>
          <p className="gallery__subtitle">
            Real moments captured by our travelers across the world
          </p>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Pagination]}
          slidesPerView={2}
          spaceBetween={12}
          grabCursor={true}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 5, spaceBetween: 16 },
          }}
          className="gallery__swiper"
        >
          {galleryItems.map((item, i) => (
            <SwiperSlide key={i}>
              <a
                href={item.src.split('?')[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="gallery__card"
              >
                <div className="gallery__img-wrap">
                  <img
                    src={item.src}
                    alt={`${item.location} — Travel Log Book`}
                    className="gallery__img"
                    loading="lazy"
                  />
                  <div className="gallery__overlay" />
                  <span className="gallery__location">{item.location}</span>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Instagram CTA */}
        <div className="gallery__cta">
          <span className="gallery__cta-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <path d="M17.5 6.5h.01" />
            </svg>
          </span>
          <span>Follow us </span>
          <strong>@travellogbook</strong>
          <span> on Instagram for daily travel inspiration</span>
        </div>
      </div>

      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </section>
  )
}
