import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { isLoggedIn, logout, getUser } from "../utils/auth";
import LoginModal from "./LoginModal";

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [username, setUsername] = useState(getUser?.() || "");
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const sync = () => {
      setLoggedIn(isLoggedIn());
      setUsername(getUser?.() || "");
    };
    window.addEventListener("storage", sync);
    window.addEventListener("authChange", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("authChange", sync);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    setUsername("");
    navigate("/");
  };

  const handleLoginSuccess = (user) => {
    setLoggedIn(true);
    setUsername(user);
    setShowModal(false);
  };

  // Always force white/gold colors — never let Bootstrap darken them
  const linkStyle = ({ isActive }) => ({
    display: "flex",
    alignItems: "center",
    padding: "6px 16px",
    fontSize: "13px",
    fontWeight: 500,
    color: isActive ? "#d4aa50" : "rgba(255,255,255,0.75)",
    textDecoration: "none",
    borderRadius: "4px",
    background: isActive ? "rgba(184,146,42,0.15)" : "transparent",
    transition: "background 0.15s, color 0.15s",
    whiteSpace: "nowrap",
    fontFamily: "'DM Sans', sans-serif",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500;600&display=swap');

        .nav-root {
          background: #0a2240;
          border-bottom: 3px solid #b8922a;
          font-family: 'DM Sans', sans-serif;
          position: relative;
          z-index: 100;
        }
        .nav-inner {
          max-width: 1350px;
          margin: 0 auto;
          padding: 0 32px;
          display: flex;
          align-items: center;
          height: 52px;
          gap: 4px;
        }
        .nav-brand {
          font-family: 'EB Garamond', serif;
          font-size: 20px;
          font-weight: 500;
          color: #d4aa50 !important;
          text-decoration: none !important;
          letter-spacing: 0.01em;
          margin-right: 32px;
          flex-shrink: 0;
        }
        .nav-brand:hover { color: #fff !important; }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0; padding: 0;
          flex: 1;
        }
        /* Force hover color — override any Bootstrap interference */
        .nav-links a:hover {
          background: rgba(255,255,255,0.08) !important;
          color: #ffffff !important;
          text-decoration: none !important;
        }

        .nav-right {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .nav-user-chip {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 100px;
          padding: 4px 14px 4px 5px;
          font-size: 12.5px; color: #fff;
        }
        .nav-avatar {
          width: 28px; height: 28px; border-radius: 50%;
          background: #b8922a; color: #0a2240;
          font-size: 11px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
        }
        .nav-btn-logout {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.3);
          color: rgba(255,255,255,0.8);
          padding: 5px 14px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px; font-weight: 500;
          cursor: pointer; transition: all 0.15s;
        }
        .nav-btn-logout:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
          border-color: rgba(255,255,255,0.5);
        }
        .nav-btn-login {
          background: #b8922a; color: #0a2240;
          border: none; padding: 7px 22px; border-radius: 100px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px; font-weight: 700;
          cursor: pointer; transition: background 0.15s;
          letter-spacing: 0.02em;
        }
        .nav-btn-login:hover { background: #d4aa50; }

        /* Mobile */
        .nav-hamburger {
          display: none;
          background: none; border: none;
          color: rgba(255,255,255,0.8);
          font-size: 22px; cursor: pointer;
          margin-left: auto; padding: 4px 8px;
        }
        .nav-mobile-menu {
          display: none;
          flex-direction: column;
          background: #0a2240;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 8px 16px 16px;
        }
        .nav-mobile-menu.open { display: flex; }
        .nav-mobile-link {
          padding: 10px 8px;
          font-size: 14px; font-weight: 500;
          color: rgba(255,255,255,0.75) !important;
          text-decoration: none !important;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          font-family: 'DM Sans', sans-serif;
        }
        .nav-mobile-link:hover { color: #d4aa50 !important; }

        @media (max-width: 768px) {
          .nav-links, .nav-right { display: none; }
          .nav-hamburger { display: block; }
          .nav-inner { padding: 0 16px; }
        }
      `}</style>

      <nav className="nav-root">
        <div className="nav-inner">

          <NavLink className="nav-brand" to="/">IntiCivi</NavLink>

          {/* Desktop nav links */}
          <ul className="nav-links">
            <li><NavLink to="/" end style={linkStyle}>Home</NavLink></li>
            <li><NavLink to="/registercomplaint" style={linkStyle}>Report Issue</NavLink></li>
            <li><NavLink to="/trackissue" style={linkStyle}>Track Complaint</NavLink></li>
          </ul>

          {/* Desktop right */}
          <div className="nav-right">
            {loggedIn ? (
              <>
                <div className="nav-user-chip">
                  <div className="nav-avatar">{username.slice(0, 2).toUpperCase()}</div>
                  <span>{username}</span>
                </div>
                <button className="nav-btn-logout" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <button className="nav-btn-login" onClick={() => setShowModal(true)}>Login</button>
            )}
          </div>

          {/* Hamburger */}
          <button className="nav-hamburger" onClick={() => setMenuOpen(o => !o)}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile dropdown */}
        <div className={`nav-mobile-menu${menuOpen ? " open" : ""}`}>
          <NavLink className="nav-mobile-link" to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink className="nav-mobile-link" to="/registercomplaint" onClick={() => setMenuOpen(false)}>Report Issue</NavLink>
          <NavLink className="nav-mobile-link" to="/trackissue" onClick={() => setMenuOpen(false)}>Track Complaint</NavLink>
          <div style={{ paddingTop: 12 }}>
            {loggedIn ? (
              <button className="nav-btn-logout" style={{ width: "100%" }} onClick={handleLogout}>
                Logout ({username})
              </button>
            ) : (
              <button className="nav-btn-login" style={{ width: "100%" }}
                onClick={() => { setShowModal(true); setMenuOpen(false); }}>
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {showModal && (
        <LoginModal
          onClose={() => setShowModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
}

export default Navbar;