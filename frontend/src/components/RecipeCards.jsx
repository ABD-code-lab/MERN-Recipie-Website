// src/components/RecipeCards.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ recipe, onDelete, onUpdate }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    try {
      const res = await fetch(`http://localhost:5000/recipe/api/deleteRecipe/${recipe._id}`, {
        method: "DELETE"
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Delete failed");

      onDelete(recipe._id);
      alert("Recipe deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete recipe: " + err.message);
    }
  };

  const isOwner = (localStorage.getItem("name") || "").trim().toLowerCase() === (recipe.username || "").trim().toLowerCase();

  const cardStyle = {
    border: '2px solid #333',
    borderRadius: '12px',
    padding: '20px',
    width: '350px',
    background: '#fff',
    boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
    fontFamily: 'system-ui, sans-serif',
    marginBottom: '20px'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1em',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginBottom: '10px'
  };

  return (
    <div style={cardStyle}>
      <h3 style={{ margin: '0 0 10px', fontSize: '1.5em', color: '#2c3e50', fontWeight: 'bold' }}>
        {recipe.name}
      </h3>
      <p style={{ margin: '0 0 12px', color: '#7f8c8d', fontStyle: 'italic' }}>
        {recipe.desc || 'No description'}
      </p>

      <div style={{ fontSize: '0.95em', color: '#444', marginBottom: '12px' }}>
        <div><strong>Category:</strong> {recipe.category}</div>
        <div><strong>Time:</strong> {recipe.cookingTime} mins</div>
        <div><strong>Difficulty:</strong> {recipe.difficulty}</div>
        <div><strong>Servings:</strong> {recipe.servings}</div>
      </div>

      <strong>Ingredients:</strong>
      <ul style={{ margin: '6px 0 12px', paddingLeft: '20px' }}>
        {recipe.ingredients?.slice(0, 5).map((ing, i) => <li key={i}>{ing}</li>)}
        {recipe.ingredients?.length > 5 && <li style={{ fontStyle: 'italic' }}>+ {recipe.ingredients.length - 5} more</li>}
      </ul>

      {isOwner && (
        <>
          <button
            onClick={() => navigate(`/recipes/update/${recipe._id}`)}
            style={{ ...buttonStyle, background: '#e67e22', color: '#fff' }}
          >
            Edit Recipe
          </button>
          <button
            onClick={handleDelete}
            style={{ ...buttonStyle, background: '#c0392b', color: '#fff', boxShadow: '0 4px 12px rgba(192,57,43,0.4)' }}
          >
            Delete Recipe
          </button>
        </>
      )}

      <div style={{ marginTop: '12px', textAlign: 'center', color: '#95a5a6', fontSize: '0.9em' }}>
        Created by: <strong>{recipe.username}</strong>
      </div>
    </div>
  );
};

export default RecipeCard;
