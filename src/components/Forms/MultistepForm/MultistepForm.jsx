import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import './MultistepForm.css';

const destinations = [
  { name: 'Bali', emoji: '🏝️' },
  { name: 'Dubai', emoji: '🌆' },
  { name: 'Thailand', emoji: '🏯' },
  { name: 'Europe', emoji: '🏰' },
  { name: 'Maldives', emoji: '🌊' },
  { name: 'Switzerland', emoji: '🏔️' },
];

const hotelCategories = [
  { stars: 1, name: 'Budget', desc: 'Cozy & affordable stays' },
  { stars: 2, name: 'Standard', desc: 'Comfortable mid-range hotels' },
  { stars: 3, name: 'Premium', desc: 'Upscale rooms & service' },
  { stars: 4, name: 'Ultra Premium', desc: 'Upscale rooms & service' },
  { stars: 5, name: 'Luxury', desc: 'World-class luxury resorts' },
];

const months = [
  { name: 'January', emoji: '❄️' },
  { name: 'February', emoji: '❄️' },
  { name: 'March', emoji: '🌸' },
  { name: 'April', emoji: '🌷' },
  { name: 'May', emoji: '🌿' },
  { name: 'June', emoji: '☀️' },
  { name: 'July', emoji: '☀️' },
  { name: 'August', emoji: '☀️' },
  { name: 'September', emoji: '🍂' },
  { name: 'October', emoji: '🎑' },
  { name: 'November', emoji: '🌧️' },
  { name: 'December', emoji: '❄️' },
];

const stepTitles = ['Plan your trip', 'What kind of trip?', "Who's traveling?", 'Contact details', 'Travel details', 'Origin'];

const tripTypes = [
  { name: 'Romantic Getaway', emoji: '💕', desc: 'For couples & honeymoons' },
  { name: 'Family Adventure', emoji: '👨‍👩‍👧‍👦', desc: 'Fun for all ages' },
  { name: 'Solo Travel', emoji: '🧑‍🤝‍🧑', desc: 'Explore on your terms' },
  { name: 'Group Tour', emoji: '👥', desc: 'Travel with friends' },
  { name: 'Business Trip', emoji: '💼', desc: 'Work & travel' },
  { name: 'Adventure Trip', emoji: '🧗', desc: 'Thrills & outdoors' },
  { name: 'Relaxation & Spa', emoji: '🧖', desc: 'Rest & rejuvenate' },
  { name: 'Cultural Explorer', emoji: '🏛️', desc: 'History & heritage' },
];

export default function MultistepForm({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    destination: '',
    hotelCategory: '',
    days: 4,
    month: '',
    needFlight: false,
    tripType: '',
    adults: 2,
    children: 0,
    email: '',
    phone: '',
    dateStatus: 'not decided',
    travelDate: '',
    bookedTickets: false,
    fromLocation: '',
  });
  const [direction, setDirection] = useState('next');
  const [error, setError] = useState('');
  const [monthOpen, setMonthOpen] = useState(false);
  const [dropdownCoords, setDropdownCoords] = useState(null);
  const [googleReady, setGoogleReady] = useState(false);
  const destinationRef = useRef(null);
  const monthRef = useRef(null);
  const today = new Date().toISOString().split('T')[0];

  // ---- Escape key handler ----
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  // ---- Body scroll lock + escape listener ----
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  // Close month dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (monthRef.current && !monthRef.current.contains(e.target)) {
        setMonthOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.warn('Set VITE_GOOGLE_MAPS_API_KEY in .env for Google Places autocomplete');
      return;
    }

    if (window.google?.maps?.places) {
      if (!googleReady) {
        queueMicrotask(() => setGoogleReady(true));
      }
      return;
    }

    const existingScript = document.querySelector('script[data-google-maps="places-autocomplete"]');
    if (existingScript) {
      const handleLoad = () => setGoogleReady(true);
      existingScript.addEventListener('load', handleLoad);
      return () => existingScript.removeEventListener('load', handleLoad);
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.dataset.googleMaps = 'places-autocomplete';
    script.onload = () => setGoogleReady(true);
    script.onerror = () => console.warn('Google Maps script failed to load');
    document.body.appendChild(script);
  }, [isOpen, googleReady]);

  useEffect(() => {
    if (!googleReady || !destinationRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(destinationRef.current, {
      types: ['(regions)'],
      fields: ['name', 'formatted_address'],
    });

    const listener = autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place?.name) {
        setFormData((prev) => ({ ...prev, destination: place.name }));
      }
    });

    return () => {
      if (listener && typeof listener.remove === 'function') {
        listener.remove();
      }
    };
  }, [googleReady]);

  // ---- Validation ----
  function validateStep(stepNumber) {
    switch (stepNumber) {
      case 1:
        if (!formData.destination) {
          setError('Please select a destination');
          return false;
        }
        if (!formData.hotelCategory) {
          setError('Please select a hotel category');
          return false;
        }
        if (!formData.month) {
          setError('Please select a travel month');
          return false;
        }
        break;
      case 2:
        if (!formData.tripType) {
          setError('Please select a trip type');
          return false;
        }
        break;
      case 3:
        if (!formData.adults || formData.adults < 1) {
          setError('Please enter number of adults (at least 1)');
          return false;
        }
        if (formData.children == null || formData.children < 0) {
          setError('Please enter a valid number of children');
          return false;
        }
        break;
      case 4: {
        if (!formData.email || !formData.email.includes('@')) {
          setError('Please enter a valid email address');
          return false;
        }
        if (!formData.phone) {
          setError('Please enter a valid phone number');
          return false;
        }
        const phoneDigits = (formData.phone || '').replace(/\D/g, '');
        if (phoneDigits.length !== 10) {
          setError('Please enter a 10-digit phone number (e.g. 9876543210)');
          return false;
        }
        break;
      }
      case 5:
        if (formData.dateStatus === 'decided' && !formData.travelDate) {
          setError('Please select your travel date or mark as not decided');
          return false;
        }
        break;
      case 6:
        if (!formData.fromLocation || !formData.fromLocation.trim()) {
          setError('Please enter your origin (From)');
          return false;
        }
        break;
    }
    setError('');
    return true;
  }

  // ---- Navigation ----
  function handleNext() {
    if (!validateStep(step)) return;
    if (step < 6) {
      setDirection('next');
      setStep((s) => s + 1);
    }
  }

  function handleBack() {
    if (step > 1) {
      setDirection('prev');
      setStep((s) => s - 1);
      setError('');
    }
  }

  // ---- Submit handler ----
  function handleSubmit() {
    if (!validateStep(step)) return;
    console.log('Booking enquiry:', formData);
    alert("Thank you! We'll get back to you within 24 hours.");
    onClose();
  }

  // ---- Overlay click ----
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  // ---- Generic updater ----
  function updateField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
  }

  function StepOne({ formData, updateField, destinationRef, monthRef, monthOpen, setMonthOpen, dropdownCoords, setDropdownCoords, googleReady }) {
    return (
      <div className="step1-scroll">
        <div className="step1-field">
          <label className="step1-label">Destination</label>
          <input
            ref={destinationRef}
            type="text"
            className="form-input"
            autoComplete="off"
            placeholder="Search destinations (e.g. Bali, Dubai)..."
            list={!googleReady ? 'dest-list' : undefined}
            value={formData.destination}
            onChange={(e) => updateField('destination', e.target.value)}
          />
          {!googleReady && (
            <datalist id="dest-list">
              {destinations.map((d) => (
                <option key={d.name} value={d.name} />
              ))}
            </datalist>
          )}
        </div>

        <div className="step1-field">
          <label className="step1-label">Hotel Category</label>
          <div className="chip-row">
            {hotelCategories.map((h) => (
              <button
                key={h.name}
                type="button"
                className={`chip ${formData.hotelCategory === h.name ? 'selected' : ''}`}
                onClick={() => updateField('hotelCategory', h.name)}
              >
                {h.stars} Star{h.stars !== 1 ? 's' : ''}
              </button>
            ))}
          </div>
        </div>

        <div className="step1-field">
          <label className="step1-label">Duration</label>
          <div className="chip-row">
            {[3, 4, 7, 10].map((d) => (
              <button
                key={d}
                type="button"
                className={`chip ${formData.days === d ? 'selected' : ''}`}
                onClick={() => updateField('days', d)}
              >
                {d} {d === 1 ? 'day' : 'days'}
              </button>
            ))}
            {formData.days > 10 ? (
              <div className="days-custom-inline">
                <input
                  type="number"
                  className="days-custom-input"
                  min="11"
                  max="30"
                  value={formData.days}
                  onChange={(e) => updateField('days', Math.max(11, Math.min(30, parseInt(e.target.value, 10) || 11)))}
                />
                <span className="days-custom-label">days</span>
                <button
                  type="button"
                  className="chip selected"
                  onClick={() => updateField('days', 7)}
                >
                  ×
                </button>
              </div>
            ) : (
              <button type="button" className="chip" onClick={() => updateField('days', 14)}>
                10+ days
              </button>
            )}
          </div>
        </div>

        <div className="step1-field">
          <label className="step1-label">Travel Month</label>
          <div className="custom-select" ref={monthRef}>
            <button
              type="button"
              className={`custom-select-trigger ${formData.month ? 'has-value' : ''}`}
              onClick={() => {
                const willOpen = !monthOpen;
                if (willOpen) {
                  const rect = monthRef.current?.getBoundingClientRect();
                  if (rect) {
                    const spaceBelow = window.innerHeight - rect.bottom - 10;
                    const spaceAbove = rect.top - 10;
                    if (spaceAbove >= 220 || spaceAbove > spaceBelow) {
                      setDropdownCoords({
                        bottom: window.innerHeight - rect.top + 6,
                        left: rect.left,
                        width: rect.width,
                      });
                    } else {
                      setDropdownCoords({
                        top: rect.bottom + 6,
                        left: rect.left,
                        width: rect.width,
                      });
                    }
                  }
                }
                setMonthOpen(willOpen);
                if (!willOpen) setDropdownCoords(null);
              }}
            >
              <span>{formData.month || 'Select month...'}</span>
              <svg className={`custom-select-arrow ${monthOpen ? 'open' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {monthOpen && dropdownCoords && createPortal(
              <div
                className="custom-select-dropdown"
                style={{
                  position: 'fixed',
                  top: dropdownCoords.top ?? 'auto',
                  bottom: dropdownCoords.bottom ?? 'auto',
                  left: dropdownCoords.left,
                  width: dropdownCoords.width,
                  zIndex: 99999,
                }}
              >
                {months.map((m) => (
                  <button
                    key={m.name}
                    type="button"
                    className={`custom-select-option ${formData.month === m.name ? 'selected' : ''}`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      updateField('month', m.name);
                      setMonthOpen(false);
                      setDropdownCoords(null);
                    }}
                  >
                    {m.name}
                  </button>
                ))}
              </div>,
              document.body
            )}
          </div>
        </div>

        <div className="step1-field">
          <label className="step1-label">Need Flights?</label>
          <div className="flight-toggle-compact">
            <button type="button" className={`chip ${formData.needFlight === true ? 'selected' : ''}`} onClick={() => updateField('needFlight', true)}>
              Yes ✈️
            </button>
            <button type="button" className={`chip ${formData.needFlight === false ? 'selected' : ''}`} onClick={() => updateField('needFlight', false)}>
              No
            </button>
          </div>
        </div>
      </div>
    );
  }

  function StepTwo({ formData, updateField }) {
    return (
      <div>
        <div className="chip-row">
          {tripTypes.map((t) => (
            <button
              key={t.name}
              type="button"
              className={`chip ${formData.tripType === t.name ? 'selected' : ''}`}
              onClick={() => updateField('tripType', t.name)}
              title={t.desc}
            >
              {t.emoji} {t.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  function StepThree({ formData, updateField }) {
    return (
      <div className="step3-fields">
        <div className="step1-field">
          <label className="step1-label">Adults</label>
          <input
            type="number"
            className="form-input"
            min="1"
            value={formData.adults}
            onChange={(e) => updateField('adults', Math.max(1, parseInt(e.target.value, 10) || 1))}
          />
        </div>

        <div className="step1-field">
          <label className="step1-label">Children</label>
          <input
            type="number"
            className="form-input"
            min="0"
            value={formData.children}
            onChange={(e) => updateField('children', Math.max(0, parseInt(e.target.value, 10) || 0))}
          />
        </div>
      </div>
    );
  }

  function StepFour({ formData, updateField }) {
    return (
      <div className="step4-fields">
        <div className="step1-field">
          <label className="step1-label">Email</label>
          <input
            type="email"
            className="form-input"
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <div className="step1-field">
          <label className="step1-label">Phone number</label>
          <input
            type="tel"
            className="form-input"
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder="e.g. 9876543210 (no +91)"
          />
        </div>
      </div>
    );
  }

  function StepFive({ formData, updateField, today }) {
    return (
      <div className="step5-fields">
        <div className="step1-field">
          <label className="step1-label">Travel date</label>
          <div className="chip-row">
            <label className="radio-inline">
              <input
                type="radio"
                name="dateStatus"
                value="not decided"
                checked={formData.dateStatus === 'not decided'}
                onChange={() => updateField('dateStatus', 'not decided')}
              />
              Not decided
            </label>
            <label className="radio-inline">
              <input
                type="radio"
                name="dateStatus"
                value="decided"
                checked={formData.dateStatus === 'decided'}
                onChange={() => updateField('dateStatus', 'decided')}
              />
              Decided
            </label>
          </div>
          {formData.dateStatus === 'decided' && (
            <input
              type="date"
              className="form-input"
              min={today}
              value={formData.travelDate}
              onChange={(e) => updateField('travelDate', e.target.value)}
            />
          )}
        </div>

        <div className="step1-field">
          <label className="step1-label">
            <input
              type="checkbox"
              checked={formData.bookedTickets}
              onChange={(e) => updateField('bookedTickets', e.target.checked)}
              style={{ marginRight: 8 }}
            />
            I have booked my travel tickets
          </label>
        </div>
      </div>
    );
  }

  function StepSix({ formData, updateField }) {
    return (
      <div className="step6-fields">
        <div className="step1-field">
          <label className="step1-label">From (origin)</label>
          <input
            type="text"
            className="form-input"
            value={formData.fromLocation}
            onChange={(e) => updateField('fromLocation', e.target.value)}
            placeholder="City or airport (e.g. New York)"
          />
        </div>
      </div>
    );
  }

  function renderStep() {
    switch (step) {
      case 1:
        return (
          <StepOne
            formData={formData}
            updateField={updateField}
            destinationRef={destinationRef}
            monthRef={monthRef}
            monthOpen={monthOpen}
            setMonthOpen={setMonthOpen}
            dropdownCoords={dropdownCoords}
            setDropdownCoords={setDropdownCoords}
            googleReady={googleReady}
          />
        );
      case 2:
        return <StepTwo formData={formData} updateField={updateField} />;
      case 3:
        return <StepThree formData={formData} updateField={updateField} />;
      case 4:
        return <StepFour formData={formData} updateField={updateField} />;
      case 5:
        return <StepFive formData={formData} updateField={updateField} today={today} />;
      case 6:
        return <StepSix formData={formData} updateField={updateField} />;
      default:
        return null;
    }
  }

  if (!isOpen) return null;

  return (
    <div className="form-overlay" onClick={handleOverlayClick}>
      <div className="form-modal" role="dialog" aria-modal="true" aria-label="Booking form">
        {/* Close button */}
        <button
          type="button"
          className="form-close"
          onClick={onClose}
          aria-label="Close booking form"
        >
          &times;
        </button>

        {/* Progress bar */}
        <div className="form-progress">
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <div key={s} className={`form-progress-segment ${s <= step ? 'active' : ''}`} />
          ))}
        </div>

        {/* Step info */}
        <div className="form-step-info">Step {step} of 6</div>
        <div className="form-step-title">{stepTitles[step - 1]}</div>

        {/* Animated step content */}
        <div className="form-content">
          <div
            key={step}
            className={`form-step ${
              direction === 'next' ? 'form-step-enter-right' : 'form-step-enter-left'
            }`}
          >
            {renderStep()}
          </div>
        </div>

        {/* Error */}
        {error && <div className="form-error">{error}</div>}

        {/* Footer */}
        <div className="form-footer">
          {step > 1 && (
            <button type="button" className="form-btn-back" onClick={handleBack}>
              &larr; Back
            </button>
          )}
          <div className="form-footer-spacer" />
          {step < 6 ? (
            <button type="button" className="form-btn-next" onClick={handleNext}>
              Next &rarr;
            </button>
          ) : (
            <button
              type="button"
              className="form-btn-submit"
              onClick={handleSubmit}
              disabled={!formData.fromLocation || !formData.fromLocation.trim()}
              aria-disabled={!formData.fromLocation || !formData.fromLocation.trim()}
            >
              Submit Enquiry
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
