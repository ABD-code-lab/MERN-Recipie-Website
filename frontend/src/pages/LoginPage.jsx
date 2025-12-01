// src/pages/LoginPage.jsx
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
  `${import.meta.env.VITE_API_URL}/auth/login`,
  { email, password },
  { withCredentials: true }
);
      login(res.data.token, res.data.role, res.data.name);
      navigate("/"); // Redirect to homepage
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login Form</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label className="input-label">Email</label>
            <input 
              type="email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input 
              type="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">LOGIN</button>
        </form>
        <div className="register-link">
          Not a member? <Link to="/register">Signup now</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
