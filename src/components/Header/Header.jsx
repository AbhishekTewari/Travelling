import { useState, useEffect } from 'react';
import { FiPhone } from "react-icons/fi";
import './Header.css'

export default function Header({ onBookNow }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)
  const handleMobileBookNow = () => {
    closeMenu()
    onBookNow()
  }

  const navClasses = [
    'header__nav',
    loaded ? 'header__nav--loaded' : '',
    scrolled ? 'header__nav--scrolled' : '',
  ].filter(Boolean).join(' ')

  return (
    <header className="header">
      {menuOpen && <div className="header__overlay" onClick={closeMenu} aria-hidden="true" />}
      <div className={navClasses}>
      
        {/* ── Brand ── */}
        <a href="/" className="header__brand" aria-label="Travel Log Book — Home">
          <img
            src="/logo.svg"
            alt="Travel Log Book logo"
            width="32"
            height="32"
            className="header__logo-img"
          />
          <span className="header__name">Travel Log Book</span>
        </a>

        {/* ── Desktop Nav Links ── */}
        <nav aria-label="Main navigation">
          <ul className={`header__links${menuOpen ? ' header__links--open' : ''}`}>
            <li><a href="/honeymoon" className="header__link" onClick={closeMenu}>Honeymoon</a></li>
            <li><a href="/destinations" className="header__link" onClick={closeMenu}>Destinations</a></li>
            <li><a href="/categories" className="header__link" onClick={closeMenu}>Categories</a></li>
            <li><a href="/season" className="header__link" onClick={closeMenu}>Seasonal Guides</a></li>
            <li><a href="/travelogues" className="header__link" onClick={closeMenu}>Travelogues</a></li>
            <li className="header__link-mobile-only">
              <a href="tel:+911234567890" className="header__icon-btn header__cta-mobile" onClick={closeMenu}>
               <FiPhone /> Call Us
              </a>
              <button className="header__cta-mobile" onClick={handleMobileBookNow}>
                Book Now
              </button>
            </li>
          </ul>
        </nav>

        {/* ── Actions ── */}
        <div className="header__actions">
          <a href="tel:+911234567890" className="header__cta header__icon-btn">
            <FiPhone /> Call Us
          </a>
          <button className="header__cta" onClick={onBookNow}>
            Book Now
          </button>
        </div>

        {/* ── Hamburger ── */}
        <button
          className={`header__hamburger${menuOpen ? ' header__hamburger--active' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
