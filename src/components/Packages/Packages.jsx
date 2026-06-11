import './Packages.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const packages = [
  {
    title: 'Swiss Alps Adventure',
    location: 'Interlaken, Switzerland',
    duration: '7 Days / 6 Nights',
    price: '₹1,29,999',
    tag: '⭐ Best Seller',
    tagColor: '#f97316',
    highlights: ['✈️ Flights Included', '🏨 5★ Hotels', '🚡 Jungfrau Ride'],
    gradient: 'linear-gradient(135deg, #1e3a5f, #2d5a87)',
    bgImg: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Bali Honeymoon Escape',
    location: 'Bali, Indonesia',
    duration: '5 Days / 4 Nights',
    price: '₹79,999',
    tag: '💑 Honeymoon',
    tagColor: '#ec4899',
    highlights: ['🏡 Private Villa', '🌊 Beach Club', '💆 Couple Spa'],
    gradient: 'linear-gradient(135deg, #3b1d3b, #6b2d5b)',
    bgImg: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Thailand Explorer',
    location: 'Bangkok & Phuket',
    duration: '6 Days / 5 Nights',
    price: '₹49,999',
    tag: '💰 Budget Pick',
    tagColor: '#22c55e',
    highlights: ['🏯 Temple Tour', '🍜 Food Trail', '🏖️ Island Hop'],
    gradient: 'linear-gradient(135deg, #1a3a3a, #2d6a5e)',
    bgImg: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
  },
   {
     title: 'Goa Beach Retreat',
     location: 'Goa, India',
     duration: '4 Days / 3 Nights',
     price: '₹34,999',
     tag: '🏖️ Beach Fun',
     tagColor: '#06b6d4',
     highlights: ['🏨 Beach Resort', '🛥️ Sunset Cruise', '🦞 Seafood Dinner'],
     gradient: 'linear-gradient(135deg, #0e3a4a, #1a6b7a)',
      bgImg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Kerala Backwaters',
     location: 'Kerala, India',
     duration: '5 Days / 4 Nights',
     price: '₹44,999',
     tag: '🌿 Nature',
     tagColor: '#22c55e',
     highlights: ['🛶 Houseboat Stay', '🌴 Spice Plantation', '💆 Ayurveda Spa'],
     gradient: 'linear-gradient(135deg, #1a3a2a, #2d6a4a)',
      bgImg: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Dubai Luxury Escape',
     location: 'Dubai, UAE',
     duration: '6 Days / 5 Nights',
     price: '₹1,49,999',
     tag: '💎 Luxury',
     tagColor: '#eab308',
     highlights: ['🏨 Burj View Hotel', '🏜️ Desert Safari', '🛍️ Dubai Mall'],
     gradient: 'linear-gradient(135deg, #3a2a1a, #6a4a1a)',
     bgImg: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
   },
   {
     title: 'Maldives Paradise',
     location: 'Maldives',
     duration: '5 Days / 4 Nights',
     price: '₹1,89,999',
     tag: '⭐ Top Rated',
     tagColor: '#f97316',
     highlights: ['🏡 Overwater Villa', '🐠 Snorkeling', '🍽️ Private Dinner'],
     gradient: 'linear-gradient(135deg, #0a2a3a, #1a5a7a)',
     bgImg: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80',
   },
 ]

export default function Packages() {
  return (
    <section className="packages" id="packages">
      <div className="packages__inner">
        <div className="packages__header">
          <span className="packages__tagline">★ Top Picks</span>
          <h2 className="packages__heading">Featured Packages</h2>
          <p className="packages__subtitle">
            Hand-picked trips our travelers love most.
          </p>
        </div>

        <div className="packages__grid">
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1.18}        // fractional = neighbors peek in
            centeredSlides={true}        // active card sits in the middle
            spaceBetween={14}
            loop={true}
            navigation
            grabCursor={true}
            allowTouchMove={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            className="packages-swiper"
            breakpoints={{
              640:  { slidesPerView: 1.4, centeredSlides: true,  spaceBetween: 16 },
              768:  { slidesPerView: 2,   centeredSlides: false, spaceBetween: 20 },
              1024: { slidesPerView: 3,   centeredSlides: false, spaceBetween: 20 },
            }}
          >
          {packages.map((pkg, i) => (
            <SwiperSlide key={i}>
            <article
              className="packages__card"
              key={i}
            >
              {/* ── Image top ── */}
              <div className="packages__card-image">
                <img src={pkg.bgImg} alt={pkg.title} loading="lazy" />
                <div className="packages__card-overlay" />
                <span
                  className="packages__card-tag"
                  style={{ background: pkg.tagColor }}
                >
                  {pkg.tag}
                </span>
              </div>

              {/* ── Accent bar ── */}
              <div className="packages__card-accent" />

              {/* ── Body ── */}
              <div className="packages__card-body">
                <div className="packages__card-location">{pkg.location}</div>
                <h3 className="packages__card-title">{pkg.title}</h3>

                <div className="packages__card-duration">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {pkg.duration}
                </div>

                <ul className="packages__card-highlights">
                  {pkg.highlights.map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              </div>

              {/* ── Footer with price + CTA ── */}
              <div className="packages__card-footer">
                <div className="packages__card-price">
                  <span className="packages__card-price-label">Starting from</span>
                  <span className="packages__card-price-value">{pkg.price}</span>
                </div>
                <a
                  href={`/packages/${pkg.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="packages__card-cta"
                  onClick={(e) => { e.preventDefault() }}
                >
                  View Package
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </article>
            </SwiperSlide>
          ))}
          </Swiper>
        </div>

        <div className="packages__cta-wrapper">
          <a href="/packages" className="packages__cta" onClick={(e) => { e.preventDefault() }}>
            View All Packages
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
