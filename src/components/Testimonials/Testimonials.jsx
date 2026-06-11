import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import './Testimonials.css'

const reviews = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai, India',
    avatar: 'PS',
    rating: 5,
    text: 'Our Swiss Alps trip was absolutely magical! Everything was perfectly organized — from the flights to the hotels. The Jungfrau experience was unforgettable. Already planning our next trip!',
    trip: 'Swiss Alps Adventure',
    color: '#f97316',
  },
  {
    name: 'Rahul & Ananya',
    location: 'Delhi, India',
    avatar: 'R&A',
    rating: 5,
    text: 'The Bali honeymoon package exceeded every expectation. Private villa, sunset beach club, couple spa — it was pure romance. Every detail was taken care of. Thank you for making our honeymoon special!',
    trip: 'Bali Honeymoon Escape',
    color: '#ec4899',
  },
  {
    name: 'Amit Patel',
    location: 'Ahmedabad, India',
    avatar: 'AP',
    rating: 5,
    text: 'Best travel agency I have ever worked with. The Thailand trip was budget-friendly but felt luxurious. The food trail and temple tours were highlights. Highly recommended for first-time travelers!',
    trip: 'Thailand Explorer',
    color: '#22c55e',
  },
  {
    name: 'Sneha Kapoor',
    location: 'Bangalore, India',
    avatar: 'SK',
    rating: 4,
    text: 'Booked a family trip to Goa through Travel Log Book. The kids loved the beach activities and the resort was fantastic. Only wish we had one more day! Will definitely book again.',
    trip: 'Goa Family Getaway',
    color: '#06b6d4',
  },
  {
    name: 'Rahul & Ananya',
    location: 'Delhi, India',
    avatar: 'R&A',
    rating: 5,
    text: 'The Bali honeymoon package exceeded every expectation. Private villa, sunset beach club, couple spa — it was pure romance. Every detail was taken care of. Thank you for making our honeymoon special!',
    trip: 'Bali Honeymoon Escape',
    color: '#ec4899',
  },
  {
    name: 'Amit Patel',
    location: 'Ahmedabad, India',
    avatar: 'AP',
    rating: 5,
    text: 'Best travel agency I have ever worked with. The Thailand trip was budget-friendly but felt luxurious. The food trail and temple tours were highlights. Highly recommended for first-time travelers!',
    trip: 'Thailand Explorer',
    color: '#22c55e',
  },
  {
    name: 'Sneha Kapoor',
    location: 'Bangalore, India',
    avatar: 'SK',
    rating: 4,
    text: 'Booked a family trip to Goa through Travel Log Book. The kids loved the beach activities and the resort was fantastic. Only wish we had one more day! Will definitely book again.',
    trip: 'Goa Family Getaway',
    color: '#06b6d4',
  },
]

export default function Testimonials() {
  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials__inner">
        <div className="testimonials__header">
          <span className="testimonials__tagline">Hear from Our Travelers</span>
          <h2 className="testimonials__heading">What Our Guests Say</h2>
          <p className="testimonials__subtitle">
            Real reviews from real travelers who booked with us.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={20}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          grabCursor={true}
          className="testimonials__swiper"
          breakpoints={{
            768: { slidesPerView: 2 },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.name}>
              <article
                className="testimonials__card"
                style={{ '--card-color': review.color }}
              >
                {/* Stars */}
                <div className="testimonials__stars" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, s) => (
                    <svg
                      key={s}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill={s < review.rating ? review.color : '#e2e8f0'}
                      stroke={s < review.rating ? review.color : '#cbd5e1'}
                      strokeWidth="1.5"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="testimonials__text">&ldquo;{review.text}&rdquo;</p>

                {/* Avatar + Info */}
                <div className="testimonials__author">
                  <div
                    className="testimonials__avatar"
                    style={{ background: review.color }}
                  >
                    {review.avatar}
                  </div>
                  <div className="testimonials__info">
                    <span className="testimonials__name">{review.name}</span>
                    <span className="testimonials__meta">
                      {review.location} · {review.trip}
                    </span>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Aggregate Rating */}
        <div className="testimonials__aggregate">
          <div className="testimonials__aggregate-stars">
            {Array.from({ length: 5 }, (_, s) => (
              <svg key={s} width="18" height="18" viewBox="0 0 24 24" fill="#f97316" stroke="#f97316" strokeWidth="1.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <span className="testimonials__aggregate-text">
            <strong>4.8 / 5</strong> — Based on 250+ verified reviews
          </span>
        </div>
      </div>

      {/* Review Schema for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Travel Log Book',
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '250',
            bestRating: '5',
          },
        })}
      </script>
    </section>
  )
}
