// src/pages/UpdateRecipePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateRecipePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipeData, setRecipeData] = useState({
    name: '',
    desc: '',
    ingredients: [],
    steps: [],
    rating: 0,
    category: '',
    difficulty: '',
    cookingTime: '',
    servings: 1
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch recipe by ID
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`http://localhost:5000/recipe/api/getRecipeId?id=${id}`);
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message || "Recipe not found");

        setRecipeData(data.data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/recipe/api/updateRecipe/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData)
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Update failed");

      alert("Recipe updated successfully!");
      navigate('/recipes');
    } catch (err) {
      console.error(err);
      alert("Failed to update recipe: " + err.message);
    }
  };

  if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Loading recipe...</h2>;
  if (error) return <h2 style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>Error: {error}</h2>;

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '12px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#2c3e50' }}>Update Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={recipeData.name} onChange={handleChange} required style={{ width: '100%', padding: '10px', margin: '8px 0', borderRadius: '6px', border: '1px solid #ccc' }} />

        <label>Description:</label>
        <textarea name="desc" value={recipeData.desc} onChange={handleChange} required style={{ width: '100%', padding: '10px', margin: '8px 0', borderRadius: '6px', border: '1px solid #ccc' }} />

        <label>Ingredients (comma separated):</label>
        <input
          type="text"
          name="ingredients"
          value={recipeData.ingredients.join(', ')}
          onChange={(e) => setRecipeData(prev => ({ ...prev, ingredients: e.target.value.split(',').map(i => i.trim()) }))}
          required
          style={{ width: '100%', padding: '10px', margin: '8px 0', borderRadius: '6px', border: '1px solid #ccc' }}
        />

        <label>Steps (comma separated):</label>
        <input
          type="text"
          name="steps"
          value={recipeData.steps.join(', ')}
          onChange={(e) => setRecipeData(prev => ({ ...prev, steps: e.target.value.split(',').map(s => s.trim()) }))}
          required
          style={{ width: '100%', padding: '10px', margin: '8px 0', borderRadius: '6px', border: '1px solid #ccc' }}
        />

        <label>Rating:</label>
        <input type="number" name="rating" value={recipeData.rating} onChange={handleChange} min="0" max="5" required style={{ width: '100%', padding: '10px', margin: '8px 0', borderRadius: '6px', border: '1px solid #ccc' }} />

        <label>Category:</label>
        <input type="text" name="category" value={recipeData.category} onChange={handleChange} required style={{ width: '100%', padding: '10px', margin: '8px 0', borderRadius: '6px', border: '1px solid #ccc' }} />

        <label>Difficulty:</label>
        <input type="text" name="difficulty" value={recipeData.difficulty} onChange={handleChange} required style={{ width: '100%', padding: '10px', margin: '8px 0', borderRadius: '6px', border: '1px solid #ccc' }} />

        <label>Cooking Time (mins):</label>
        <input type="text" name="cookingTime" value={recipeData.cookingTime} onChange={handleChange} required style={{ width: '100%', padding: '10px', margin: '8px 0', borderRadius: '6px', border: '1px solid #ccc' }} />

        <label>Servings:</label>
        <input type="number" name="servings" value={recipeData.servings} onChange={handleChange} min="1" required style={{ width: '100%', padding: '10px', margin: '8px 0', borderRadius: '6px', border: '1px solid #ccc' }} />

        <button type="submit" style={{ width: '100%', padding: '12px', background: '#27ae60', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', marginTop: '16px', cursor: 'pointer' }}>
          Update Recipe
        </button>
      </form>
    </div>
  );
};

export default UpdateRecipePage;
