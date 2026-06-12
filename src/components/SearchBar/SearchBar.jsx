import { useState, useRef, useEffect } from 'react'
import './SearchBar.css'

const destinations = ['Goa', 'Kerala', 'Manali', 'Dubai', 'Bali', 'Thailand', 'Maldives', 'Switzerland', 'Rajasthan', 'Ladakh', 'Shimla', 'Darjeeling', 'Sikkim', 'Andaman', 'Srilanka']
const durations = ['1 to 3 days', '4 to 6 days', '7 to 9 days', '10 to 12 days', '13 days or more', 'Not Decided']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function CustomDropdown({ label, icon, value, options, placeholder, onSelect }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="searchbar__field" ref={ref}>
      <label className="searchbar__label">{label}</label>
      <div
        className={`searchbar__input-wrap searchbar__dropdown-trigger ${open ? 'searchbar__dropdown-trigger--open' : ''}`}
        onClick={() => setOpen(!open)}
        role="combobox"
        aria-expanded={open}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(!open) } }}
      >
        <svg className="searchbar__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {icon}
        </svg>
        <span className={`searchbar__dropdown-value ${!value ? 'searchbar__dropdown-value--placeholder' : ''}`}>
          {value || placeholder}
        </span>
        <svg className={`searchbar__chevron-down ${open ? 'searchbar__chevron-down--open' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      {open && (
        <ul className="searchbar__suggestions" role="listbox" aria-label={label}>
          {options.map((opt) => (
            <li
              key={opt}
              className={`searchbar__suggestion ${value === opt ? 'searchbar__suggestion--active' : ''}`}
              onClick={() => { onSelect(opt); setOpen(false) }}
              role="option"
              aria-selected={value === opt}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function SearchBar() {
  const [destination, setDestination] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [duration, setDuration] = useState('')
  const [month, setMonth] = useState('')
  const inputRef = useRef(null)
  const suggestionRef = useRef(null)

  const filtered = destination.trim()
    ? destinations.filter((d) => d.toLowerCase().includes(destination.toLowerCase()))
    : destinations

  const handleSelect = (place) => {
    setDestination(place)
    setShowSuggestions(false)
  }

  const handleInputChange = (e) => {
    setDestination(e.target.value)
    setShowSuggestions(true)
  }

  const handleFocus = () => {
    setShowSuggestions(true)
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (suggestionRef.current && !suggestionRef.current.contains(e.target) &&
          inputRef.current && !inputRef.current.contains(e.target)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    console.log({ destination, duration, month })
  }

  return (
    <section className="searchbar" aria-label="Quick trip search">
      <div className="searchbar__inner">
        <form className="searchbar__form" onSubmit={handleSearch}>
          {/* Destination — Input with autocomplete */}
          <div className="searchbar__field">
            <label className="searchbar__label" htmlFor="search-dest">Destination</label>
            <div className="searchbar__input-wrap" ref={inputRef}>
              <svg className="searchbar__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <input
                type="text"
                id="search-dest"
                value={destination}
                onChange={handleInputChange}
                onFocus={handleFocus}
                placeholder="Where to?"
                className="searchbar__input"
                autoComplete="off"
                aria-label="Destination"
              />
              {destination && (
                <button type="button" className="searchbar__clear" onClick={() => { setDestination(''); setShowSuggestions(true); }} aria-label="Clear destination">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18" /><path d="M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            {showSuggestions && filtered.length > 0 && (
              <ul className="searchbar__suggestions" ref={suggestionRef} role="listbox" aria-label="Suggestions">
                {filtered.map((place) => (
                  <li
                    key={place}
                    className={`searchbar__suggestion ${destination === place ? 'searchbar__suggestion--active' : ''}`}
                    onClick={() => handleSelect(place)}
                    role="option"
                    aria-selected={destination === place}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {place}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Duration — Custom Dropdown */}
          <CustomDropdown
            label="Duration"
            placeholder="How long?"
            value={duration}
            options={durations}
            onSelect={setDuration}
            icon={<><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>}
          />

          {/* Month — Custom Dropdown */}
          <CustomDropdown
            label="Month"
            placeholder="Not Decided"
            value={month}
            options={months}
            onSelect={setMonth}
            icon={<><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h18" /></>}
          />

          {/* Submit */}
          <button type="submit" className="searchbar__btn" aria-label="Search trips">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <span className="searchbar__btn-text">Search</span>
          </button>
        </form>
      </div>
    </section>
  )
}