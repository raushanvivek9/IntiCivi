import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      <style>{`
        .ft-root {
          background: #0a1628;
          font-family: 'DM Sans', sans-serif;
          border-top: 4px solid transparent;
          border-image: linear-gradient(to right, #FF9900 33.3%, #ffffff 33.3%, #ffffff 66.6%, #138808 66.6%) 1;
        }
        .ft-main {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
          padding: 52px 56px 40px;
          max-width: 100%;
          box-sizing: border-box;
        }
        .ft-brand-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .ft-emblem {
          width: 40px;
          height: 40px;
          filter: brightness(0) invert(1) opacity(0.85);
        }
        .ft-brand-name {
          font-size: 15px;
          font-weight: 500;
          color: #ffffff;
          margin: 0;
          line-height: 1.3;
        }
        .ft-brand-sub {
          font-size: 11px;
          font-weight: 300;
          color: rgba(255,255,255,0.4);
          margin: 0;
        }
        .ft-about {
          font-size: 13px;
          font-weight: 300;
          color: rgba(255,255,255,0.5);
          line-height: 1.75;
          margin: 0 0 20px;
        }
        .ft-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 400;
          color: rgba(255,255,255,0.4);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 20px;
          padding: 4px 12px;
        }
        .ft-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #138808;
          flex-shrink: 0;
        }
        .ft-col-title {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #FF9900;
          margin: 0 0 20px;
        }
        .ft-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .ft-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 300;
          color: rgba(255,255,255,0.55);
          cursor: pointer;
          transition: color 0.2s;
          background: none;
          border: none;
          padding: 0;
          text-align: left;
          font-family: 'DM Sans', sans-serif;
        }
        .ft-link:hover { color: #ffffff; }
        .ft-link::before {
          content: '';
          width: 3px; height: 3px;
          border-radius: 50%;
          background: rgba(255,255,255,0.25);
          flex-shrink: 0;
        }
        .ft-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 14px;
        }
        .ft-contact-icon {
          width: 28px; height: 28px;
          border-radius: 6px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.4);
          flex-shrink: 0;
          margin-top: 1px;
        }
        .ft-contact-label {
          font-size: 11px;
          font-weight: 300;
          color: rgba(255,255,255,0.35);
          margin: 0 0 2px;
        }
        .ft-contact-value {
          font-size: 13px;
          font-weight: 400;
          color: rgba(255,255,255,0.65);
          margin: 0;
        }
        .ft-divider {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin: 0 56px;
        }
        .ft-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 56px;
          gap: 16px;
          flex-wrap: wrap;
        }
        .ft-copy {
          font-size: 12px;
          font-weight: 300;
          color: rgba(255,255,255,0.35);
          margin: 0;
        }
        .ft-copy span { color: rgba(255,255,255,0.55); }
        .ft-bottom-links {
          display: flex;
          gap: 20px;
        }
        .ft-bottom-link {
          font-size: 12px;
          font-weight: 300;
          color: rgba(255,255,255,0.35);
          cursor: pointer;
          transition: color 0.2s;
          background: none;
          border: none;
          font-family: 'DM Sans', sans-serif;
        }
        .ft-bottom-link:hover { color: rgba(255,255,255,0.7); }
      `}</style>

      <footer className="ft-root">
        <div className="ft-main">

          {/* Brand col */}
          <div>
            <div className="ft-brand-logo">
              <img
                className="ft-emblem"
                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg"
                alt="Emblem of India"
              />
              <div>
                <p className="ft-brand-name">National Civic Issue Portal</p>
                <p className="ft-brand-sub">Government of India</p>
              </div>
            </div>
            <p className="ft-about">
              A dedicated platform for reporting and tracking public infrastructure problems with a Dynamic Priority Scoring Engine — making governance faster and transparent.
            </p>
            <span className="ft-badge">
              <span className="ft-badge-dot" />
              Portal is live and operational
            </span>
          </div>

          {/* Quick links */}
          <div>
            <p className="ft-col-title">Quick Links</p>
            <div className="ft-links">
              <Link className="ft-link" to="/registercomplaint">Report Issue</Link>
              <Link className="ft-link" to="/trackissue">Track Complaint</Link>
              <Link className="ft-link" to="/mycomplaints">My Complaints</Link>
              <Link className="ft-link" to="/login">Login / Register</Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <p className="ft-col-title">Resources</p>
            <div className="ft-links">
              <button className="ft-link">Help & Support</button>
              <button className="ft-link">FAQs</button>
              <button className="ft-link">Privacy Policy</button>
              <button className="ft-link">Terms of Use</button>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="ft-col-title">Contact</p>
            <div className="ft-contact-item">
              <div className="ft-contact-icon">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <div>
                <p className="ft-contact-label">Address</p>
                <p className="ft-contact-value">Government of India, New Delhi</p>
              </div>
            </div>
            <div className="ft-contact-item">
              <div className="ft-contact-icon">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <p className="ft-contact-label">Email</p>
                <p className="ft-contact-value">support@gov.in</p>
              </div>
            </div>
            <div className="ft-contact-item">
              <div className="ft-contact-icon">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.1 1.2 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.45-.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <div>
                <p className="ft-contact-label">Helpline</p>
                <p className="ft-contact-value">+91 9502673836</p>
              </div>
            </div>
          </div>

        </div>

        <div className="ft-divider" />

        <div className="ft-bottom">
          <p className="ft-copy">
            © 2026 <span>Government Civic Portal</span> · Developed by Group 4 · All rights reserved
          </p>
          <div className="ft-bottom-links">
            <button className="ft-bottom-link">Accessibility</button>
            <button className="ft-bottom-link">Privacy Policy</button>
            <button className="ft-bottom-link">Terms of Use</button>
            <button className="ft-bottom-link">Sitemap</button>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;