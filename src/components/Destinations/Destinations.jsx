import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import './Destinations.css'

const destinations = [
  { name: 'Goa', slug: 'goa', price: '₹8,999', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80', desc: 'Sun, sand & vibrant nightlife' },
  { name: 'Kerala', slug: 'kerala', price: '₹12,499', image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&q=80', desc: 'Backwaters & lush greenery' },
  { name: 'Manali', slug: 'manali', price: '₹6,999', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80', desc: 'Snow-capped peaks & adventure' },
  { name: 'Dubai', slug: 'dubai', price: '₹24,999', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80', desc: 'Ultra-modern luxury & desert' },
  { name: 'Bali', slug: 'bali', price: '₹18,999', image: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?w=600&q=80', desc: 'Tropical paradise & culture' },
  { name: 'Maldives', slug: 'maldives', price: '₹32,999', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80', desc: 'Overwater bungalows & reefs' },
  { name: 'Switzerland', slug: 'switzerland', price: '₹79,999', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&q=80', desc: 'Alpine beauty & scenic trains' },
  { name: 'Thailand', slug: 'thailand', price: '₹14,999', image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600&q=80', desc: 'Beaches, temples & street food' },
]

function DestCard({ dest }) {
  return (
    <a href={`/destination/${dest.slug}`} className="dests__card">
      <div className="dests__img-wrap">
        <img src={dest.image} alt={`${dest.name} — Travel Log Book`} className="dests__img" loading="lazy" />
        <div className="dests__overlay" />
        <span className="dests__price">From {dest.price}</span>
      </div>
      <div className="dests__body">
        <h3 className="dests__name">{dest.name}</h3>
        <p className="dests__desc">{dest.desc}</p>
        <span className="dests__link">
          Explore
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </a>
  )
}

export default function Destinations() {
  const destSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Popular Travel Destinations',
    description: 'Top destinations offered by Travel Log Book with best prices.',
    itemListElement: destinations.map((d, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'TouristDestination',
        name: d.name,
        description: d.desc,
        offers: { '@type': 'Offer', price: d.price.replace('₹', '').replace(',', ''), priceCurrency: 'INR' },
      },
    })),
  }

  return (
    <section className="dests" id="destinations">
      <div className="dests__inner">
        <div className="dests__header">
          <span className="dests__tagline">Explore the World</span>
          <h2 className="dests__heading">Popular <span className="dests__heading-accent">Destinations</span></h2>
          <p className="dests__subtitle">Handpicked places loved by our travelers — starting from just ₹6,999</p>
        </div>

        {/* Desktop Grid */}
        <div className="dests__grid">
          {destinations.map((dest) => <DestCard key={dest.slug} dest={dest} />)}
        </div>

        {/* Mobile Swiper — 2 cards at a time */}
        <div className="dests__swiper">
          <Swiper
            modules={[Pagination]}
            slidesPerView={2}
            spaceBetween={12}
            grabCursor={true}
            pagination={{ clickable: true }}
          >
            {destinations.map((dest) => (
              <SwiperSlide key={dest.slug}>
                <DestCard dest={dest} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <script type="application/ld+json">{JSON.stringify(destSchema)}</script>
    </section>
  )
}
