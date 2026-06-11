import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import './Blog.css'

const posts = [
  {
    title: 'Top 10 Destinations for 2026',
    desc: 'Discover the most sought-after travel destinations that should be on your bucket list this year.',
    image: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=600&q=80',
    alt: 'World map with travel pins',
    date: 'Jan 12, 2026',
  },
  {
    title: 'Budget Travel Tips for India',
    desc: 'Explore India without breaking the bank with these smart money-saving travel strategies.',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80',
    alt: 'Taj Mahal at sunset',
    date: 'Dec 28, 2025',
  },
  {
    title: 'Best Time to Visit Kerala',
    desc: 'Plan your perfect Kerala getaway with our seasonal guide to weather, festivals and rates.',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=600&q=80',
    alt: 'Kerala backwaters houseboat',
    date: 'Dec 15, 2025',
  },
  {
    title: 'Solo Travel Safety Guide',
    desc: 'Essential safety tips every solo traveler must know before embarking on their adventure.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    alt: 'Traveler with backpack',
    date: 'Nov 30, 2025',
  },
  {
    title: 'Hidden Gems of Northeast India',
    desc: 'Venture off the beaten path to discover breathtaking landscapes and rich tribal cultures.',
    image: 'https://images.unsplash.com/photo-1580651315530-69c8e0026377?auto=format&fit=crop&w=600&q=80',
    alt: 'Misty mountains of Northeast India',
    date: 'Nov 18, 2025',
  },
   {
    title: 'Budget Travel Tips for India',
    desc: 'Explore India without breaking the bank with these smart money-saving travel strategies.',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80',
    alt: 'Taj Mahal at sunset',
    date: 'Dec 28, 2025',
  },
  {
    title: 'Best Time to Visit Kerala',
    desc: 'Plan your perfect Kerala getaway with our seasonal guide to weather, festivals and rates.',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=600&q=80',
    alt: 'Kerala backwaters houseboat',
    date: 'Dec 15, 2025',
  },
  {
    title: 'Solo Travel Safety Guide',
    desc: 'Essential safety tips every solo traveler must know before embarking on their adventure.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    alt: 'Traveler with backpack',
    date: 'Nov 30, 2025',
  },
  {
    title: 'Hidden Gems of Northeast India',
    desc: 'Venture off the beaten path to discover breathtaking landscapes and rich tribal cultures.',
    image: 'https://images.unsplash.com/photo-1580651315530-69c8e0026377?auto=format&fit=crop&w=600&q=80',
    alt: 'Misty mountains of Northeast India',
    date: 'Nov 18, 2025',
  }
]

export default function Blog() {
  return (
    <section className="blog" id="blog">
      <div className="blog__inner">
        <div className="blog__header">
          <span className="blog__tagline">Travel Guides</span>
          <h2 className="blog__heading">Latest from Our Blog</h2>
          <p className="blog__subtitle">
            Tips, guides & stories from our travelers.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={2}
          spaceBetween={16}
          grabCursor={true}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          className="blog__swiper"
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {posts.map((post, i) => (
            <SwiperSlide key={i}>
              <article className="blog__card">
                <div className="blog__card-image">
                  <img src={post.image} alt={post.alt} loading="lazy" />
                </div>
                <div className="blog__card-body">
                  <time className="blog__card-date">{post.date}</time>
                  <h3 className="blog__card-title">{post.title}</h3>
                  <p className="blog__card-desc">{post.desc}</p>
                  <a
                    href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="blog__card-cta"
                    onClick={(e) => { e.preventDefault() }}
                  >
                    Read More
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
    </section>
  )
}
