import { useEffect, useRef, useState } from 'react'
import './Category.css'

const categories = [
  { name: 'Adventure',    emoji: '🏔️', desc: 'Trekking, hiking & extreme sports', color: '#f97316' },
  { name: 'Honeymoon',    emoji: '💑', desc: 'Romantic couple getaways',           color: '#ec4899' },
  { name: 'Beach',        emoji: '🏖️', desc: 'Tropical coastal escapes',           color: '#06b6d4' },
  { name: 'Cultural',     emoji: '🏛️', desc: 'Heritage & local tours',            color: '#8b5cf6' },
  { name: 'Family',       emoji: '👨‍👩‍👧‍👦', desc: 'Kid-friendly group trips',         color: '#22c55e' },
  { name: 'Luxury',       emoji: '💎', desc: 'Premium VIP experiences',           color: '#eab308' },
]

export default function Category() {
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
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="category" id="categories" ref={ref}>
      <div className={`category__inner${visible ? ' category__inner--visible' : ''}`}>
        <div className="category__header">
          <h2 className="category__heading">
            Browse by <span className="category__heading-accent">Category</span>
          </h2>
          <p className="category__subtitle">Pick your travel style</p>
        </div>

        <div className="category__grid">
          {categories.map((cat, i) => (
            <a
              href={`/categories/${cat.name.toLowerCase()}`}
              className={`category__card${visible ? ' category__card--visible' : ''}`}
              key={cat.name}
              style={{ '--card-color': cat.color, '--card-delay': `${i * 0.07}s` }}
              onClick={(e) => { e.preventDefault() }}
            >
              <span className="category__card-icon">{cat.emoji}</span>
              <span className="category__card-name">{cat.name}</span>
              {/* <span className="category__card-desc">{cat.desc}</span> */}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
