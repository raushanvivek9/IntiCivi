import React, { useState } from "react";
import { Link } from "react-router-dom";

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

  .breadcrumb {
    max-width: 980px; margin: auto; padding: 14px 32px;
    display: flex; align-items: center; gap: 6px;
    font-size: 12px; color: var(--gray-500);
  }
  .breadcrumb span { cursor: pointer; }
  .breadcrumb span:hover { color: var(--navy); text-decoration: underline; }
  .breadcrumb .sep { color: var(--gray-300); }
  .breadcrumb .current { color: var(--navy); font-weight: 500; }

  .page-title-band {
    background: var(--white);
    border-bottom: 1px solid var(--border);
    border-top: 1px solid var(--border);
  }
  .page-title-inner {
    max-width: 980px; margin: auto; padding: 26px 32px;
    display: flex; justify-content: space-between; align-items: flex-end;
  }
  .page-title-inner h2 {
    font-family: 'EB Garamond', serif;
    font-size: 28px; font-weight: 500;
    color: var(--navy); letter-spacing: -0.01em;
  }
  .page-title-inner p { font-size: 13.5px; color: var(--gray-500); margin-top: 4px; }
  .ref-number { text-align: right; font-size: 11px; color: var(--gray-500); line-height: 1.6; }
  .ref-number strong { color: var(--navy); font-weight: 600; font-size: 12px; }

  .main-layout {
    max-width: 980px; margin: 0 auto; padding: 28px 32px 60px;
    display: grid; grid-template-columns: 1fr 280px; gap: 24px;
  }

  .form-card {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 6px;
    box-shadow: var(--shadow-sm);
    overflow: hidden;
  }

  .form-section {
    padding: 28px 32px;
    border-bottom: 1px solid var(--gray-100);
  }

  .section-header {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 22px;
  }
  .section-num {
    width: 24px; height: 24px;
    background: var(--navy); color: white;
    border-radius: 50%; font-size: 11.5px; font-weight: 600;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }
  .section-header h3 {
    font-family: 'EB Garamond', serif;
    font-size: 17px; font-weight: 500;
    color: var(--navy); letter-spacing: 0.01em;
  }
  .section-divider { flex: 1; height: 1px; background: var(--gray-100); }

  .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  .field-row.one { grid-template-columns: 1fr; }
  .field-row.three { grid-template-columns: 1fr 1fr 1fr; }

  .field-group { display: flex; flex-direction: column; gap: 5px; }

  .field-label {
    font-size: 12px; font-weight: 600;
    color: var(--navy); letter-spacing: 0.04em;
    text-transform: uppercase;
    display: flex; align-items: center; gap: 4px;
  }
  .required-dot { width: 5px; height: 5px; background: #c0392b; border-radius: 50%; display: inline-block; }
  .optional-tag { font-size: 10px; font-weight: 400; color: var(--gray-500); text-transform: none; letter-spacing: 0; }

  .field-input, .field-select, .field-textarea {
    border: 1px solid var(--border);
    border-radius: 4px;
    padding: 9px 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13.5px; color: var(--text);
    background: var(--white);
    transition: border-color 0.15s, box-shadow 0.15s;
    width: 100%; outline: none; -webkit-appearance: none;
  }
  .field-input::placeholder { color: var(--gray-300); }
  .field-input:focus, .field-select:focus, .field-textarea:focus {
    border-color: var(--navy);
    box-shadow: 0 0 0 3px rgba(10,34,64,0.07);
  }
  .field-select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238a8780' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 12px center;
    padding-right: 32px; cursor: pointer;
  }
  .field-textarea { resize: vertical; min-height: 100px; line-height: 1.55; }

  .category-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 2px; }
  .cat-pill {
    padding: 7px 14px; border: 1.5px solid var(--border); border-radius: 100px;
    font-size: 12.5px; font-weight: 500; color: var(--gray-700);
    cursor: pointer; transition: all 0.15s;
    display: flex; align-items: center; gap: 6px;
    background: var(--white); user-select: none;
  }
  .cat-pill:hover { border-color: var(--navy-mid); color: var(--navy); background: var(--gray-50); }
  .cat-pill.selected { background: var(--navy); border-color: var(--navy); color: white; box-shadow: var(--shadow-sm); }
  .cat-pill .cat-icon { font-size: 14px; }

  .upload-zone {
    border: 1.5px dashed var(--border); border-radius: 5px; padding: 22px;
    text-align: center; cursor: pointer; background: var(--gray-50);
    transition: all 0.2s; position: relative;
  }
  .upload-zone:hover { border-color: var(--navy); background: rgba(10,34,64,0.02); }
  .upload-zone input { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; }
  .upload-icon { font-size: 26px; margin-bottom: 8px; }
  .upload-zone p { font-size: 13px; color: var(--gray-500); line-height: 1.5; }
  .upload-zone p strong { color: var(--navy); font-weight: 600; }
  .upload-hint { font-size: 11px; color: var(--gray-300); margin-top: 4px; }
  .file-selected { font-size: 12px; color: var(--success); font-weight: 500; margin-top: 6px; }

  .priority-row { display: flex; gap: 10px; }
  .priority-btn {
    flex: 1; padding: 9px 10px; border: 1.5px solid var(--border); border-radius: 4px;
    text-align: center; cursor: pointer; font-size: 12px; font-weight: 500;
    color: var(--gray-700); transition: all 0.15s; background: var(--white);
  }
  .priority-btn:hover { border-color: var(--gray-500); }
  .priority-btn.p-low.sel   { background: #e8f5e9; border-color: #2e7d32; color: #1b5e20; }
  .priority-btn.p-medium.sel{ background: #fff8e1; border-color: #f9a825; color: #e65100; }
  .priority-btn.p-high.sel  { background: #fce4ec; border-color: #c62828; color: #b71c1c; }
  .priority-label { font-size: 10px; font-weight: 400; display: block; margin-top: 2px; color: inherit; opacity: 0.75; }

  /* Location */
  .use-location-btn {
    display: flex; align-items: center; gap: 6px;
    background: var(--gray-50); border: 1.5px solid var(--border); border-radius: 4px;
    padding: 7px 13px; font-family: 'DM Sans', sans-serif;
    font-size: 12px; font-weight: 600; color: var(--navy);
    cursor: pointer; transition: all 0.15s; white-space: nowrap;
  }
  .use-location-btn:hover { background: var(--navy); color: white; border-color: var(--navy); }
  .use-location-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .location-status {
    font-size: 11.5px; margin-bottom: 14px; padding: 8px 12px;
    border-radius: 4px; display: flex; align-items: center; gap: 7px;
  }
  .location-status.fetching { background: #e8f0fe; color: #1a56c4; }
  .location-status.success  { background: #e8f5e9; color: #1a6b3c; }
  .location-status.error    { background: #fce4ec; color: #b71c1c; }

  /* Login banner */
  .login-banner {
    background: linear-gradient(135deg, #e8f0fe 0%, #f0f4ff 100%);
    border: 1.5px solid #c5d6f8; border-radius: 5px;
    padding: 14px 18px; display: flex; align-items: center; gap: 14px;
    margin-bottom: 20px;
  }
  .login-banner-icon { font-size: 22px; flex-shrink: 0; }
  .login-banner-text { flex: 1; }
  .login-banner-text strong { display: block; font-size: 13px; color: #1a3c8f; margin-bottom: 2px; }
  .login-banner-text span { font-size: 12px; color: #4a6bb5; }
  .btn-login-inline {
    background: var(--navy); color: white; border: none;
    padding: 8px 16px; border-radius: 4px;
    font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 600;
    cursor: pointer; white-space: nowrap; transition: background 0.15s;
  }
  .btn-login-inline:hover { background: var(--navy-mid); }

  /* Logged-in user chip */
  .user-chip {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--navy); color: white;
    border-radius: 100px; padding: 5px 14px 5px 6px;
    font-size: 12.5px;
  }
  .user-avatar {
    width: 26px; height: 26px; border-radius: 50%;
    background: var(--gold); color: var(--navy);
    font-size: 11px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
  }

  /* Guest section bg */
  .guest-section {
    padding: 28px 32px;
    border-bottom: 1px solid var(--gray-100);
    background: var(--gray-50);
  }

  .submit-section {
    padding: 22px 32px; background: var(--gray-50);
    border-top: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
  }
  .submit-note { font-size: 11.5px; color: var(--gray-500); line-height: 1.5; max-width: 340px; }
  .submit-note a { color: var(--navy); text-decoration: underline; }
  .btn-submit {
    background: var(--navy); color: white; border: none;
    padding: 11px 28px; border-radius: 4px;
    font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 600;
    letter-spacing: 0.03em; cursor: pointer;
    transition: background 0.15s, box-shadow 0.15s;
    display: flex; align-items: center; gap: 8px;
    white-space: nowrap; box-shadow: var(--shadow-sm);
  }
  .btn-submit:hover { background: var(--navy-mid); box-shadow: var(--shadow-md); }
  .btn-submit:active { transform: translateY(1px); }

  /* Sidebar */
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
  .step-list { list-style: none; }
  .step-list li { display: flex; gap: 10px; align-items: flex-start; font-size: 12.5px; color: var(--gray-700); padding: 7px 0; border-bottom: 1px solid var(--gray-100); }
  .step-list li:last-child { border-bottom: none; }
  .step-num { width: 18px; height: 18px; background: var(--gold); color: white; border-radius: 50%; font-size: 10px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
  .helpline-box { background: linear-gradient(135deg, var(--navy) 0%, var(--navy-mid) 100%); border-radius: 5px; padding: 16px; text-align: center; color: white; }
  .helpline-box .label { font-size: 10.5px; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.65; }
  .helpline-box .number { font-family: 'EB Garamond', serif; font-size: 28px; font-weight: 600; color: var(--gold-light); margin: 4px 0; }
  .helpline-box .hours { font-size: 11px; opacity: 0.55; }

  /* Success */
  .success-overlay { position: fixed; inset: 0; background: rgba(10,34,64,0.65); display: flex; align-items: center; justify-content: center; z-index: 200; animation: fadeIn 0.25s ease; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  .success-modal { background: white; border-radius: 8px; padding: 48px 48px 40px; max-width: 440px; width: 90%; text-align: center; box-shadow: var(--shadow-lg); animation: slideUp 0.3s ease; }
  @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  .success-stamp { width: 64px; height: 64px; background: var(--success); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; font-size: 28px; }
  .success-modal h3 { font-family: 'EB Garamond', serif; font-size: 24px; color: var(--navy); margin-bottom: 8px; }
  .success-modal p { font-size: 13.5px; color: var(--gray-500); line-height: 1.6; }
  .success-ref { background: var(--gray-50); border: 1px solid var(--border); border-radius: 4px; padding: 12px 20px; margin: 20px 0; font-size: 13px; color: var(--gray-700); }
  .success-ref strong { color: var(--navy); font-size: 16px; display: block; margin-top: 3px; font-family: 'EB Garamond', serif; }
  .btn-done { background: var(--navy); color: white; border: none; padding: 11px 32px; border-radius: 4px; font-family: 'DM Sans', sans-serif; font-size: 13.5px; font-weight: 600; cursor: pointer; transition: background 0.15s; }
  .btn-done:hover { background: var(--navy-mid); }

  @media (max-width: 720px) {
    .main-layout { grid-template-columns: 1fr; padding: 16px; }
    .field-row, .field-row.three { grid-template-columns: 1fr; }
    .page-title-inner { flex-direction: column; align-items: flex-start; gap: 8px; }
    .section-header { flex-wrap: wrap; }
  }
`;


const CATEGORIES = [
  { label: "Road & Footpath", icon: "🛣️", value: "Road" },
  { label: "Water Supply",    icon: "💧", value: "Water" },
  { label: "Electricity",     icon: "⚡", value: "Electricity" },
  { label: "Garbage",         icon: "🗑️", value: "Garbage" },
  { label: "Drainage",        icon: "🚰", value: "Drainage" },
  { label: "Street Light",    icon: "💡", value: "StreetLight" },
  { label: "Parks",           icon: "🌳", value: "Parks" },
  { label: "Other",           icon: "📋", value: "Other" },
];

const REF = `CMP-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

// ── Toggle this to simulate logged-in vs guest ──────────────────────────────
const MOCK_USER = { name: "Login to submit", phone: "", email: "" };
// Set to `null` to see the guest / not-logged-in flow
// ────────────────────────────────────────────────────────────────────────────

export default function RegisterComplaint() {
  const [loggedInUser] = useState(MOCK_USER); // swap for null to test guest flow

  const [form, setForm] = useState({
    category: "", description: "", priority: "", contact_time: "",
    state: "", city: "", pincode: "", address: "",
    image: null,
    name: "", phone: "", email: "", // guest fields
  });

  const [locationStatus, setLocationStatus] = useState(null); // null | fetching | success | error
  const [submitted, setSubmitted] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") set("image", files[0]); else set(name, value);
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) { setLocationStatus("error"); return; }
    setLocationStatus("fetching");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const a = data.address || {};
          setForm(f => ({
            ...f,
            state:   a.state   || f.state,
            city:    a.city || a.town || a.county || f.city,
            pincode: a.postcode || f.pincode,
            address: [a.road, a.suburb, a.neighbourhood].filter(Boolean).join(", ") || f.address,
          }));
          setLocationStatus("success");
        } catch { setLocationStatus("error"); }
      },
      () => setLocationStatus("error"),
      { timeout: 10000 }
    );
  };

  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <>
      <style>{styles}</style>
      <div className="portal-wrap">

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link><span className="sep">›</span>
          <span className="current">Register Complaint</span>
        </div>

        {/* Page title */}
        <div className="page-title-band">
          <div className="page-title-inner">
            <div>
              <h2>Register Civic Complaint</h2>
              <p>Report a public infrastructure or utility issue to your local authority.</p>
            </div>
            <div className="ref-number">
              <div>Reference No.</div>
              <strong>{REF}</strong>
              <div>Date: {new Date().toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" })}</div>
            </div>
          </div>
        </div>

        <div className="main-layout">
          <form onSubmit={handleSubmit}>
            <div className="form-card">

              {/* ── 1. ISSUE DETAILS ── */}
              <div className="form-section">
                <div className="section-header">
                  <div className="section-num">1</div>
                  <h3>Issue Details</h3>
                  <div className="section-divider"/>
                </div>

                <div className="field-row one" style={{marginBottom:18}}>
                  <div className="field-group">
                    <label className="field-label">Category <span className="required-dot"/></label>
                    <div className="category-pills">
                      {CATEGORIES.map(c => (
                        <div key={c.value} className={`cat-pill${form.category===c.value?" selected":""}`} onClick={() => set("category", c.value)}>
                          <span className="cat-icon">{c.icon}</span>{c.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="field-row one">
                  <div className="field-group">
                    <label className="field-label">Description <span className="required-dot"/></label>
                    <textarea className="field-textarea" name="description" value={form.description} onChange={handleChange}
                      placeholder="Describe the issue clearly — include duration, severity, and any previous complaints made." required/>
                  </div>
                </div>

                <div className="field-row" style={{marginTop:16}}>
                  <div className="field-group">
                    <label className="field-label">Priority Level</label>
                    <div className="priority-row">
                      {[["Low","p-low","Within 10 days"],["Medium","p-medium","Within 5 days"],["High","p-high","Urgent — 48 hrs"]].map(([p,cls,sub]) => (
                        <div key={p} className={`priority-btn ${cls}${form.priority===p?" sel":""}`} onClick={() => set("priority", p)}>
                          {p}<span className="priority-label">{sub}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="field-group">
                    <label className="field-label">Preferred Contact Time <span className="optional-tag">(optional)</span></label>
                    <select className="field-select" name="contact_time" value={form.contact_time} onChange={handleChange}>
                      <option value="">Any time</option>
                      <option>Morning (9 AM – 12 PM)</option>
                      <option>Afternoon (12 PM – 4 PM)</option>
                      <option>Evening (4 PM – 7 PM)</option>
                    </select>
                  </div>
                </div>

                <div className="field-row one" style={{marginTop:4}}>
                  <div className="field-group">
                    <label className="field-label">Upload Evidence <span className="optional-tag">(optional)</span></label>
                    <div className="upload-zone">
                      <input type="file" name="image" accept="image/*,.pdf" onChange={handleChange}/>
                      <div className="upload-icon">📎</div>
                      <p><strong>Click to attach</strong> or drag and drop</p>
                      <p className="upload-hint">JPG, PNG or PDF · Max 5 MB</p>
                      {form.image && <p className="file-selected">✓ {form.image.name}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── 2. LOCATION DETAILS ── */}
              <div className="form-section">
                <div className="section-header">
                  <div className="section-num">2</div>
                  <h3>Location Details</h3>
                  <div className="section-divider"/>
                  <button type="button" className="use-location-btn" onClick={handleGetLocation} disabled={locationStatus==="fetching"}>
                    <span style={{fontSize:14}}>📍</span>
                    {locationStatus==="fetching" ? "Detecting…" : "Use Current Location"}
                  </button>
                </div>

                {locationStatus === "fetching" && <div className="location-status fetching">🔄 Detecting your location, please wait…</div>}
                {locationStatus === "success"  && <div className="location-status success">✅ Location auto-filled. Please verify and correct if needed.</div>}
                {locationStatus === "error"    && <div className="location-status error">⚠️ Could not detect location. Please allow location access or fill manually.</div>}

                <div className="field-row three">
                  <div className="field-group">
                    <label className="field-label">State <span className="required-dot"/></label>
                    <select className="field-select" name="state" value={form.state} onChange={handleChange} required>
                      <option value="">Select State</option>
                      {["Andhra Pradesh","Telangana","Karnataka","Tamil Nadu","Maharashtra","Delhi","Uttar Pradesh","Gujarat","Rajasthan","West Bengal"].map(s=>(
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="field-group">
                    <label className="field-label">City / District <span className="required-dot"/></label>
                    <input className="field-input" type="text" name="city" value={form.city} onChange={handleChange} placeholder="e.g. Vijayawada" required/>
                  </div>
                  <div className="field-group">
                    <label className="field-label">PIN Code <span className="required-dot"/></label>
                    <input className="field-input" type="text" name="pincode" value={form.pincode} onChange={handleChange} placeholder="6-digit PIN" maxLength={6} required/>
                  </div>
                </div>

                <div className="field-row one" style={{marginTop:4}}>
                  <div className="field-group">
                    <label className="field-label">Full Address <span className="required-dot"/></label>
                    <input className="field-input" type="text" name="address" value={form.address} onChange={handleChange} placeholder="House / Plot no., Street, Landmark, Ward" required/>
                  </div>
                </div>
              </div>

              {/* ── 3. CITIZEN / GUEST DETAILS ── */}
              {loggedInUser ? (
                // ── Logged in: show user chip ──
                <div className="form-section" style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
                  <div>
                    <div className="field-label" style={{marginBottom:8}}>Submitting as</div>
                    <div className="user-chip">
                      <div className="user-avatar">
                        {loggedInUser.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase()}
                      </div>
                      <span>{loggedInUser.name}</span>
                      <span style={{opacity:0.5}}>·</span>
                      <span style={{opacity:0.75}}>{loggedInUser.phone}</span>
                    </div>
                  </div>
                  <span style={{fontSize:12,color:"var(--gray-500)"}}>
                    Not you? <a href="#" style={{color:"var(--navy)"}}>Switch account</a>
                  </span>
                </div>
              ) : (
                // ── Guest: show login nudge + fields + guest chip at bottom ──
                <div className="guest-section">
                  <div className="section-header">
                    <div className="section-num">3</div>
                    <h3>Your Details</h3>
                    <div className="section-divider"/>
                  </div>

                  <div className="login-banner">
                    <div className="login-banner-icon">🔐</div>
                    <div className="login-banner-text">
                      <strong>Already have an account?</strong>
                      <span>Login to auto-fill your details and track complaints easily.</span>
                    </div>
                    <button type="button" className="btn-login-inline">Login / Register</button>
                  </div>

                  <div className="field-row three">
                    <div className="field-group" style={{gridColumn:"span 2"}}>
                      <label className="field-label">Full Name <span className="required-dot"/></label>
                      <input className="field-input" type="text" name="name" value={form.name} onChange={handleChange} placeholder="As per Aadhaar / ID proof" required/>
                    </div>
                    <div className="field-group">
                      <label className="field-label">Mobile Number <span className="required-dot"/></label>
                      <input className="field-input" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" required/>
                    </div>
                  </div>
                  <div className="field-row one" style={{marginTop:4}}>
                    <div className="field-group">
                      <label className="field-label">Email Address <span className="optional-tag">(optional)</span></label>
                      <input className="field-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="For email updates on your complaint"/>
                    </div>
                  </div>

                  {/* Guest chip — shown once name/phone are filled */}
                  {(form.name || form.phone) && (
                    <div style={{marginTop:18, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10}}>
                      <div>
                        <div className="field-label" style={{marginBottom:8}}>Submitting as</div>
                        <div className="user-chip">
                          <div className="user-avatar" style={{background:"var(--gray-300)", color:"var(--navy)"}}>
                            {form.name ? form.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase() : "?"}
                          </div>
                          <span>{form.name || "Guest"}</span>
                          {form.phone && <><span style={{opacity:0.5}}>·</span><span style={{opacity:0.75}}>{form.phone}</span></>}
                          <span style={{fontSize:10, opacity:0.55, background:"rgba(255,255,255,0.15)", padding:"2px 7px", borderRadius:10}}>Guest</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Static guest chip when nothing filled yet */}
                  {(!form.name && !form.phone) && (
                    <div style={{marginTop:18, display:"flex", alignItems:"center", gap:10}}>
                      <div className="field-label">Submitting as</div>
                      <div className="user-chip" style={{opacity:0.6}}>
                        <div className="user-avatar" style={{background:"var(--gray-300)", color:"var(--navy)"}}>?</div>
                        <span>Guest User</span>
                        <span style={{fontSize:10, opacity:0.55, background:"rgba(255,255,255,0.15)", padding:"2px 7px", borderRadius:10}}>Not logged in</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ── SUBMIT ── */}
              <div className="submit-section">
                <p className="submit-note">
                  By submitting, you confirm this is accurate. False complaints may attract action under <a href="#">Section 182 IPC</a>. Data protected under <a href="#">DPDP Act 2023</a>.
                </p>
                <button type="submit" className="btn-submit">
                  <span>Submit Complaint</span><span>→</span>
                </button>
              </div>
            </div>
          </form>

          {/* Sidebar */}
          <div className="sidebar">
            <div className="sidebar-card">
              <div className="sidebar-card-head">📞 Helpline Numbers</div>
              <div className="sidebar-card-body">
                <div className="helpline-box">
                  <div className="label">National Grievance Helpline</div>
                  <div className="number">1800-111-555</div>
                  <div className="hours">Mon – Sat · 9 AM to 6 PM · Toll Free</div>
                </div>
                <div style={{marginTop:12}}>
                  {[["🚨","Emergency","112"],["🚒","Fire Services","101"],["🚑","Ambulance","108"]].map(([ic,l,n]) => (
                    <div className="info-item" key={l}>
                      <span className="icon">{ic}</span>
                      <div className="info-item-text"><strong>{l}</strong><span>{n}</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="sidebar-card">
              <div className="sidebar-card-head">📋 What Happens Next</div>
              <div className="sidebar-card-body">
                <ul className="step-list">
                  {["Complaint registered & reference ID generated","Forwarded to department within 24 hrs","Field inspection within 3 working days","Status updates via SMS / email","Resolution & closure confirmation"].map((s,i) => (
                    <li key={i}><span className="step-num">{i+1}</span><span>{s}</span></li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="sidebar-card">
              <div className="sidebar-card-head">ℹ️ Important Notes</div>
              <div className="sidebar-card-body">
                {[
                  ["🕐","Response Time","Standard resolution within 7–15 working days."],
                  ["🔒","Privacy","Your personal info is kept confidential."],
                  ["📱","Track Status","Use your Reference ID on the portal or app."],
                ].map(([ic,h,b]) => (
                  <div className="info-item" key={h}>
                    <span className="icon">{ic}</span>
                    <div className="info-item-text"><strong>{h}</strong><span>{b}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {submitted && (
        <div className="success-overlay" onClick={() => setSubmitted(false)}>
          <div className="success-modal" onClick={e => e.stopPropagation()}>
            <div className="success-stamp">✓</div>
            <h3>Complaint Registered Successfully</h3>
            <p>Your complaint has been received and forwarded to the concerned department. Updates will be sent via SMS/email.</p>
            <div className="success-ref">
              Your Reference Number
              <strong>{REF}</strong>
            </div>
            <p style={{fontSize:12,color:"var(--gray-500)",marginBottom:20}}>Please save this reference number for future tracking.</p>
            <button className="btn-done" onClick={() => setSubmitted(false)}>Register Another Complaint</button>
          </div>
        </div>
      )}
    </>
  );
}