import './WhyChooseUs.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const stats = [
  { number: '250+', label: 'Destinations', desc: 'Across India & abroad' },
  { number: '50,000+', label: 'Happy Travelers', desc: 'And counting every day' },
  { number: '4.8', label: 'Average Rating', desc: 'Based on verified reviews' },
  { number: '24/7', label: 'Travel Support', desc: 'We\'re here when you need us' },
]

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <text x="12" y="16" textAnchor="middle" fontSize="14" fontWeight="700" fill="currentColor" stroke="none">₹</text>
      </svg>
    ),
    title: 'Best Price Guarantee',
    desc: 'We match any genuine quote and often beat it. Our direct partnerships with hotels and airlines mean you always get the best deal without hidden fees.',
    color: '#f97316',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Expert Local Guides',
    desc: 'Every tour is led by certified local guides who bring destinations to life with insider knowledge, hidden spots, and authentic cultural experiences.',
    color: '#22c55e',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        <circle cx="12" cy="16" r="1" />
      </svg>
    ),
    title: 'Secure & Easy Booking',
    desc: 'Book in minutes with our hassle-free platform. All payments are encrypted and protected. Free cancellations up to 48 hours before departure.',
    color: '#06b6d4',
  },
]

export default function WhyChooseUs() {
  return (
    <section className="why" id="why-choose-us">
      {/* Decorative background mesh */}
      <div className="why__bg" aria-hidden="true" />
      <div className="why__inner">
        {/* Header */}
        <div className="why__header">
          <span className="why__tagline">Why Choose Us</span>
          <h2 className="why__heading">Built on Trust, Driven by Passion</h2>
          <p className="why__subtitle">
            We make every journey unforgettable — from the moment you book until you return home with stories to tell.
          </p>
        </div>

        {/* Stats Row */}
        <div className="why__stats">
          {stats.map((stat, i) => (
            <div className="why__stat" key={i}>
              <span className="why__stat-number">{stat.number}</span>
              <span className="why__stat-label">{stat.label}</span>
              <span className="why__stat-desc">{stat.desc}</span>
            </div>
          ))}
        </div>

        {/* Features — Swiper on mobile, Grid on desktop */}
        <div className="why__features-mobile">
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            spaceBetween={20}
            grabCursor={true}
            pagination={{ clickable: true }}
            className="why__features-swiper"
          >
            {features.map((feat, i) => (
              <SwiperSlide key={i}>
                <article className="why__feature" style={{ '--accent': feat.color }}>
                  <div className="why__feature-icon" style={{ background: `${feat.color}14`, color: feat.color }}>
                    {feat.icon}
                  </div>
                  <h3 className="why__feature-title">{feat.title}</h3>
                  <p className="why__feature-desc">{feat.desc}</p>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="why__features">
          {features.map((feat, i) => (
            <article className="why__feature" key={i} style={{ '--accent': feat.color }}>
              <div className="why__feature-icon" style={{ background: `${feat.color}14`, color: feat.color }}>
                {feat.icon}
              </div>
              <h3 className="why__feature-title">{feat.title}</h3>
              <p className="why__feature-desc">{feat.desc}</p>
            </article>
          ))}
        </div>
      </div>

      {/* SEO Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'TravelAgency',
          name: 'Travel Log Book',
          description: 'Premium travel agency offering curated packages, expert guides, and 24/7 support across 250+ destinations in India and abroad.',
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            bestRating: '5',
            ratingCount: '50000',
          },
          areaServed: 'India',
        })}
      </script>
    </section>
  )
}
