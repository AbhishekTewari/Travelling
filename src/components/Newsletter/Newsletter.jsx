import { useState } from 'react'
import './Newsletter.css'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      // Placeholder — wire to API later
    }
  }

  return (
    <section className="newsletter" id="newsletter">
      {/* Decorative top wave */}
      <div className="newsletter__wave" aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
          <path d="M0 40 Q 360 80 720 40 T 1440 40 V 80 H 0 Z" fill="#f9f9f9" />
        </svg>
      </div>

      <div className="newsletter__inner">
        <div className="newsletter__card">
          {/* Left side — Visual */}
          <div className="newsletter__visual">
            <div className="newsletter__visual-bg">
              <img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80"
                alt="Travel inspiration"
                className="newsletter__visual-img"
                loading="lazy"
              />
            </div>
            <div className="newsletter__visual-content">
              <div className="newsletter__stat">
                <span className="newsletter__stat-number">50K+</span>
                <span className="newsletter__stat-label">Travelers subscribed</span>
              </div>
              <p className="newsletter__visual-text">
                Get exclusive travel deals, hidden gems & expert tips delivered to your inbox
              </p>
            </div>
          </div>

          {/* Right side — Form */}
          <div className="newsletter__form-side">
            <div className="newsletter__form-inner">
              <div className="newsletter__icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 7L2 7" />
                </svg>
              </div>
              <h3 className="newsletter__title">Stay Inspired</h3>
              <p className="newsletter__desc">
                Join our newsletter and never miss out on the best travel deals and destination guides.
              </p>

              {subscribed ? (
                <div className="newsletter__success">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <p className="newsletter__success-text">You're subscribed! Check your inbox for your first travel guide. 🎉</p>
                </div>
              ) : (
                <form className="newsletter__form" onSubmit={handleSubmit}>
                  <div className="newsletter__input-wrap">
                    <svg className="newsletter__input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 7l-10 7L2 7" />
                    </svg>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="newsletter__input"
                      required
                      aria-label="Email address"
                    />
                  </div>
                  <button type="submit" className="newsletter__btn">
                    Subscribe
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                    </svg>
                  </button>
                  <p className="newsletter__trust">🔒 No spam. Unsubscribe anytime.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
