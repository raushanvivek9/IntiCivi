function Header() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .hdr-root {
          background: #ffffff;
          border-bottom: 1px solid #dedad2;
          font-family: 'DM Sans', sans-serif;
        }
        .hdr-inner {
          max-width: 1350px;
          margin: 0 auto;
          padding: 14px 32px;
          display: flex;
          align-items: center;
        }

        /* LEFT: emblem + divider + title */
        .hdr-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .hdr-emblem {
          width: 48px; height: 56px;
          object-fit: contain; flex-shrink: 0;
        }
        .hdr-divider-v {
          width: 1px; height: 48px;
          background: #dedad2; flex-shrink: 0;
        }
        .hdr-title {
          font-family: 'EB Garamond', serif;
          font-size: 21px; font-weight: 500;
          color: #0a2240; margin: 0;
          letter-spacing: -0.01em; line-height: 1.25;
        }
        .hdr-subtitle {
          font-size: 12px; font-weight: 400;
          color: #8a8780; margin: 3px 0 0;
          letter-spacing: 0.01em;
        }

        /* RIGHT: helpline + flag + seal — pushed to far right */
        .hdr-right {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .hdr-helpline {
          text-align: right;
          padding-right: 20px;
          border-right: 1px solid #dedad2;
        }
        .hdr-helpline-label {
          font-size: 11px; font-weight: 700;
          color: #0a2240; margin: 0; letter-spacing: 0.02em;
        }
        .hdr-helpline-number {
          font-family: 'EB Garamond', serif;
          font-size: 17px; font-weight: 500;
          color: #b8922a; margin: 1px 0 0; line-height: 1.2;
        }
        .hdr-helpline-hours {
          font-size: 10.5px; color: #8a8780; margin: 1px 0 0;
        }
        .hdr-flag {
          width: 68px; height: 46px;
          object-fit: contain;
          border: 1px solid #dedad2;
          border-radius: 2px;
          flex-shrink: 0;
        }
        .hdr-seal {
          width: 50px; height: 50px;
          object-fit: contain;
          opacity: 0.82;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .hdr-inner { padding: 12px 16px; }
          .hdr-helpline { display: none; }
          .hdr-title { font-size: 16px; }
          .hdr-emblem { width: 36px; height: 44px; }
        }
        @media (max-width: 480px) {
          .hdr-seal { display: none; }
          .hdr-flag { width: 52px; height: 36px; }
        }
      `}</style>

      <div className="hdr-root">
        <div className="hdr-inner">

          {/* LEFT: Emblem + Title */}
          <div className="hdr-left">
            <img
              className="hdr-emblem"
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
              alt="Emblem of India"
            />
            <div className="hdr-divider-v" />
            <div>
              <h1 className="hdr-title">National Civic Issue Portal</h1>
              <p className="hdr-subtitle">Government of India · Ministry of Urban Development</p>
            </div>
          </div>

          {/* RIGHT: Helpline + Flag + Seal — far right */}
          <div className="hdr-right">
            <div className="hdr-helpline">
              <p className="hdr-helpline-label">Toll Free Helpline</p>
              <p className="hdr-helpline-number">1800-111-555</p>
              <p className="hdr-helpline-hours">Mon – Sat · 9 AM to 6 PM</p>
            </div>
            <img
              className="hdr-flag"
              src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
              alt="Flag of India"
            />
            <img
              className="hdr-seal"
              src="https://upload.wikimedia.org/wikipedia/commons/c/c0/Seal_of_Supreme_Court_of_India.png"
              alt="Supreme Court Seal"
            />
          </div>

        </div>
      </div>
    </>
  );
}

export default Header;