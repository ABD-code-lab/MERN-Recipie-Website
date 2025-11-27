import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./HomePage.css";  // <-- link CSS here

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="homepage">

      {/* ================= HEADER ================= */}
      <header className="header">
        <div className="logo">🍽️ RecipeHub</div>

        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <a href="#">Home</a>
          <a href="/recipes">Browse Recipes</a>
          <a href="/recipes/create">Submit Recipes</a>

          {user ? (
            <>
              <span style={{ marginLeft: 15 }}>Hello, {user.name}</span>
              <button className="login-btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <a href="/login"><button className="login-btn">Login</button></a>
              <a href="/register"><button className="login-btn">Register</button></a>
            </>
          )}
        </nav>

        <div className="hamburger" onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-left">
          <h1>Discover, Share, and Cook <br /> Delicious Recipes</h1>
          <p>Find your next favorite dish with RecipeHub!</p>
          <button className="explore-btn"> <a href="/recipes">Explore Recipes</a></button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
