import { Link } from "react-router-dom";

export default function ServiceCards() {
  const cards = [
    { icon: "📋", title: "Register Complaint", desc: "Report a civic issue in your area", path: "/registercomplaint", accent: "#FF9900", bg: "#fef5e8" },
    { icon: "🔍", title: "Track Complaint", desc: "Check real-time complaint status", path: "/trackissue", accent: "#138808", bg: "#e8f8ee" },
    { icon: "📁", title: "My Complaints", desc: "View your submitted issues", path: "/mycomplaints", accent: "#a855f7", bg: "#f5e8ff" },
    { icon: "🤝", title: "Help / Support", desc: "Contact the concerned authority", path: "/support", accent: "#ef4444", bg: "#fff0f0" },
  ];

  return (
    <section style={{ padding: '48px 24px', background: '#f4f6f9', fontFamily: 'DM Sans, sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24 }}>
        <h2 style={{ margin: 0, fontSize: 26, color: '#0a1628' }}>Citizen Services</h2>
        <div style={{ flex: 1, height: 1, background: '#cbd5e1' }} />
      </div>
      <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.path}
            style={{
              display: 'block',
              background: '#fff',
              border: '1px solid #e8edf5',
              borderRadius: 12,
              padding: 24,
              color: '#0a1628',
              textDecoration: 'none',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.08)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 44, height: 44, borderRadius: 10, background: card.bg, marginBottom: 14 }}>
              <span style={{ fontSize: 22 }}>{card.icon}</span>
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: 16 }}>{card.title}</h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: 13, lineHeight: 1.5 }}>{card.desc}</p>
            <div style={{ marginTop: 18, color: card.accent, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>Open →</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
