import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const handleRegister = () => {

    localStorage.setItem("user_" + user, pass);

    alert("Registered");

    navigate("/login");
  };

  return (
    <div style={{ padding: 40 }}>

      <h2>Register</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUser(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPass(e.target.value)}
      />

      <br /><br />

      <button onClick={handleRegister}>
        Register
      </button>

    </div>
  );
}