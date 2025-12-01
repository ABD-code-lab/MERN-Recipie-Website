// src/App.jsx
import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom"; // <-- change here
import AuthProvider from "./context/AuthContext";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RecipePage from "./pages/RecipePage";
import CreateRecipe from "./pages/CreateRecipe";

function App() {
  return (
    <HashRouter> {/* <-- change here */}
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/recipes" element={<RecipePage />} />
          <Route path="/recipes/create" element={<CreateRecipe />} />
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
