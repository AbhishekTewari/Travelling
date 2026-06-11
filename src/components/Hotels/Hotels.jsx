import "./Hotels.css";

/* ------------------------------------------------------------------ */
/*  Icons (inline SVG so the component has zero dependencies)          */
/* ------------------------------------------------------------------ */
const BedIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none"
       stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7v11" />
    <path d="M21 18v-5a3 3 0 0 0-3-3H8v8" />
    <path d="M3 13h18" />
    <circle cx="6.5" cy="10.5" r="1.5" />
  </svg>
);

const BuildingIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none"
       stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 21V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v17" />
    <path d="M15 9h3a1 1 0 0 1 1 1v11" />
    <path d="M3 21h18" />
    <path d="M9 7h2M9 11h2M9 15h2" />
  </svg>
);

const ConciergeIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none"
       stroke="currentColor" strokeWidth="2"
       strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18h18" />
    <path d="M4 18a8 8 0 0 1 16 0" />
    <path d="M12 8v2" />
    <path d="M12 5a1 1 0 1 0 0 .01" />
  </svg>
);

/* ------------------------------------------------------------------ */
/*  Default content — replace `src` with your own images / copy        */
/* ------------------------------------------------------------------ */
const DEFAULT_PHOTOS = [
  { src: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=400&h=300&q=80", alt: "Luxury resort pool" },
  { src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&h=300&q=80", alt: "Hotel room with view" },
  { src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&h=300&q=80", alt: "Resort exterior" },
  { src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=400&h=300&q=80", alt: "Hotel lobby" },
];

const DEFAULT_FEATURES = [
  {
    icon: <BedIcon />,
    title: "Comfortable Stays",
    text: "Curabitur fermentum, arcu eleifend massa convallis, id bibendum mi laoreet, in vel vulputate lectus.",
  },
  {
    icon: <BuildingIcon />,
    title: "Hand-picked Hotels",
    text: "Curabitur fermentum, arcu eleifend massa convallis, id bibendum mi laoreet, in vel vulputate lectus.",
  },
  {
    icon: <ConciergeIcon />,
    title: "24/7 Concierge",
    text: "Curabitur fermentum, arcu eleifend massa convallis, id bibendum mi laoreet, in vel vulputate lectus.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function Hotels({
  scriptTitle = "luxury",
  mainTitle = "Beauty Hotels",
  lead = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  photos = DEFAULT_PHOTOS,
  features = DEFAULT_FEATURES,
}) {
  return (
    <section className="hotels">
      {/* top wave divider */}
      <svg className="hotels__wave hotels__wave--top" viewBox="0 0 1440 60"
           preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,30 C240,60 480,0 720,25 C960,50 1200,5 1440,30 L1440,0 L0,0 Z" />
      </svg>

      {/* tilted photo collage */}
      <div className="hotels__gallery">
        {photos.slice(0, 4).map((p, i) => (
          <figure className={`hotels__card hotels__card--${i + 1}`} key={i}>
            <img src={p.src} alt={p.alt} loading="lazy" />
          </figure>
        ))}
      </div>

      {/* intro + features */}
      <div className="hotels__content">
        <div className="hotels__intro">
          <h2 className="hotels__title">
            <span className="hotels__title-script">{scriptTitle}</span>
            <span className="hotels__title-main">{mainTitle}</span>
          </h2>
          <p className="hotels__lead">{lead}</p>
        </div>

        <ul className="hotels__features">
          {features.map((f, i) => (
            <li className="hotels__feature" key={i}>
              <span className="hotels__feature-icon">{f.icon}</span>
              <div className="hotels__feature-body">
                <h3 className="hotels__feature-title">{f.title}</h3>
                <p className="hotels__feature-text">{f.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* bottom wave divider */}
      <svg className="hotels__wave hotels__wave--bottom" viewBox="0 0 1440 60"
           preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,30 C240,0 480,60 720,35 C960,10 1200,55 1440,30 L1440,60 L0,60 Z" />
      </svg>
    </section>
  );
}