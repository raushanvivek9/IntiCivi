function StatsSection() {
  const stats = [
    {
      number: "12,034",
      label: "Total Complaints",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>
          <rect x="9" y="3" width="6" height="4" rx="1"/>
          <path d="M9 12h6M9 16h4"/>
        </svg>
      ),
      accent: "#1d6fc4",
      light: "#e8f1fb",
    },
    {
      number: "10,200",
      label: "Resolved",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
          <path d="M22 4L12 14.01l-3-3"/>
        </svg>
      ),
      accent: "#138808",
      light: "#e6f4e6",
    },
    {
      number: "834",
      label: "Pending",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      ),
      accent: "#c47a00",
      light: "#fef3dc",
    },
    {
      number: "25",
      label: "Departments",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2"/>
          <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
          <path d="M12 12v4M10 14h4"/>
        </svg>
      ),
      accent: "#6d28d9",
      light: "#f0ebff",
    },
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
      <style>{`
        .ss-wrap {
          width: 100%;
          background: #f4f6f9;
          padding: 56px 40px;
          font-family: 'DM Sans', sans-serif;
          box-sizing: border-box;
        }
        .ss-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 36px;
        }
        .ss-title {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 700;
          color: #0a1628;
          margin: 0;
          white-space: nowrap;
        }
        .ss-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, #cbd5e1, transparent);
        }
        .ss-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          width: 100%;
        }
        .ss-card {
          background: #ffffff;
          border-radius: 16px;
          border: 1px solid #e8edf5;
          padding: 40px 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: relative;
          overflow: hidden;
        }
        .ss-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: var(--accent);
          border-radius: 16px 16px 0 0;
        }
        .ss-icon-box {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: var(--light);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ss-number {
          font-family: 'Playfair Display', serif;
          font-size: 30px;
          font-weight: 700;
          color: #0a1628;
          margin: 0;
          line-height: 1;
        }
        .ss-label {
          font-size: 14px;
          font-weight: 400;
          color: #64748b;
          margin: 4px 0 0;
        }
        .ss-divider {
          height: 1px;
          background: #f1f5f9;
          margin: 4px 0;
        }
        .ss-footer {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 400;
          color: var(--accent);
        }
        .ss-footer svg {
          flex-shrink: 0;
        }
      `}</style>

      <div className="ss-wrap">
        <div className="ss-header">
          <h2 className="ss-title">Portal Statistics</h2>
          <div className="ss-line" />
        </div>
        <div className="ss-grid">
          {stats.map((s) => (
            <div
              key={s.label}
              className="ss-card"
              style={{ "--accent": s.accent, "--light": s.light }}
            >
              <div className="ss-icon-box">{s.icon}</div>
              <div>
                <p className="ss-number">{s.number}</p>
                <p className="ss-label">{s.label}</p>
              </div>
              <div className="ss-divider" />
              <div className="ss-footer">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                  <polyline points="17 6 23 6 23 12"/>
                </svg>
                Updated today
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default StatsSection;