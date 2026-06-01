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

const stepTitles = ['Plan your trip', 'What kind of trip?'];

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
    days: 7,
    month: '',
    needFlight: false,
    tripType: '',
  });
  const [direction, setDirection] = useState('next');
  const [error, setError] = useState('');
  const [monthOpen, setMonthOpen] = useState(false);
  const [dropdownCoords, setDropdownCoords] = useState(null);
  const monthRef = useRef(null);

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
    }
    setError('');
    return true;
  }

  // ---- Navigation ----
  function handleNext() {
    if (!validateStep(step)) return;
    if (step < 2) {
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

  // ---- Render step ----
  function renderStep() {
    if (step === 1) {
      return (
        <div className="step1-scroll">
          {/* Destination */}
          <div className="step1-field">
            <label className="step1-label">Destination</label>
            <input
              type="text"
              className="form-input"
              placeholder="Search destinations (e.g. Bali, Dubai)..."
              list="dest-list"
              value={formData.destination}
              onChange={(e) => updateField('destination', e.target.value)}
            />
            <datalist id="dest-list">
              {destinations.map((d) => (
                <option key={d.name} value={d.name} />
              ))}
            </datalist>
          </div>

          {/* Hotel Category */}
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

          {/* Duration */}
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
                    className={`chip selected ${formData.days > 10 ? '' : ''}`}
                    onClick={() => updateField('days', 7)}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="chip"
                  onClick={() => updateField('days', 14)}
                >
                  10+ days
                </button>
              )}
            </div>
          </div>

          {/* Travel Month */}
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
                      // Open above if more space, otherwise below
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
                        e.preventDefault(); // prevent focus loss; fires before document mousedown closes portal
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

          {/* Flights */}
          <div className="step1-field">
            <label className="step1-label">Need Flights?</label>
            <div className="flight-toggle-compact">
              <button type="button" className={`chip ${formData.needFlight === true ? 'selected' : ''}`} onClick={() => updateField('needFlight', true)}>Yes ✈️</button>
              <button type="button" className={`chip ${formData.needFlight === false ? 'selected' : ''}`} onClick={() => updateField('needFlight', false)}>No</button>
            </div>
          </div>
        </div>
      );
    }

    // Step 2
    return (
      <div>
        {/* Trip type grid */}
        <div className="chip-row">
          {tripTypes.map((t) => (
            <button
              key={t.name}
              type="button"
              className={`chip ${formData.tripType === t.name ? 'selected' : ''}`}
              onClick={() => { updateField('tripType', t.name); }}
              title={t.desc}
            >
              {t.emoji} {t.name}
            </button>
          ))}
        </div>

        {/* Summary */}
        <div className="summary-section" style={{ marginTop: '20px' }}>
          <div className="summary-card">
            <span className="summary-label">Destination</span>
            <span className="summary-value">{formData.destination || '—'}</span>
          </div>
          <div className="summary-card">
            <span className="summary-label">Hotel</span>
            <span className="summary-value">{formData.hotelCategory || '—'}</span>
          </div>
          <div className="summary-card">
            <span className="summary-label">Duration</span>
            <span className="summary-value">
              {formData.days} {formData.days === 1 ? 'day' : 'days'}
            </span>
          </div>
          <div className="summary-card">
            <span className="summary-label">Month</span>
            <span className="summary-value">{formData.month || '—'}</span>
          </div>
          <div className="summary-card">
            <span className="summary-label">Flights</span>
            <span className="summary-value">{formData.needFlight ? 'Yes ✈️' : 'No'}</span>
          </div>
        </div>

        {/* Submit */}
        <button type="button" className="submit-btn" onClick={handleSubmit}>
          Submit Enquiry
        </button>
      </div>
    );
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
          {[1, 2].map((s) => (
            <div key={s} className={`form-progress-segment ${s <= step ? 'active' : ''}`} />
          ))}
        </div>

        {/* Step info */}
        <div className="form-step-info">Step {step} of 2</div>
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
          {step < 2 ? (
            <button type="button" className="form-btn-next" onClick={handleNext}>
              Next &rarr;
            </button>
          ) : (
            <button type="button" className="form-btn-submit" onClick={handleSubmit}>
              Submit Enquiry
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
