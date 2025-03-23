import React, { useEffect, useRef, useState } from "react";
import VanillaTilt from "vanilla-tilt";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function LoginPage() {
  const tiltRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 25,
        speed: 400,
        glare: true,
      });
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple check for this example, you can add API calls for actual authentication
    if (email === "Advika_Singhal" && password === "password") {
      // Save the username or email to localStorage
      localStorage.setItem("username", email);
      navigate("/dashboard"); // Redirect to Dashboard after successful login
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div ref={tiltRef} className="box">
          <div className="elements logo"></div>
          <div className="elements name">
            <h2>Login</h2>
          </div>
          <div className="elements content">
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="login" type="submit">
                Login
              </button>
            </form>
          </div>
          <div className="card"></div>
        </div>
      </div>
    </div>
  );
}
