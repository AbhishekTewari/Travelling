import { useState, useRef, useCallback } from "react";
import "./Spiritual.css";

/**
 * SpiritualTemples — light "morning-at-the-temple" theme.
 *
 * SWAP IN YOUR OWN PHOTOS:
 *   Each temple has an `image` field (null by default). Add a URL and the
 *   card switches to that photo with a soft scrim; leave it null and an
 *   elegant procedural "temple-at-dawn" scene renders instead.
 */

const REGIONS = [
  {
    id: "north",
    label: "North India",
    sky: ["#DCE7F2", "#F8D9B4"],
    temples: [
      { name: "Kedarnath", deity: "Shiva", location: "Uttarakhand", image: null, accent: "#F2912F",
        blurb: "A Jyotirlinga of Shiva set at 3,583 m in the Garhwal Himalayas, and a cornerstone of the Char Dham Yatra. Open only from spring through autumn." },
      { name: "Kashi Vishwanath", deity: "Shiva", location: "Varanasi", image: null, accent: "#E8703C",
        blurb: "Among the holiest Shiva shrines, rising on the banks of the Ganga. A new corridor now links the sanctum straight to the ghats." },
      { name: "Badrinath", deity: "Vishnu", location: "Chamoli", image: null, accent: "#C9962E",
        blurb: "A Vishnu temple beside the Alaknanda, one of the four Char Dham and a Divya Desam. Its bright facade stands against bare Himalayan rock." },
      { name: "Vaishno Devi", deity: "Shakti", location: "Katra, J&K", image: null, accent: "#D8472E",
        blurb: "A cave shrine to the Mother Goddess in the Trikuta hills, reached by a 12 km mountain trek. Among the most visited pilgrimages in India." },
      { name: "Golden Temple", deity: "Harmandir Sahib", location: "Amritsar", image: null, accent: "#C9962E",
        blurb: "The holiest gurdwara of Sikhism, its gilded sanctum mirrored in the sacred Amrit Sarovar. Open to all, around the clock." },
    ],
  },
  {
    id: "west",
    label: "West India",
    sky: ["#E9DCEF", "#F9CBB0"],
    temples: [
      { name: "Somnath", deity: "Shiva", location: "Gujarat coast", image: null, accent: "#E8703C",
        blurb: "The first among the twelve Jyotirlingas, standing on the Arabian Sea shore at Prabhas Patan. Rebuilt many times across its long history." },
      { name: "Dwarkadhish", deity: "Krishna", location: "Dwarka", image: null, accent: "#F2912F",
        blurb: "Krishna's legendary seaside kingdom and one of the Char Dham. The five-storey shikhara rises where the Gomti meets the sea." },
      { name: "Shirdi Sai Baba", deity: "Sai Baba", location: "Maharashtra", image: null, accent: "#C9962E",
        blurb: "The samadhi shrine of Sai Baba, revered across every faith. One of the most visited pilgrimage towns in the country." },
      { name: "Siddhivinayak", deity: "Ganesha", location: "Mumbai", image: null, accent: "#D8472E",
        blurb: "Mumbai's beloved Ganesha temple in Prabhadevi, dating to 1801. Famous for the devotion of its Tuesday darshan queues." },
      { name: "Trimbakeshwar", deity: "Shiva", location: "Nashik", image: null, accent: "#E8703C",
        blurb: "A Jyotirlinga at the source of the Godavari, distinctive for its three-faced lingam. The river is said to begin within the temple itself." },
    ],
  },
  {
    id: "south",
    label: "South India",
    sky: ["#EFE3D2", "#F6CFA6"],
    temples: [
      { name: "Tirumala Tirupati", deity: "Venkateswara", location: "Andhra Pradesh", image: null, accent: "#C9962E",
        blurb: "The hill abode of Lord Venkateswara, among the most visited shrines on earth. Known for its tonsure offering and famed laddu prasadam." },
      { name: "Meenakshi Amman", deity: "Shakti", location: "Madurai", image: null, accent: "#E8703C",
        blurb: "A vast complex to Goddess Meenakshi and Sundareswarar. Its towering gopurams are encrusted with thousands of painted sculptures." },
      { name: "Ramanathaswamy", deity: "Shiva", location: "Rameswaram", image: null, accent: "#F2912F",
        blurb: "A Jyotirlinga on Rameswaram island, woven into the Ramayana. Home to the longest pillared corridor of any temple in India." },
      { name: "Padmanabhaswamy", deity: "Vishnu", location: "Thiruvananthapuram", image: null, accent: "#D8472E",
        blurb: "Here Vishnu reclines upon the serpent Ananta in eternal repose. A jewel of Dravidian-Kerala temple architecture." },
      { name: "Sabarimala", deity: "Ayyappa", location: "Kerala", image: null, accent: "#C9962E",
        blurb: "A forest hilltop shrine to Lord Ayyappa, reached after a 41-day vratham. The final climb passes through the Periyar reserve." },
    ],
  },
  {
    id: "east",
    label: "East India",
    sky: ["#DEE6F0", "#F4D3C0"],
    temples: [
      { name: "Jagannath Puri", deity: "Jagannath", location: "Odisha", image: null, accent: "#E8703C",
        blurb: "One of the Char Dham and home to Lord Jagannath. Celebrated for the thunderous Rath Yatra, when the deities ride great wooden chariots." },
      { name: "Kamakhya", deity: "Shakti", location: "Guwahati", image: null, accent: "#D8472E",
        blurb: "A powerful Shakti Peetha crowning Nilachal hill. The heart of the Ambubachi Mela and centuries of tantric worship." },
      { name: "Kalighat", deity: "Shakti", location: "Kolkata", image: null, accent: "#F2912F",
        blurb: "A Shakti Peetha to Goddess Kali in the heart of the city. It is from this temple that Kolkata takes its name." },
      { name: "Lingaraja", deity: "Shiva", location: "Bhubaneswar", image: null, accent: "#C9962E",
        blurb: "A grand 11th-century shrine to Harihara, blending Shiva and Vishnu. A masterwork of soaring Kalinga architecture." },
      { name: "Mahabodhi", deity: "Buddha", location: "Bodh Gaya", image: null, accent: "#E8703C",
        blurb: "The UNESCO shrine marking where the Buddha attained enlightenment. A descendant of the original Bodhi tree still shades the spot." },
    ],
  },
];

/* ---------- inline icons (no external dependency) ---------- */

function ChevronLeft({ size = 24, strokeWidth = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight({ size = 24, strokeWidth = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function MapPin({ size = 24, strokeWidth = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/* ---------- decorative SVG ---------- */

function Mandala({ className, style }) {
  const petals = Array.from({ length: 24 });
  return (
    <svg className={className} style={style} viewBox="0 0 200 200" aria-hidden="true">
      <g fill="none" stroke="currentColor">
        <circle cx="100" cy="100" r="96" strokeWidth="0.6" />
        <circle cx="100" cy="100" r="78" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="46" strokeWidth="0.6" />
        <circle cx="100" cy="100" r="22" strokeWidth="0.8" />
        {petals.map((_, i) => {
          const a = (i * 360) / petals.length;
          return (
            <g key={i} transform={`rotate(${a} 100 100)`}>
              <path d="M100 8 C108 30 108 44 100 58 C92 44 92 30 100 8 Z" strokeWidth="0.7" />
              <line x1="100" y1="58" x2="100" y2="78" strokeWidth="0.5" />
            </g>
          );
        })}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 360) / 12;
          return (
            <g key={`p${i}`} transform={`rotate(${a} 100 100)`}>
              <path d="M100 56 C112 72 112 88 100 100 C88 88 88 72 100 56 Z" strokeWidth="0.6" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

function Lotus({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 40" aria-hidden="true">
      <g fill="currentColor">
        <path d="M32 6 C36 16 36 24 32 32 C28 24 28 16 32 6 Z" opacity="0.95" />
        <path d="M32 32 C26 26 20 18 18 10 C26 12 31 20 32 32 Z" opacity="0.8" />
        <path d="M32 32 C38 26 44 18 46 10 C38 12 33 20 32 32 Z" opacity="0.8" />
        <path d="M32 33 C24 30 14 28 6 30 C14 36 24 37 32 33 Z" opacity="0.6" />
        <path d="M32 33 C40 30 50 28 58 30 C50 36 40 37 32 33 Z" opacity="0.6" />
      </g>
    </svg>
  );
}

function Torana({ className }) {
  return (
    <svg className={className} viewBox="0 0 120 16" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.1">
        <path d="M4 14 H44 Q60 14 60 2 Q60 14 76 14 H116" />
      </g>
      <circle cx="60" cy="2" r="2" fill="currentColor" />
    </svg>
  );
}

function Bell({ className, rope = 64 }) {
  const dy = rope - 28; // shift the bell glyph down as the rope grows
  const h = 150 + dy;
  return (
    <svg className={className} viewBox={`0 0 80 ${h}`} aria-hidden="true">
      {/* rope */}
      <line x1="40" y1="0" x2="40" y2={rope} stroke="rgba(120,80,30,.45)" strokeWidth="3" strokeLinecap="round" />
      <g transform={`translate(0 ${dy})`}>
        {/* crown loop */}
        <circle cx="40" cy="33" r="7" fill="none" stroke="currentColor" strokeWidth="4" />
        {/* bell body */}
        <path d="M40 40 C21 43 15 71 12 97 C11 102 15 107 21 107 L59 107 C65 107 69 102 68 97 C65 71 59 43 40 40 Z" fill="currentColor" />
        {/* highlight */}
        <path d="M33 47 C25 56 21 78 20 101 L27 101 C27 78 30 56 36 48 Z" fill="rgba(255,255,255,.32)" />
        {/* rim */}
        <ellipse cx="40" cy="107" rx="30" ry="7" fill="currentColor" />
        <ellipse cx="40" cy="106" rx="30" ry="5" fill="rgba(110,70,20,.28)" />
        {/* clapper */}
        <circle cx="40" cy="119" r="5.5" fill="currentColor" />
      </g>
    </svg>
  );
}

function ShikharaScene({ sky, accent }) {
  return (
    <div className="st-scene" style={{ background: `linear-gradient(170deg, ${sky[0]} 0%, ${sky[1]} 100%)` }}>
      <div
        className="st-scene-glow"
        style={{ background: `radial-gradient(circle, ${accent}bb 0%, ${accent}33 38%, transparent 70%)` }}
      />
      <svg className="st-scene-svg" viewBox="0 0 300 200" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
        <g stroke="rgba(120,70,55,0.35)" strokeWidth="1" fill="none">
          <path d="M40 38 q4 -4 8 0 q4 -4 8 0" />
          <path d="M62 30 q3 -3 6 0 q3 -3 6 0" />
        </g>
        <g fill="rgba(74,40,52,0.5)">
          <path d="M70 200 L70 150 Q70 120 88 110 Q106 120 106 150 L106 200 Z" />
          <path d="M194 200 L194 150 Q194 120 212 110 Q230 120 230 150 L230 200 Z" />
          <path d="M118 200 L118 132 Q118 70 150 44 Q182 70 182 132 L182 200 Z" />
          <rect x="58" y="186" width="184" height="14" />
          <circle cx="150" cy="40" r="4" />
          <rect x="149" y="20" width="2" height="20" />
        </g>
        <g fill={accent}>
          <path d="M151 20 L168 26 L151 32 Z" />
          <rect x="144" y="160" width="12" height="26" rx="6" opacity="0.9" />
        </g>
      </svg>
    </div>
  );
}

/* ---------- main ---------- */

// Generated ONCE at module load — never during render — so it satisfies
// React's purity rules. Math.random() here is fine because this runs at
// import time, not inside a component or hook.
const PETALS = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: 8 + Math.random() * 8,
  dur: 11 + Math.random() * 10,
  delay: Math.random() * 14,
  drift: (Math.random() - 0.5) * 120,
}));

export default function SpiritualTemples() {
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);

  const region = REGIONS[active];

  const scroll = useCallback((dir) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector(".st-card");
    const step = card ? card.offsetWidth + 22 : 320;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  return (
    <section className="st-root" aria-labelledby="st-heading">

      <div className="st-atmos" aria-hidden="true">
        <Bell className="st-bell st-bell-l1" rope={70} />
        <Bell className="st-bell st-bell-l2" rope={44} />
        <Bell className="st-bell st-bell-r1" rope={64} />
        <Bell className="st-bell st-bell-r2" rope={50} />
        <Mandala className="st-mandala st-mandala-a" />
        <Mandala className="st-mandala st-mandala-b" />
        <div className="st-aura st-aura-1" />
        <div className="st-aura st-aura-2" />
        <div className="st-petals">
          {PETALS.map((p) => (
            <span
              key={p.id}
              className="st-petal"
              style={{
                left: `${p.left}%`,
                width: p.size,
                height: p.size * 1.35,
                animationDuration: `${p.dur}s`,
                animationDelay: `${p.delay}s`,
                "--drift": `${p.drift}px`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="st-inner">
        <header className="st-head">
          <span className="st-eyebrow">
            <Lotus className="st-eyebrow-lotus" />
            Sacred Journeys Across India
          </span>
          <h2 id="st-heading" className="st-title">
            Walk the Paths the <em>Devout</em> Have Walked
          </h2>
          <p className="st-sub">
            From Himalayan shrines to seaside Jyotirlingas, discover India's most
            revered temples and let us shape the pilgrimage around you.
          </p>
          <div className="st-divider">
            <span className="st-divider-line" />
            <Lotus className="st-divider-lotus" />
            <span className="st-divider-line" />
          </div>
        </header>

        <div className="st-tabs" role="tablist" aria-label="Temple regions">
          {REGIONS.map((r, i) => (
            <button
              key={r.id}
              role="tab"
              aria-selected={i === active}
              className={`st-tab ${i === active ? "is-active" : ""}`}
              onClick={() => {
                setActive(i);
                if (trackRef.current) trackRef.current.scrollTo({ left: 0, behavior: "smooth" });
              }}
            >
              <span className="st-tab-dot" />
              {r.label}
            </button>
          ))}
        </div>

        <div className="st-carousel">
          <button className="st-arrow st-arrow-l" aria-label="Previous temples" onClick={() => scroll(-1)}>
            <ChevronLeft size={22} />
          </button>

          <ul className="st-track" ref={trackRef} key={region.id}>
            {region.temples.map((t, i) => (
              <li className="st-card" key={t.name} style={{ animationDelay: `${i * 80}ms`, "--accent": t.accent }}>
                <div className="st-card-media">
                  {t.image ? (
                    <>
                      <img src={t.image} alt={t.name} loading="lazy" />
                      <div className="st-card-scrim" />
                    </>
                  ) : (
                    <ShikharaScene sky={region.sky} accent={t.accent} />
                  )}
                  <span className="st-deity">{t.deity}</span>
                </div>

                <div className="st-card-body">
                  <Torana className="st-torana" />
                  <h3 className="st-card-name">{t.name}</h3>
                  <span className="st-card-loc">
                    <MapPin size={13} strokeWidth={2.2} />
                    {t.location}
                  </span>
                  <p className="st-card-blurb">{t.blurb}</p>
                  <button className="st-cta">
                    Book Experience
                    <span className="st-cta-arrow">→</span>
                  </button>
                </div>
                <span className="st-card-glow" />
              </li>
            ))}
          </ul>

          <button className="st-arrow st-arrow-r" aria-label="More temples" onClick={() => scroll(1)}>
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}