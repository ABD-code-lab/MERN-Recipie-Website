// src/pages/RecipePage.jsx
import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCards'; // Adjust path if necessary

const RecipePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "http://localhost:5000/recipe/api/getRecipe"; 

  // Fetch all recipes
  const fetchRecipes = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`Network response was not ok: ${response.status}`);

      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        setRecipes(result.data);
      } else {
        throw new Error("API returned success: true, but data was not an array.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(`Failed to fetch recipes: ${err.message}. Check your backend server and CORS setup.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Delete handler (passed to RecipeCard)
  const handleDelete = (id) => {
    setRecipes(prev => prev.filter(recipe => recipe._id !== id));
  };

  // Update handler (passed to RecipeCard)
  const handleUpdate = (id, updatedData) => {
    setRecipes(prev =>
      prev.map(recipe => recipe._id === id ? { ...recipe, ...updatedData } : recipe)
    );
  };

  if (loading) {
    return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Loading Recipes... ⏳</h2>;
  }

  if (error) {
    return <h2 style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>{error}</h2>;
  }

  return (
    <div className="recipe-page">
      <h1 style={{ textAlign: 'center', margin: '30px 0', color: '#2c3e50' }}>
        📚 All Recipes ({recipes.length})
      </h1>

      <div 
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px'
        }}
      >
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipePage;
