import { useEffect, useRef, useState } from 'react'
import './Features.css'

const features = [
  {
    icon: '✈️',
    title: 'Curated Experiences',
    desc: 'Hand-picked destinations with local experts who know every hidden gem and cultural treasure.',
  },
  {
    icon: '🏨',
    title: 'Premium Stays',
    desc: 'Luxurious accommodations at unbeatable prices — from boutique hotels to private villas.',
  },
  {
    icon: '🌍',
    title: '24/7 Support',
    desc: 'Dedicated travel assistance round the clock, so you travel with confidence and peace of mind.',
  },
]

export default function Features() {
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
    <section className="features" id="packages" ref={ref}>
      <div className={`features__inner${visible ? ' features__inner--visible' : ''}`}>
        <span className="features__tagline">Why Choose Us</span>
        <h2 className="features__heading">Built for the Modern Traveller</h2>
        <p className="features__subtitle">
          We go beyond the ordinary to create journeys you&rsquo;ll remember forever.
        </p>

        <div className="features__grid">
          {features.map((f, i) => (
            <article className="features__card" key={i}>
              <span className="features__card-icon">{f.icon}</span>
              <h3 className="features__card-title">{f.title}</h3>
              <p className="features__card-desc">{f.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
