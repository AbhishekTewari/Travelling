import { useEffect, useRef, useState } from 'react'
import './Destinations.css'

const destinations = [
  {
    name: 'Swiss Alps',
    location: 'Zurich, Switzerland',
    desc: 'Breathtaking mountain views, serene landscapes, and world-class ski resorts await.',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    name: 'Bali Beaches',
    location: 'Indonesia',
    desc: 'Tropical paradise with crystal clear waters, ancient temples, and vibrant culture.',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    name: 'New York City',
    location: 'USA',
    desc: 'The city that never sleeps — iconic landmarks, Broadway shows, and world-class dining.',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
]

export default function Destinations() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="destinations" id="destinations" ref={ref}>
      <div className={`destinations__inner${visible ? ' destinations__inner--visible' : ''}`}>
        <span className="destinations__tagline">Explore the World</span>
        <h2 className="destinations__heading">Popular Destinations</h2>
        <p className="destinations__subtitle">
          Hand-picked locations that promise unforgettable experiences.
        </p>

        <div className="destinations__grid">
          {destinations.map((d, i) => (
            <article className="destinations__card" key={i}>
              <div
                className="destinations__card-image"
                style={{ background: d.gradient }}
              >
                <span className="destinations__card-emoji">
                  {i === 0 ? '🏔️' : i === 1 ? '🏝️' : '🗽'}
                </span>
              </div>
              <div className="destinations__card-body">
                <h3 className="destinations__card-name">{d.name}</h3>
                <p className="destinations__card-location">{d.location}</p>
                <p className="destinations__card-desc">{d.desc}</p>
                <a
                  href="#book"
                  className="destinations__card-link"
                  onClick={(e) => {
                    e.preventDefault()
                    // Future: route to destination page
                  }}
                >
                  Learn More &rarr;
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
