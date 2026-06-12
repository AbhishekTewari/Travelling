import { useState } from 'react'
import './Faq.css'

const faqData = [
  {
    id: 'booking',
    label: 'Booking & Payments',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 10h20" />
        <path d="M8 14h2" />
        <path d="M14 14h2" />
      </svg>
    ),
    questions: [
      { q: 'How do I book a travel package?', a: 'Booking is easy! Browse our packages, click "Book Now" on your preferred option, fill in your details, and complete payment. You\'ll receive a confirmation email with your itinerary within minutes.' },
      { q: 'What payment methods do you accept?', a: 'We accept all major credit and debit cards (Visa, Mastercard, American Express), UPI (Google Pay, PhonePe, Paytm), net banking, and EMI options on select cards. All transactions are encrypted through secure payment gateways.' },
      { q: 'Can I pay in EMI or installments?', a: 'Yes! We offer EMI options on most credit cards with 3, 6, or 12-month plans. Simply select EMI at checkout. Availability depends on your card issuer and total booking amount.' },
      { q: 'Is there a booking confirmation?', a: 'Absolutely. Once your payment is processed, you\'ll receive an instant confirmation email containing your booking ID, trip itinerary, hotel and transport details, and local support contact information.' },
      { q: 'Do I need to pay the full amount upfront?', a: 'Not necessarily. Most packages require a 25-50% advance to confirm, with the balance due 7-15 days before departure. Some packages also offer full-payment discounts of up to 10%.' },
      { q: 'Are there any hidden charges?', a: 'No hidden charges — ever! All prices are all-inclusive unless explicitly mentioned. GST, service charges, and any applicable fees are shown clearly before you confirm your booking.' },
    ],
  },
  {
    id: 'travel',
    label: 'Travel & Destinations',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    questions: [
      { q: 'Which destinations do you cover?', a: 'We cover over 250+ destinations across India and 30+ countries worldwide. From the backwaters of Kerala and Himalayan treks to international hotspots like Dubai, Thailand, Maldives, Bali, and Switzerland.' },
      { q: 'Can I customize my itinerary?', a: 'Yes! Every package is fully customizable. Our travel experts tailor the itinerary to your preferences — adjust duration, swap hotels, add activities, or combine destinations. No extra charge for customization.' },
      { q: 'What is typically included in a package?', a: 'Our packages include accommodation, transfers, guided tours, breakfast, and activity costs as mentioned. International packages also include visa assistance. Flights and extra meals are optional add-ons.' },
      { q: 'What is the group size for tours?', a: 'We offer group tours (10-20 people) and private tours. Group tours are great for solo travelers and couples looking to meet people. Private tours offer flexibility for families and friend groups.' },
      { q: 'Can I extend my stay?', a: 'Certainly! We\'ll arrange additional nights at negotiated rates — often 15-20% lower than direct bookings. Just let us know during the booking process.' },
      { q: 'Do you provide travel insurance?', a: 'Yes, we recommend travel insurance and offer plans covering medical emergencies, trip cancellation, lost baggage, and flight delays. International packages include mandatory basic insurance.' },
    ],
  },
  {
    id: 'cancellation',
    label: 'Cancellations & Refunds',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M15 9l-6 6" />
        <path d="M9 9l6 6" />
      </svg>
    ),
    questions: [
      { q: 'What is your cancellation policy?', a: 'Cancellations made 30+ days before departure get a full refund minus a 5% processing fee. 15-29 days: 50% refund. 7-14 days: 25% refund. Less than 7 days: no refund. We try to be as flexible as possible.' },
      { q: 'Can I cancel and get a full refund?', a: 'Full refunds (minus a small processing fee) are available for cancellations made 30 days or more before departure. Some non-refundable components like flights have separate policies disclosed at booking.' },
      { q: 'How long do refunds take?', a: 'Refunds are typically processed within 5-7 business days after cancellation confirmation. It may take 2-3 additional days to reflect in your account, depending on your bank or payment method.' },
      { q: 'Can I change my travel dates?', a: 'Yes! Date changes are free up to 15 days before departure, subject to availability. Changes within 7-14 days incur a nominal fee. We always try to accommodate without extra charges.' },
      { q: 'What if my flight or train is canceled?', a: 'Don\'t worry — our 24/7 support team will immediately rebook you on the next available connection at no extra cost. We monitor all bookings and proactively handle disruptions.' },
    ],
  },
  {
    id: 'safety',
    label: 'Safety & Support',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    questions: [
      { q: 'Is 24/7 support available?', a: 'Absolutely! Our team is available 24/7 via phone, WhatsApp, and email. Every booking comes with a dedicated emergency contact number for your destination, so help is never more than a call away.' },
      { q: 'How do I contact support during my trip?', a: 'You\'ll receive a welcome kit with local emergency numbers, our 24/7 helpline, and WhatsApp support details. Reach us anytime via the in-app chat or toll-free number.' },
      { q: 'Are my payments secure?', a: '100% secure. All payments go through PCI-DSS compliant gateways with 256-bit SSL encryption. We never store your card details. All payments are protected by 3D Secure authentication.' },
      { q: 'What safety measures are in place?', a: 'All guides are certified in first aid and emergency response. We maintain a 1:10 guide-to-traveler ratio, conduct safety briefings before every activity, and have emergency protocols for every destination.' },
      { q: 'Do you offer travel insurance?', a: 'Yes — we partner with leading insurers for comprehensive coverage including medical emergencies (up to ₹10 lakhs), trip cancellation, lost baggage, flight delays, and personal accident coverage.' },
    ],
  },
]

export default function Faq() {
  const [activeTab, setActiveTab] = useState(faqData[0].id)
  const [openIndex, setOpenIndex] = useState(null)
  const [animKey, setAnimKey] = useState(0)

  const currentTab = faqData.find((t) => t.id === activeTab)
  const currentQuestions = currentTab ? currentTab.questions : []

  const handleTabChange = (id) => {
    if (id === activeTab) return
    setActiveTab(id)
    setOpenIndex(null)
    setAnimKey((k) => k + 1)
  }

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.flatMap((tab) =>
      tab.questions.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      }))
    ),
  }

  return (
    <section className="faq" id="faq">
      {/* World-map dot pattern bg */}
      <div className="faq__dot-bg" aria-hidden="true" />

      {/* Floating decorative elements */}
      <div className="faq__deco faq__deco--compass" aria-hidden="true">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.15">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2v20M2 12h20" />
          <path d="M12 6v12M6 12h12" />
          <path d="M12 2l-2 4 2 2 2-2-2-4z" fill="currentColor" stroke="none" />
          <path d="M12 22l-2-4 2-2 2 2-2 4z" fill="currentColor" stroke="none" />
        </svg>
      </div>
      <div className="faq__deco faq__deco--plane" aria-hidden="true">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.12">
          <path d="M22 2l-5 20-5-8-8-5 20-5z" />
        </svg>
      </div>

      <div className="faq__inner">
        {/* Header */}
        <div className="faq__header">
          <span className="faq__tagline">Got Questions?</span>
          <h2 className="faq__heading">
            Frequently Asked <span className="faq__heading-accent">Questions</span>
          </h2>
          <p className="faq__subtitle">
            Everything you need to know before your next adventure
          </p>
        </div>

        {/* Tabs — glassmorphism */}
        <nav className="faq__tabs" role="tablist" aria-label="FAQ categories">
          {faqData.map((tab) => (
            <button
              key={tab.id}
              className={`faq__tab ${activeTab === tab.id ? 'faq__tab--active' : ''}`}
              onClick={() => handleTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`faq-panel-${tab.id}`}
              id={`faq-tab-${tab.id}`}
            >
              <span className="faq__tab-icon">{tab.icon}</span>
              <span className="faq__tab-label">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Accordion Panel */}
        <div
          className="faq__panel"
          role="tabpanel"
          id={`faq-panel-${activeTab}`}
          aria-labelledby={`faq-tab-${activeTab}`}
        >
          {currentQuestions.map((item, i) => (
            <div
              className={`faq__item ${openIndex === i ? 'faq__item--open' : ''}`}
              key={`${animKey}-${i}`}
              style={{ '--i': i }}
            >
              <button
                className="faq__question"
                onClick={() => toggleQuestion(i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${activeTab}-${i}`}
              >
                <span className="faq__number">{(i + 1).toString().padStart(2, '0')}</span>
                <span className="faq__question-text">{item.q}</span>
                <svg
                  className="faq__chevron"
                  width="20" height="20" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor"
                  strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
              <div className="faq__answer-wrapper" id={`faq-answer-${activeTab}-${i}`} role="region">
                <p className="faq__answer">{item.a}</p>
              </div>
              {/* Left accent bar */}
              <div className="faq__bar" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>

      {/* FAQPage Schema */}
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </section>
  )
}
