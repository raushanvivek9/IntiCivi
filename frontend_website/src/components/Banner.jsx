import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BG_IMAGES = [
  "https://upload.wikimedia.org/wikipedia/commons/a/a7/Delhi_India_Government.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/4/4e/Tirumala_090615.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/9/96/Delhi_Red_fort.jpg",
];

function Banner() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % BG_IMAGES.length);
        setFading(false);
      }, 600);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
      <style>{`
        .bn-root {
          position: relative;
          min-height: 520px;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .bn-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: opacity 0.6s ease;
        }
        .bn-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(5,15,30,0.72) 0%, rgba(5,15,30,0.55) 60%, rgba(5,15,30,0.75) 100%);
        }
        .bn-tricolor {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: linear-gradient(to right, #FF9900 33.3%, #ffffff 33.3%, #ffffff 66.6%, #138808 66.6%);
          z-index: 10;
        }
        .bn-content {
          position: relative;
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 60px 40px 56px;
          width: 100%;
        }
        .bn-emblem {
          width: 72px;
          height: 72px;
          margin-bottom: 14px;
          filter: brightness(0) invert(1) opacity(0.92);
        }
        .bn-site-name {
          font-family: 'Playfair Display', serif;
          font-size: 38px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 6px;
          letter-spacing: -0.01em;
          line-height: 1.1;
        }
        .bn-site-name span { color: #FF9900; }
        .bn-tagline {
          font-size: 13px;
          font-weight: 300;
          color: rgba(255,255,255,0.65);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin: 0 0 40px;
        }
        .bn-tricolor-bar {
          width: 120px;
          height: 3px;
          background: linear-gradient(to right, #FF9900 33.3%, #ffffff 33.3%, #ffffff 66.6%, #138808 66.6%);
          border-radius: 2px;
          margin: 0 auto 40px;
        }

        /* Action cards row */
        .bn-cards {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .bn-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 22px 28px;
          border-radius: 14px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.18);
          cursor: pointer;
          transition: background 0.25s, border-color 0.25s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
          min-width: 150px;
          font-family: 'DM Sans', sans-serif;
        }
        .bn-card:hover {
          background: rgba(255,255,255,0.18);
          border-color: rgba(255,255,255,0.4);
          transform: translateY(-4px);
        }
        .bn-card.primary {
          background: #FF9900;
          border-color: #FF9900;
        }
        .bn-card.primary:hover {
          background: #e68800;
          border-color: #e68800;
          transform: translateY(-4px);
        }
        .bn-card-icon {
          width: 40px; height: 40px;
          border-radius: 10px;
          background: rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          color: #ffffff;
        }
        .bn-card.primary .bn-card-icon {
          background: rgba(255,255,255,0.25);
        }
        .bn-card-label {
          font-size: 13px;
          font-weight: 500;
          color: #ffffff;
          margin: 0;
        }
        .bn-card-sub {
          font-size: 11px;
          font-weight: 300;
          color: rgba(255,255,255,0.6);
          margin: 0;
        }
        .bn-card.primary .bn-card-sub {
          color: rgba(255,255,255,0.75);
        }

        /* Map card — wider */
        .bn-map-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 22px 40px;
          border-radius: 14px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.18);
          cursor: pointer;
          min-width: 180px;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.25s, border-color 0.25s, transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
        }
        .bn-map-card:hover {
          background: rgba(255,255,255,0.18);
          border-color: rgba(255,255,255,0.4);
          transform: translateY(-4px);
        }
        .bn-map-pin {
          position: relative;
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
        }
        .bn-map-ping {
          position: absolute;
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,153,0,0.5);
          animation: mapPing 2s ease-in-out infinite;
        }
        .bn-map-ping2 {
          position: absolute;
          width: 28px; height: 28px;
          border-radius: 50%;
          border: 1.5px solid rgba(255,153,0,0.3);
          animation: mapPing 2s ease-in-out infinite 0.4s;
        }
        .bn-map-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: #FF9900;
          position: relative; z-index: 1;
        }

        /* Dots indicator */
        .bn-dots {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
          z-index: 5;
        }
        .bn-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.35);
          transition: background 0.3s, width 0.3s;
        }
        .bn-dot.active {
          background: #FF9900;
          width: 18px;
          border-radius: 3px;
        }

        @keyframes mapPing {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 0.2; }
        }
      `}</style>

      <div className="bn-root">
        {/* Background images */}
        {BG_IMAGES.map((img, i) => (
          <div
            key={i}
            className="bn-bg"
            style={{
              backgroundImage: `url(${img})`,
              opacity: i === current ? (fading ? 0 : 1) : 0,
            }}
          />
        ))}
        <div className="bn-overlay" />
        <div className="bn-tricolor" />

        <div className="bn-content">
          {/* Emblem */}
          <img
            className="bn-emblem"
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
            alt="Emblem of India"
          />

          {/* Site name */}
          <h1 className="bn-site-name">
            National Civic <span>Issue Portal</span>
          </h1>
          <p className="bn-tagline">Government of India · Andhra Pradesh</p>
          <div className="bn-tricolor-bar" />

          {/* Action cards */}
          <div className="bn-cards">

            {/* Register Complaint — primary */}
            <Link to="/registercomplaint" className="bn-card primary" style={{ textDecoration: 'none' }}>
              <div className="bn-card-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </div>
              <p className="bn-card-label">Report Issue</p>
              <p className="bn-card-sub">Report a civic issue</p>
            </Link>

            {/* Track Status */}
            <button className="bn-card">
              <div className="bn-card-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35M11 8v3l2 2"/>
                </svg>
              </div>
              <p className="bn-card-label">Track Status</p>
              <p className="bn-card-sub">Check your complaint</p>
            </button>

            {/* Set Location — map style */}
            <button className="bn-map-card">
              <div className="bn-map-pin">
                <div className="bn-map-ping" />
                <div className="bn-map-ping2" />
                <div className="bn-map-dot" />
              </div>
              <p className="bn-card-label">Set Location</p>
              <p className="bn-card-sub">Add area / pincode</p>
            </button>

          </div>
        </div>

        {/* Slide dots */}
        <div className="bn-dots">
          {BG_IMAGES.map((_, i) => (
            <div key={i} className={`bn-dot ${i === current ? "active" : ""}`} />
          ))}
        </div>
      </div>
    </>
    );
}

export default Banner;