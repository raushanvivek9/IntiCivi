import { useState } from "react";
import { login } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {

    // admin login
    if (username === "admin" && password === "admin") {
      login("admin");
      navigate("/report");
      return;
    }

    // user login (any user allowed for now)
    if (username && password) {
      login(username);
      navigate("/report");
      return;
    }

    alert("Invalid login");
  };

  return (
    <div style={{ padding: 40 }}>

      <h2>Login</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>

      <br /><br />

      <p>
        New user? <a href="/register">Register</a>
      </p>

    </div>
  );
}