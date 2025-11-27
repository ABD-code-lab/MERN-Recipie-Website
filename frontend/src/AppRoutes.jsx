import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Profile from "./pages/Profile";

import PrivateRoute from "./components/PrivateRoute";

// Recipes
import RecipePage from "./pages/RecipePage";
import CreateRecipe from "./pages/CreateRecipe";
import UpdateRecipePage from "./pages/UpdateRecipePage"; // <-- NEW

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<HomePage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />

    {/* Recipes Pages */}
    <Route path="/recipes" element={<RecipePage />} />
    <Route path="/recipes/create" element={<CreateRecipe />} />
    <Route path="/recipes/update/:id" element={<UpdateRecipePage />} /> {/* <-- added */}

    {/* Protected Routes */}
    <Route
      path="/profile"
      element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
