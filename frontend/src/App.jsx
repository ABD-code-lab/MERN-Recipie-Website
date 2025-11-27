// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RecipePage from "./pages/RecipePage";
import CreateRecipe from "./pages/CreateRecipe";
import UpdateRecipePage from "./pages/UpdateRecipePage"; // <-- NEW

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Show all recipes */}
          <Route path="/recipes" element={<RecipePage />} /> 

          {/* Create new recipe page */}
          <Route path="/recipes/create" element={<CreateRecipe />} /> 

          {/* Update recipe page */}
          <Route path="/recipes/update/:id" element={<UpdateRecipePage />} /> 
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
