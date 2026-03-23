export default function HowItWorks() {
  const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;600;700&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');

  .ns-section {
    padding: 56px 40px;
    background: #f5f6f8;
    font-family: 'IBM Plex Sans', sans-serif;
  }

  .ns-two-col {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 28px;
  }

  /* ── SHARED SECTION HEADER ── */
  .ns-eyebrow {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #e8861a;
    margin-bottom: 8px;
  }
  .ns-title {
    font-family: 'Source Serif 4', serif;
    font-size: 24px;
    font-weight: 700;
    color: #1a3a6b;
    margin-bottom: 12px;
  }
  .ns-divider {
    width: 40px;
    height: 3px;
    background: #e8861a;
    margin-bottom: 24px;
  }

  /* ── NOTICE BOARD ── */
  .ns-notices {
    display: flex;
    flex-direction: column;
    border: 1px solid #dde3ed;
    border-radius: 6px;
    overflow: hidden;
  }
  .ns-notice-item {
    background: #fff;
    padding: 16px 20px;
    border-bottom: 1px solid #edf0f5;
    display: flex;
    gap: 16px;
    align-items: flex-start;
    transition: background 0.15s;
    cursor: pointer;
  }
  .ns-notice-item:last-child { border-bottom: none; }
  .ns-notice-item:hover { background: #f7f9fc; }
  .ns-notice-date {
    min-width: 56px;
    text-align: center;
    background: #1a3a6b;
    color: #fff;
    border-radius: 4px;
    padding: 8px 0;
    flex-shrink: 0;
  }
  .ns-date-day { font-size: 20px; font-weight: 700; line-height: 1; display: block; }
  .ns-date-mon { font-size: 9px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: #93b3d8; }
  .ns-notice-title { font-size: 13px; font-weight: 600; color: #1a2332; margin-bottom: 4px; line-height: 1.5; }
  .ns-notice-meta { font-size: 11px; color: #94a3b8; }
  .ns-notice-tag {
    display: inline-block;
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 2px 7px;
    border-radius: 2px;
    margin-left: 8px;
    vertical-align: middle;
  }
  .tag-new { background: #dcfce7; color: #166534; }
  .tag-imp { background: #fef3c7; color: #92400e; }
  .tag-upd { background: #dbeafe; color: #1e40af; }

  /* ── IMPORTANT LINKS & DOWNLOADS ── */
  .il-wrap { display: flex; flex-direction: column; gap: 14px; }

  /* links list card */
  .il-card {
    background: #fff;
    border: 1px solid #dde3ed;
    border-radius: 6px;
    overflow: hidden;
  }
  .il-card-header {
    background: #1a3a6b;
    padding: 12px 18px;
    display: flex;
    align-items: center;
    gap: 8px;
    color: #fff;
    font-size: 13px;
    font-weight: 600;
  }
  .il-link-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 13px 18px;
    border-bottom: 1px solid #edf0f5;
    cursor: pointer;
    transition: background 0.15s;
    text-decoration: none;
  }
  .il-link-row:last-child { border-bottom: none; }
  .il-link-row:hover { background: #f7f9fc; }
  .il-link-icon {
    width: 34px;
    height: 34px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }
  .il-link-body { flex: 1; }
  .il-link-name { font-size: 13px; font-weight: 500; color: #1a2332; }
  .il-link-meta { font-size: 11px; color: #94a3b8; margin-top: 2px; }
  .il-link-badge {
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 3px 8px;
    border-radius: 3px;
    flex-shrink: 0;
  }
  .badge-pdf  { background: #fee2e2; color: #b91c1c; }
  .badge-link { background: #dbeafe; color: #1e40af; }
  .badge-doc  { background: #ede9fe; color: #6d28d9; }
  .badge-xls  { background: #dcfce7; color: #15803d; }
`;

  const notices = [
    { day: "18", mon: "MAR", title: "System maintenance scheduled from 2:00 AM to 4:00 AM on March 22, 2026", dept: "IT Dept", tag: "imp", tagLabel: "Important" },
    { day: "15", mon: "MAR", title: "New category added: Urban Flooding & Drainage complaints now accepted", dept: "PWD", tag: "new", tagLabel: "New" },
    { day: "10", mon: "MAR", title: "Complaint resolution SLA updated — critical issues now resolved within 48 hours", dept: "Admin", tag: "upd", tagLabel: "Updated" },
    { day: "05", mon: "MAR", title: "Municipal ward boundary re-mapping effective April 1, 2026 — update your ward details", dept: "Revenue Dept", tag: "imp", tagLabel: "Important" },
    { day: "01", mon: "MAR", title: "Mobile app v2.4 released — improved photo upload and GPS tagging for complaints", dept: "IT Dept", tag: "new", tagLabel: "New" },
  ];

  const downloads = [
    { icon: "📄", bg: "#fee2e2", name: "Citizen Complaint User Manual", meta: "PDF · 2.4 MB · Updated Mar 2026", badge: "pdf" },
    { icon: "📋", bg: "#ede9fe", name: "Complaint SLA Guidelines 2026", meta: "DOC · 1.1 MB · Admin Circular", badge: "doc" },
    { icon: "📊", bg: "#dcfce7", name: "Monthly Grievance Report – Feb 2026", meta: "XLS · 3.8 MB · Public Record", badge: "xls" },
    { icon: "📄", bg: "#fee2e2", name: "RTI Application Form (Form A)", meta: "PDF · 180 KB · Govt. of AP", badge: "pdf" },
    { icon: "🔗", bg: "#dbeafe", name: "API Documentation for Developers", meta: "Link · Open Data Portal", badge: "link" },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="ns-section">
        <div className="ns-two-col">
          {/* ── LEFT: NOTICE BOARD ── */}
          <div>
            <div className="ns-eyebrow">Notices</div>
            <div className="ns-title">Official Notice Board</div>
            <div className="ns-divider" />
            <div className="ns-notices">
              {notices.map(n => (
                <div key={n.title} className="ns-notice-item">
                  <div className="ns-notice-date">
                    <span className="ns-date-day">{n.day}</span>
                    <span className="ns-date-mon">{n.mon}</span>
                  </div>
                  <div>
                    <div className="ns-notice-title">
                      {n.title}
                      <span className={`ns-notice-tag tag-${n.tag}`}>{n.tagLabel}</span>
                    </div>
                    <div className="ns-notice-meta">Issued by: {n.dept}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: IMPORTANT LINKS & DOWNLOADS ── */}
          <div>
            <div className="ns-eyebrow">Resources</div>
            <div className="ns-title">Important Links & Downloads</div>
            <div className="ns-divider" />
            <div className="il-wrap">
              {/* Downloads list */}
              <div className="il-card">
                <div className="il-card-header">
                  <span>📥</span> Documents & Downloads
                </div>
                {downloads.map(d => (
                  <div key={d.name} className="il-link-row">
                    <div className="il-link-icon" style={{ background: d.bg }}>{d.icon}</div>
                    <div className="il-link-body">
                      <div className="il-link-name">{d.name}</div>
                      <div className="il-link-meta">{d.meta}</div>
                    </div>
                    <div className={`il-link-badge badge-${d.badge}`}>{d.badge.toUpperCase()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}