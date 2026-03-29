import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isLoggedIn, getUser } from "../utils/auth";
import LoginModal from "../components/LoginModal";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #0a2240;
    --navy-mid: #14355e;
    --gold: #b8922a;
    --gold-light: #d4aa50;
    --cream: #faf8f3;
    --white: #ffffff;
    --gray-50: #f7f6f2;
    --gray-100: #eeece6;
    --gray-300: #c8c5bb;
    --gray-500: #8a8780;
    --gray-700: #4a4840;
    --text: #1a1814;
    --border: #dedad2;
    --success: #1a6b3c;
    --warning: #b45309;
    --danger: #b71c1c;
    --shadow-sm: 0 1px 3px rgba(10,34,64,0.07), 0 1px 2px rgba(10,34,64,0.05);
    --shadow-md: 0 4px 16px rgba(10,34,64,0.09), 0 2px 6px rgba(10,34,64,0.06);
    --shadow-lg: 0 12px 40px rgba(10,34,64,0.12), 0 4px 12px rgba(10,34,64,0.08);
  }

  body { background: var(--cream); font-family: 'DM Sans', sans-serif; }

  .portal-wrap {
    min-height: 100vh;
    background: var(--cream);
    background-image:
      radial-gradient(ellipse at 20% 0%, rgba(184,146,42,0.06) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 100%, rgba(10,34,64,0.05) 0%, transparent 50%);
  }

  /* ── Breadcrumb ── */
  .breadcrumb {
    max-width: 980px; margin: auto; padding: 14px 32px;
    display: flex; align-items: center; gap: 6px;
    font-size: 12px; color: var(--gray-500);
  }
  .breadcrumb a { color: var(--gray-500); text-decoration: none; }
  .breadcrumb a:hover { color: var(--navy); text-decoration: underline; }
  .breadcrumb .sep { color: var(--gray-300); }
  .breadcrumb .current { color: var(--navy); font-weight: 500; }

  /* ── Page title band ── */
  .page-title-band { background: var(--white); border-bottom: 1px solid var(--border); border-top: 1px solid var(--border); }
  .page-title-inner {
    max-width: 980px; margin: auto; padding: 26px 32px;
    display: flex; justify-content: space-between; align-items: flex-end;
  }
  .page-title-inner h2 { font-family: 'EB Garamond', serif; font-size: 28px; font-weight: 500; color: var(--navy); letter-spacing: -0.01em; }
  .page-title-inner p { font-size: 13.5px; color: var(--gray-500); margin-top: 4px; }
  .title-badge {
    display: inline-flex; align-items: center; gap: 7px;
    background: var(--gray-50); border: 1px solid var(--border); border-radius: 100px;
    padding: 5px 14px; font-size: 12px; color: var(--gray-500);
  }
  .title-badge span { width: 7px; height: 7px; border-radius: 50%; background: var(--success); display: inline-block; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }

  /* ── Main layout ── */
  .main-layout {
    max-width: 980px; margin: 0 auto; padding: 28px 32px 60px;
    display: grid; grid-template-columns: 1fr 280px; gap: 24px;
  }

  /* ── Search card ── */
  .search-card {
    background: var(--white); border: 1px solid var(--border);
    border-radius: 6px; box-shadow: var(--shadow-sm); overflow: hidden;
  }

  .search-section { padding: 28px 32px; border-bottom: 1px solid var(--gray-100); }

  .section-header { display: flex; align-items: center; gap: 10px; margin-bottom: 22px; }
  .section-num {
    width: 24px; height: 24px; background: var(--navy); color: white;
    border-radius: 50%; font-size: 11.5px; font-weight: 600;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .section-header h3 { font-family: 'EB Garamond', serif; font-size: 17px; font-weight: 500; color: var(--navy); letter-spacing: 0.01em; }
  .section-divider { flex: 1; height: 1px; background: var(--gray-100); }

  /* Search input row */
  .search-row { display: flex; gap: 12px; align-items: flex-end; }
  .search-field { flex: 1; }
  .field-label { font-size: 12px; font-weight: 600; color: var(--navy); letter-spacing: 0.04em; text-transform: uppercase; display: block; margin-bottom: 5px; }
  .field-input {
    border: 1.5px solid var(--border); border-radius: 4px;
    padding: 10px 14px; font-family: 'DM Sans', sans-serif;
    font-size: 13.5px; color: var(--text); background: var(--white);
    transition: border-color 0.15s, box-shadow 0.15s;
    width: 100%; outline: none;
  }
  .field-input::placeholder { color: var(--gray-300); }
  .field-input:focus { border-color: var(--navy); box-shadow: 0 0 0 3px rgba(10,34,64,0.07); }

  .btn-search {
    background: var(--navy); color: white; border: none;
    padding: 10px 24px; border-radius: 4px;
    font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 600;
    letter-spacing: 0.02em; cursor: pointer;
    transition: background 0.15s, box-shadow 0.15s;
    display: flex; align-items: center; gap: 8px;
    white-space: nowrap; box-shadow: var(--shadow-sm);
    height: 42px;
  }
  .btn-search:hover { background: var(--navy-mid); box-shadow: var(--shadow-md); }
  .btn-search:disabled { opacity: 0.6; cursor: not-allowed; }

  /* Tab switcher */
  .tab-row {
    display: flex; gap: 0; margin-bottom: 22px;
    border: 1.5px solid var(--border); border-radius: 5px; overflow: hidden;
    width: fit-content;
  }
  .tab-btn {
    padding: 8px 20px; border: none; background: var(--gray-50);
    font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 500;
    color: var(--gray-500); cursor: pointer; transition: all 0.15s;
    display: flex; align-items: center; gap: 6px;
  }
  .tab-btn + .tab-btn { border-left: 1.5px solid var(--border); }
  .tab-btn.active { background: var(--navy); color: #fff; }
  .tab-btn.active + .tab-btn { border-color: transparent; }

  /* Error / empty */
  .alert-box {
    border-radius: 5px; padding: 12px 16px;
    font-size: 13px; display: flex; align-items: center; gap: 10px; margin-top: 16px;
  }
  .alert-box.error   { background: #fce4ec; border: 1px solid #ef9a9a; color: #b71c1c; }
  .alert-box.empty   { background: var(--gray-50); border: 1px solid var(--border); color: var(--gray-500); }
  .alert-box.info    { background: #e8f0fe; border: 1px solid #c5d6f8; color: #1a3c8f; }

  /* ── Result card ── */
  .result-section { padding: 28px 32px; animation: fadeSlide 0.3s ease; }
  @keyframes fadeSlide { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }

  .result-header {
    display: flex; align-items: flex-start; justify-content: space-between;
    margin-bottom: 24px; flex-wrap: wrap; gap: 12px;
  }
  .result-ref { font-family: 'EB Garamond', serif; font-size: 22px; font-weight: 500; color: var(--navy); }
  .result-meta { font-size: 12px; color: var(--gray-500); margin-top: 3px; }

  /* Status badge */
  .status-badge {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 6px 16px; border-radius: 100px; font-size: 12.5px; font-weight: 600;
  }
  .status-badge .dot { width: 7px; height: 7px; border-radius: 50%; }
  .status-badge.registered   { background: #e8f0fe; color: #1a3c8f; }
  .status-badge.registered .dot  { background: #1a3c8f; }
  .status-badge.in-progress  { background: #fff8e1; color: #e65100; }
  .status-badge.in-progress .dot { background: #f9a825; animation: pulse 1.5s infinite; }
  .status-badge.resolved     { background: #e8f5e9; color: #1a6b3c; }
  .status-badge.resolved .dot    { background: #1a6b3c; }
  .status-badge.closed       { background: var(--gray-100); color: var(--gray-700); }
  .status-badge.closed .dot      { background: var(--gray-500); }
  .status-badge.rejected     { background: #fce4ec; color: #b71c1c; }
  .status-badge.rejected .dot    { background: #b71c1c; }

  /* Detail grid */
  .detail-grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: 0;
    border: 1px solid var(--border); border-radius: 5px; overflow: hidden;
    margin-bottom: 24px;
  }
  .detail-cell {
    padding: 12px 16px; border-bottom: 1px solid var(--gray-100);
    border-right: 1px solid var(--gray-100);
  }
  .detail-cell:nth-child(even) { border-right: none; }
  .detail-cell:nth-last-child(-n+2) { border-bottom: none; }
  .detail-cell-label { font-size: 10.5px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--gray-500); margin-bottom: 4px; }
  .detail-cell-value { font-size: 13.5px; color: var(--text); font-weight: 500; }

  /* Priority chips */
  .priority-chip {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 2px 10px; border-radius: 100px; font-size: 11.5px; font-weight: 600;
  }
  .priority-chip.low    { background: #e8f5e9; color: #1b5e20; }
  .priority-chip.medium { background: #fff8e1; color: #e65100; }
  .priority-chip.high   { background: #fce4ec; color: #b71c1c; }

  /* ── Timeline ── */
  .timeline-wrap { margin-bottom: 8px; }
  .timeline-title { font-family: 'EB Garamond', serif; font-size: 16px; font-weight: 500; color: var(--navy); margin-bottom: 16px; }
  .timeline { position: relative; padding-left: 28px; }
  .timeline::before {
    content: ''; position: absolute; left: 9px; top: 6px; bottom: 6px;
    width: 2px; background: var(--gray-100);
  }
  .tl-item { position: relative; padding-bottom: 22px; }
  .tl-item:last-child { padding-bottom: 0; }
  .tl-dot {
    position: absolute; left: -22px; top: 4px;
    width: 14px; height: 14px; border-radius: 50%;
    border: 2px solid var(--white);
    box-shadow: 0 0 0 2px var(--border);
    background: var(--gray-300);
    z-index: 1;
  }
  .tl-dot.done    { background: var(--success); box-shadow: 0 0 0 2px rgba(26,107,60,0.2); }
  .tl-dot.active  { background: var(--gold); box-shadow: 0 0 0 3px rgba(184,146,42,0.25); animation: pulse 1.5s infinite; }
  .tl-dot.pending { background: var(--gray-100); }
  .tl-date { font-size: 11px; color: var(--gray-500); margin-bottom: 3px; }
  .tl-label { font-size: 13px; font-weight: 600; color: var(--navy); margin-bottom: 2px; }
  .tl-note { font-size: 12px; color: var(--gray-500); line-height: 1.45; }

  /* ── My Complaints (logged-in tab) ── */
  .complaints-list { display: flex; flex-direction: column; gap: 12px; }
  .complaint-row {
    border: 1.5px solid var(--border); border-radius: 5px;
    padding: 14px 18px; display: flex; align-items: center; gap: 16px;
    cursor: pointer; transition: all 0.15s; background: var(--white);
  }
  .complaint-row:hover { border-color: var(--navy); box-shadow: var(--shadow-sm); }
  .complaint-row.selected { border-color: var(--navy); background: rgba(10,34,64,0.02); }
  .complaint-cat-icon { font-size: 22px; flex-shrink: 0; }
  .complaint-info { flex: 1; min-width: 0; }
  .complaint-ref { font-size: 12px; color: var(--gray-500); margin-bottom: 2px; }
  .complaint-desc { font-size: 13.5px; font-weight: 500; color: var(--navy); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .complaint-date { font-size: 11.5px; color: var(--gray-500); margin-top: 2px; }
  .complaint-right { text-align: right; flex-shrink: 0; }

  /* Login nudge */
  .login-nudge {
    background: linear-gradient(135deg, #e8f0fe 0%, #f0f4ff 100%);
    border: 1.5px solid #c5d6f8; border-radius: 5px;
    padding: 20px 22px; display: flex; align-items: center; gap: 14px;
  }
  .login-nudge-icon { font-size: 28px; flex-shrink: 0; }
  .login-nudge-text strong { display: block; font-size: 14px; color: #1a3c8f; margin-bottom: 4px; }
  .login-nudge-text span { font-size: 12.5px; color: #4a6bb5; }
  .btn-login-inline {
    background: var(--navy); color: white; border: none;
    padding: 9px 18px; border-radius: 4px;
    font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 600;
    cursor: pointer; white-space: nowrap; transition: background 0.15s; margin-top: 12px;
  }
  .btn-login-inline:hover { background: var(--navy-mid); }

  /* ── Sidebar ── */
  .sidebar { display: flex; flex-direction: column; gap: 16px; }
  .sidebar-card { background: var(--white); border: 1px solid var(--border); border-radius: 6px; overflow: hidden; box-shadow: var(--shadow-sm); }
  .sidebar-card-head {
    background: var(--navy); padding: 12px 16px;
    font-family: 'EB Garamond', serif; font-size: 14px; font-weight: 500;
    color: var(--gold-light); letter-spacing: 0.02em;
    display: flex; align-items: center; gap: 8px;
  }
  .sidebar-card-body { padding: 16px; }
  .info-item { display: flex; gap: 10px; padding: 8px 0; border-bottom: 1px solid var(--gray-100); font-size: 12.5px; }
  .info-item:last-child { border-bottom: none; padding-bottom: 0; }
  .info-item .icon { font-size: 15px; flex-shrink: 0; margin-top: 1px; }
  .info-item-text strong { display: block; color: var(--navy); font-weight: 600; margin-bottom: 2px; }
  .info-item-text span { color: var(--gray-500); line-height: 1.4; }
  .helpline-box { background: linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%); border-radius: 5px; padding: 16px; text-align: center; color: white; }
  .helpline-box .label { font-size: 10.5px; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.65; }
  .helpline-box .number { font-family: 'EB Garamond', serif; font-size: 28px; font-weight: 600; color: var(--gold-light); margin: 4px 0; }
  .helpline-box .hours { font-size: 11px; opacity: 0.55; }

  /* Status flow diagram in sidebar */
  .status-flow { display: flex; flex-direction: column; gap: 0; }
  .sf-item { display: flex; gap: 10px; align-items: flex-start; padding: 7px 0; position: relative; }
  .sf-item:not(:last-child)::after {
    content: ''; position: absolute; left: 7px; top: 22px;
    width: 2px; height: calc(100% - 8px); background: var(--gray-100);
  }
  .sf-dot { width: 16px; height: 16px; border-radius: 50%; flex-shrink: 0; margin-top: 1px; display: flex; align-items: center; justify-content: center; font-size: 8px; font-weight: 700; color: white; z-index: 1; }
  .sf-dot.s1 { background: #1a3c8f; }
  .sf-dot.s2 { background: #f9a825; }
  .sf-dot.s3 { background: #6a1b9a; }
  .sf-dot.s4 { background: var(--success); }
  .sf-dot.s5 { background: var(--gray-500); }
  .sf-text strong { display: block; font-size: 12px; font-weight: 600; color: var(--navy); }
  .sf-text span { font-size: 11px; color: var(--gray-500); }

  /* Responsive */
  @media (max-width: 720px) {
    .main-layout { grid-template-columns: 1fr; padding: 16px; }
    .page-title-inner { flex-direction: column; align-items: flex-start; gap: 8px; }
    .search-row { flex-direction: column; }
    .btn-search { width: 100%; justify-content: center; }
    .detail-grid { grid-template-columns: 1fr; }
    .detail-cell { border-right: none; }
    .detail-cell:nth-last-child(-n+2) { border-bottom: 1px solid var(--gray-100); }
    .detail-cell:last-child { border-bottom: none; }
  }
`;

// ── Mock complaint data ────────────────────────────────────────────────────────
const MOCK_COMPLAINTS = {
  "CMP-2025-104821": {
    ref: "CMP-2025-104821",
    category: "Road & Footpath",
    categoryIcon: "🛣️",
    description: "Large pothole near bus stop causing accidents and traffic disruption during peak hours.",
    status: "in-progress",
    priority: "High",
    state: "Andhra Pradesh",
    city: "Vijayawada",
    pincode: "520001",
    address: "MG Road, Near RTC Bus Stop, Gandhinagar",
    submittedBy: "Guest",
    submittedOn: "12 Mar 2025",
    department: "Roads & Infrastructure Dept.",
    timeline: [
      { label: "Complaint Registered",      note: "Reference ID generated, complaint logged.",           date: "12 Mar 2025, 10:42 AM", done: true },
      { label: "Forwarded to Department",   note: "Assigned to Roads & Infrastructure Dept.",           date: "12 Mar 2025, 6:00 PM",  done: true },
      { label: "Field Inspection Scheduled",note: "Inspector visit scheduled for 15 Mar 2025.",         date: "13 Mar 2025, 11:00 AM", done: true },
      { label: "Repair Work In Progress",   note: "Crew deployed. Work expected to finish in 2 days.",  date: "16 Mar 2025, 9:00 AM",  active: true },
      { label: "Resolved & Closed",         note: "Pending completion and citizen confirmation.",        date: "—",                    pending: true },
    ],
  },
  "CMP-2025-293847": {
    ref: "CMP-2025-293847",
    category: "Water Supply",
    categoryIcon: "💧",
    description: "No water supply for 3 consecutive days in the area. Tanker not dispatched despite multiple requests.",
    status: "registered",
    priority: "High",
    state: "Andhra Pradesh",
    city: "Guntur",
    pincode: "522001",
    address: "Plot 14, Brundavan Colony, Arundelpet",
    submittedBy: "Ramesh K.",
    submittedOn: "18 Mar 2025",
    department: "Water Supply & Sewerage Board",
    timeline: [
      { label: "Complaint Registered",   note: "Reference ID generated, complaint logged.",    date: "18 Mar 2025, 8:15 AM",  done: true },
      { label: "Forwarded to Department",note: "Assigned to Water Supply & Sewerage Board.",   date: "Pending",              pending: true },
      { label: "Field Inspection",       note: "Awaiting assignment.",                          date: "—",                    pending: true },
      { label: "Work In Progress",       note: "—",                                             date: "—",                    pending: true },
      { label: "Resolved & Closed",      note: "—",                                             date: "—",                    pending: true },
    ],
  },
  "CMP-2025-771234": {
    ref: "CMP-2025-771234",
    category: "Street Light",
    categoryIcon: "💡",
    description: "3 street lights non-functional for over 2 weeks on the main road causing safety concerns at night.",
    status: "resolved",
    priority: "Medium",
    state: "Telangana",
    city: "Hyderabad",
    pincode: "500001",
    address: "Street No. 7, Himayatnagar, Near Post Office",
    submittedBy: "Priya S.",
    submittedOn: "01 Mar 2025",
    department: "Electricity & Street Lighting Dept.",
    timeline: [
      { label: "Complaint Registered",    note: "Reference ID generated.",                      date: "01 Mar 2025, 7:30 PM",  done: true },
      { label: "Forwarded to Department", note: "Assigned to Electricity & Street Lighting.",   date: "02 Mar 2025, 9:00 AM",  done: true },
      { label: "Field Inspection Done",   note: "3 bulbs identified as faulty.",                date: "03 Mar 2025, 2:00 PM",  done: true },
      { label: "Repair Completed",        note: "All 3 lights replaced and functional.",         date: "05 Mar 2025, 5:00 PM",  done: true },
      { label: "Closed",                  note: "Citizen confirmed resolution. Case closed.",    date: "06 Mar 2025, 10:00 AM", done: true },
    ],
  },
};

// Complaints tied to logged-in user (simulated)
const USER_COMPLAINTS = ["CMP-2025-104821", "CMP-2025-293847"];

const STATUS_LABELS = {
  "registered":  "Registered",
  "in-progress": "In Progress",
  "resolved":    "Resolved",
  "closed":      "Closed",
  "rejected":    "Rejected",
};

const PRIORITY_CLASS = { Low: "low", Medium: "medium", High: "high" };

export default function TrackIssue() {
  const [tab, setTab] = useState("reference");   // "reference" | "mine"
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [username, setUsername] = useState(getUser?.() || "");

  useEffect(() => {
    const sync = () => { setLoggedIn(isLoggedIn()); setUsername(getUser?.() || ""); };
    window.addEventListener("authChange", sync);
    return () => window.removeEventListener("authChange", sync);
  }, []);

  const handleSearch = () => {
    const key = query.trim().toUpperCase();
    if (!key) return;
    setLoading(true);
    setSearched(false);
    setTimeout(() => {
      setResult(MOCK_COMPLAINTS[key] || null);
      setSearched(true);
      setLoading(false);
    }, 700);
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleSearch(); };

  const handleLoginSuccess = (user) => {
    setLoggedIn(true);
    setUsername(user);
    setShowLoginModal(false);
  };

  const myComplaints = USER_COMPLAINTS.map(r => MOCK_COMPLAINTS[r]).filter(Boolean);

  return (
    <>
      <style>{styles}</style>
      <div className="portal-wrap">

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="sep">›</span>
          <span className="current">Track Complaint</span>
        </div>

        {/* Page title */}
        <div className="page-title-band">
          <div className="page-title-inner">
            <div>
              <h2>Track Your Complaint</h2>
              <p>Check the real-time status and progress of your registered complaint.</p>
            </div>
            <div className="title-badge">
              <span></span> Live Status Updates
            </div>
          </div>
        </div>

        <div className="main-layout">
          <div>
            <div className="search-card">

              {/* ── Search / My Complaints tabs ── */}
              <div className="search-section">
                <div className="section-header">
                  <div className="section-num">1</div>
                  <h3>Find Your Complaint</h3>
                  <div className="section-divider"/>
                </div>

                <div className="tab-row" style={{marginBottom:20}}>
                  <button className={`tab-btn${tab==="reference"?" active":""}`} onClick={() => { setTab("reference"); setSearched(false); setResult(null); }}>
                    🔍 By Reference ID
                  </button>
                  <button className={`tab-btn${tab==="mine"?" active":""}`} onClick={() => setTab("mine")}>
                    👤 My Complaints
                  </button>
                </div>

                {tab === "reference" && (
                  <>
                    <label className="field-label">Reference Number</label>
                    <div className="search-row">
                      <div className="search-field">
                        <input
                          className="field-input"
                          type="text"
                          placeholder="e.g. CMP-2025-104821"
                          value={query}
                          onChange={e => setQuery(e.target.value)}
                          onKeyDown={handleKeyDown}
                        />
                      </div>
                      <button className="btn-search" onClick={handleSearch} disabled={loading || !query.trim()}>
                        {loading ? "Searching…" : <><span>Track</span><span>→</span></>}
                      </button>
                    </div>

                    <div style={{marginTop:10, fontSize:11.5, color:"var(--gray-500)"}}>
                      💡 Try: <span style={{cursor:"pointer", color:"var(--navy)", fontWeight:500}} onClick={() => setQuery("CMP-2025-104821")}>CMP-2025-104821</span>
                      {" · "}
                      <span style={{cursor:"pointer", color:"var(--navy)", fontWeight:500}} onClick={() => setQuery("CMP-2025-293847")}>CMP-2025-293847</span>
                      {" · "}
                      <span style={{cursor:"pointer", color:"var(--navy)", fontWeight:500}} onClick={() => setQuery("CMP-2025-771234")}>CMP-2025-771234</span>
                    </div>

                    {searched && !result && (
                      <div className="alert-box error" style={{marginTop:16}}>
                        ⚠️ No complaint found for <strong>{query.toUpperCase()}</strong>. Please check the reference number and try again.
                      </div>
                    )}
                  </>
                )}

                {tab === "mine" && !loggedIn && (
                  <div className="login-nudge">
                    <div className="login-nudge-icon">🔐</div>
                    <div className="login-nudge-text">
                      <strong>Login to view your complaints</strong>
                      <span>All complaints you've submitted will appear here after login.</span>
                      <br/>
                      <button className="btn-login-inline" onClick={() => setShowLoginModal(true)}>Login / Register</button>
                    </div>
                  </div>
                )}

                {tab === "mine" && loggedIn && (
                  <>
                    <div className="alert-box info" style={{marginBottom:16}}>
                      📋 Showing complaints for <strong>{username}</strong>
                    </div>
                    <div className="complaints-list">
                      {myComplaints.map(c => (
                        <div
                          key={c.ref}
                          className={`complaint-row${result?.ref===c.ref?" selected":""}`}
                          onClick={() => setResult(result?.ref===c.ref ? null : c)}
                        >
                          <div className="complaint-cat-icon">{c.categoryIcon}</div>
                          <div className="complaint-info">
                            <div className="complaint-ref">{c.ref}</div>
                            <div className="complaint-desc">{c.description}</div>
                            <div className="complaint-date">📅 {c.submittedOn} · 📍 {c.city}</div>
                          </div>
                          <div className="complaint-right">
                            <StatusBadge status={c.status}/>
                            <div style={{fontSize:11, color:"var(--gray-500)", marginTop:5}}>
                              {result?.ref===c.ref ? "▲ Collapse" : "▼ Details"}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* ── Result ── */}
              {result && (
                <div className="result-section">
                  <div className="result-header">
                    <div>
                      <div style={{fontSize:12, color:"var(--gray-500)", marginBottom:4}}>
                        {result.categoryIcon} {result.category}
                      </div>
                      <div className="result-ref">{result.ref}</div>
                      <div className="result-meta">Submitted on {result.submittedOn} · {result.department}</div>
                    </div>
                    <StatusBadge status={result.status}/>
                  </div>

                  {/* Detail grid */}
                  <div className="detail-grid">
                    {[
                      ["Category",    result.category],
                      ["Priority",    <span className={`priority-chip ${PRIORITY_CLASS[result.priority]}`}>{result.priority}</span>],
                      ["State",       result.state],
                      ["City",        result.city],
                      ["PIN Code",    result.pincode],
                      ["Submitted By",result.submittedBy],
                    ].map(([label, val], i) => (
                      <div className="detail-cell" key={i}>
                        <div className="detail-cell-label">{label}</div>
                        <div className="detail-cell-value">{val}</div>
                      </div>
                    ))}
                    <div className="detail-cell" style={{gridColumn:"1/-1"}}>
                      <div className="detail-cell-label">Address</div>
                      <div className="detail-cell-value">{result.address}, {result.city}, {result.state} – {result.pincode}</div>
                    </div>
                    <div className="detail-cell" style={{gridColumn:"1/-1", borderBottom:"none"}}>
                      <div className="detail-cell-label">Description</div>
                      <div className="detail-cell-value" style={{fontWeight:400, lineHeight:1.55}}>{result.description}</div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="timeline-wrap">
                    <div className="timeline-title">Complaint Timeline</div>
                    <div className="timeline">
                      {result.timeline.map((t, i) => (
                        <div className="tl-item" key={i}>
                          <div className={`tl-dot${t.done?" done":t.active?" active":" pending"}`}/>
                          <div>
                            <div className="tl-date">{t.date}</div>
                            <div className="tl-label">{t.label}</div>
                            {t.note && <div className="tl-note">{t.note}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="sidebar">

            <div className="sidebar-card">
              <div className="sidebar-card-head">📊 Status Guide</div>
              <div className="sidebar-card-body">
                <div className="status-flow">
                  {[
                    ["s1","Registered",   "Complaint logged & ID assigned"],
                    ["s2","In Progress",  "Forwarded & being acted upon"],
                    ["s3","Inspection",   "Field visit scheduled/done"],
                    ["s4","Resolved",     "Issue fixed, pending closure"],
                    ["s5","Closed",       "Fully resolved & closed"],
                  ].map(([cls, label, sub]) => (
                    <div className="sf-item" key={cls}>
                      <div className={`sf-dot ${cls}`}/>
                      <div className="sf-text">
                        <strong>{label}</strong>
                        <span>{sub}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="sidebar-card">
              <div className="sidebar-card-head">ℹ️ Tracking Tips</div>
              <div className="sidebar-card-body">
                {[
                  ["🔖","Save your Reference ID","Keep your CMP-YYYY-XXXXXX number for instant status checks."],
                  ["📱","SMS Updates","You'll receive status updates on your registered mobile number."],
                  ["⏱️","Expected Resolution","Most issues resolved in 7–15 working days."],
                  ["📞","Escalate","If unresolved after 21 days, call the helpline."],
                ].map(([icon, heading, body]) => (
                  <div className="info-item" key={heading}>
                    <span className="icon">{icon}</span>
                    <div className="info-item-text"><strong>{heading}</strong><span>{body}</span></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-card">
              <div className="sidebar-card-head">📞 Helpline</div>
              <div className="sidebar-card-body">
                <div className="helpline-box">
                  <div className="label">Grievance Helpline</div>
                  <div className="number">1800-111-555</div>
                  <div className="hours">Mon – Sat · 9 AM to 6 PM · Toll Free</div>
                </div>
              </div>
            </div>

            <div className="sidebar-card">
              <div className="sidebar-card-head">🔗 Quick Links</div>
              <div className="sidebar-card-body">
                {[
                  ["/registercomplaint","📝 Register New Complaint"],
                  ["/","🏠 Back to Home"],
                ].map(([to, label]) => (
                  <div key={to} style={{padding:"8px 0", borderBottom:"1px solid var(--gray-100)"}}>
                    <Link to={to} style={{fontSize:13, color:"var(--navy)", textDecoration:"none", fontWeight:500}}>
                      {label}
                    </Link>
                  </div>
                ))}
                <div style={{padding:"8px 0 0"}}>
                  <a href="#" style={{fontSize:13, color:"var(--navy)", textDecoration:"none", fontWeight:500}}>
                    📧 Email Grievance Cell
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
}

function StatusBadge({ status }) {
  return (
    <span className={`status-badge ${status}`}>
      <span className="dot"/>
      {STATUS_LABELS[status] || status}
    </span>
  );
}