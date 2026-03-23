import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginModal({ open, onClose, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!open) return null;

  const handleLogin = async () => {
    try {
      await login(email, password);
      setError("");
      onSuccess(); // after login
      onClose();
    } catch (e) {
      setError("Invalid login");
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Login Required</h3>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button onClick={handleLogin}>
          Login
        </button>

        <button onClick={onClose} style={{ marginLeft: 10 }}>
          Cancel
        </button>

        <p style={{ fontSize: 12, marginTop: 10 }}>
          user@test.com / 1234  
          <br />
          admin@test.com / 1234
        </p>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "white",
  padding: 20,
  borderRadius: 8,
  width: 300,
};