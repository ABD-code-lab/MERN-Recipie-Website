// HomePage.jsx
import React from "react";
import "./App.css";

const HomePage = () => {
  return (
    <div className="homepage">

      {/* ================= HEADER ================= */}
      <header className="header">
        <div className="logo">🍽️ RecipeHub</div>
        <nav className="nav">
          <a href="#">Home</a>
          <a href="#">Browse Recipes</a>
          <a href="#">Submit Recipes</a>
          <a href="#">Categories</a>
          <a href="#">Blog</a>
          <a href="#">Contact Us</a>
          <button className="login-btn">Login</button>
        </nav>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="hero">
        <div className="hero-left">
          <h1>Discover, Share, and Cook <br /> Delicious Recipes</h1>
          <p>Find your next favorite dish with RecipeHub!</p>
          <button className="explore-btn">Explore Recipes</button>
        </div>
      </section>

      {/* ================= ABOUT US ================= */}
      <section className="about">
        <h2>About Us</h2>
        <p>
          RecipeHub is your go-to platform for discovering amazing recipes,
          sharing your own kitchen creations, and exploring new flavors. Our
          mission is to bring food lovers together and make cooking easy and fun.
        </p>
      </section>

      {/* ================= FEATURED RECIPES ================= */}
      <section className="featured">
        <h2>Our Featured Recipes</h2>
        <div className="featured-cards">
          <div className="card">
            <div className="card-img food1"></div>
            <h3>Classic Pasta</h3>
            <p>Italian • Easy • 20 mins</p>
          </div>
          <div className="card">
            <div className="card-img food2"></div>
            <h3>Grilled Chicken</h3>
            <p>Protein • Medium • 30 mins</p>
          </div>
          <div className="card">
            <div className="card-img food3"></div>
            <h3>Chocolate Dessert</h3>
            <p>Sweet • Easy • 15 mins</p>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="categories">
        <h2>Categories</h2>
        <div className="category-box">
          <div className="cat breakfast">Breakfast</div>
          <div className="cat vegan">Vegan</div>
          <div className="cat desserts">Desserts</div>
          <div className="cat quick">Quick Meals</div>
        </div>
      </section>

      {/* ================= TRENDING RECIPES ================= */}
      <section className="trending">
        <h2>Trending Recipes</h2>
        <div className="trending-list">
          <div className="trend-card">🔥 Spicy Ramen</div>
          <div className="trend-card">🔥 Cheesy Pizza</div>
          <div className="trend-card">🔥 BBQ Burger</div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <h3>RecipeHub</h3>
            <p>Your all-in-one place for delicious recipes.</p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <p>Home</p>
            <p>About</p>
            <p>Trending</p>
          </div>
          <div>
            <h4>Categories</h4>
            <p>Breakfast</p>
            <p>Vegan</p>
            <p>Desserts</p>
          </div>
          <div>
            <h4>Follow Us</h4>
            <p>Facebook</p>
            <p>Instagram</p>
            <p>YouTube</p>
          </div>
        </div>
        <p className="copy">© 2025 RecipeHub — All Rights Reserved.</p>
      </footer>

    </div>
  );
};

export default HomePage;
