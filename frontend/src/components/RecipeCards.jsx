import React, { useState, useEffect } from 'react';

const RecipeCards = ({ recipe, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const [updatedRecipe, setUpdatedRecipe] = useState({
    name: recipe.name || '',
    desc: recipe.desc || '',
    ingredients: recipe.ingredients || [],
    steps: recipe.steps || [],
    category: recipe.category || '',
    difficulty: recipe.difficulty || '',
    cookingTime: recipe.cookingTime || 0,
    servings: recipe.servings || 0,
  });

  const getLocalUsername = () => {
    try {
      const name = localStorage.getItem("name");
      return (name || "").trim().toLowerCase();
    } catch {
      return "";
    }
  };

  useEffect(() => {
    const localName = getLocalUsername();
    const recipeName = (recipe.username || "").trim().toLowerCase();
    setIsOwner(localName === recipeName);
  }, [recipe.username]);

  const handleChange = (e) =>
    setUpdatedRecipe(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleArrayChange = (e) => {
    const lines = e.target.value.split('\n').map(l => l.trim()).filter(Boolean);
    setUpdatedRecipe(prev => ({ ...prev, [e.target.name]: lines }));
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/recipe/${recipe._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRecipe),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      onUpdate(recipe._id, data.data || data);
      setEditing(false);
      alert('Recipe updated!');
    } catch (err) {
      alert('Update failed: ' + err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/recipe/${recipe._id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await res.text());
      onDelete(recipe._id);
      alert("Recipe deleted successfully!");
    } catch (err) {
      alert("Recipe delete successfully " );
    }
  };

  const cardStyle = {
    border: '2px solid #333',
    borderRadius: '16px',
    padding: '24px',
    width: '380px',
    background: '#fff',
    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
    fontFamily: 'system-ui, sans-serif',
  };

  return (
    <div style={cardStyle}>
      {editing ? (
        <>
          <h2 style={{ margin: '0 0 16px' }}>Edit Recipe</h2>
          <input name="name" value={updatedRecipe.name} onChange={handleChange} placeholder="Name"
            style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
          <textarea name="desc" value={updatedRecipe.desc} onChange={handleChange} placeholder="Description"
            style={{ width: '100%', height: '80px', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
          <textarea name="ingredients" value={updatedRecipe.ingredients.join('\n')} onChange={handleArrayChange} placeholder="Ingredients (one per line)"
            style={{ width: '100%', height: '110px', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
          <textarea name="steps" value={updatedRecipe.steps.join('\n')} onChange={handleArrayChange} placeholder="Steps"
            style={{ width: '100%', height: '130px', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
          <input name="category" value={updatedRecipe.category} onChange={handleChange}
            style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
          <input name="difficulty" value={updatedRecipe.difficulty} onChange={handleChange}
            style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
          <input type="number" name="cookingTime" value={updatedRecipe.cookingTime} onChange={handleChange}
            style={{ width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
          <input type="number" name="servings" value={updatedRecipe.servings} onChange={handleChange}
            style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #ccc' }} />
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={handleUpdate} style={{ flex: 1, padding: '16px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold' }}>SAVE</button>
            <button onClick={() => setEditing(false)} style={{ flex: 1, padding: '16px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold' }}>CANCEL</button>
          </div>
        </>
      ) : (
        <>
          <h3 style={{ margin: '0 0 12px', fontSize: '1.7em', color: '#2c3e50', fontWeight: 'bold' }}>{recipe.name}</h3>
          <p style={{ margin: '0 0 16px', color: '#7f8c8d', fontStyle: 'italic' }}>{recipe.desc || 'No description'}</p>
          <div style={{ fontSize: '0.95em', color: '#444', marginBottom: '16px' }}>
            <div><strong>Category:</strong> {recipe.category}</div>
            <div><strong>Time:</strong> {recipe.cookingTime} mins</div>
            <div><strong>Difficulty:</strong> {recipe.difficulty}</div>
            <div><strong>Servings:</strong> {recipe.servings}</div>
          </div>
          <strong>Ingredients:</strong>
          <ul style={{ margin: '8px 0 24px', paddingLeft: '24px' }}>
            {recipe.ingredients?.slice(0, 5).map((ing, i) => <li key={i}>{ing}</li>)}
            {recipe.ingredients?.length > 5 && <li style={{ fontStyle: 'italic' }}>+ {recipe.ingredients.length - 5} more</li>}
          </ul>

          {isOwner && (
            <>
              <button onClick={() => setEditing(true)}
                style={{ width: '100%', padding: '18px', background: '#e67e22', color: 'white', border: 'none', borderRadius: '14px', fontSize: '1.3em', fontWeight: 'bold', cursor: 'pointer', marginBottom: '12px' }}>
                EDIT THIS RECIPE
              </button>
              <button onClick={handleDelete}
                style={{ width: '100%', padding: '16px', background: '#c0392b', color: 'white', border: 'none', borderRadius: '12px', fontSize: '1.2em', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 6px 18px rgba(192, 57, 43, 0.4)' }}>
                DELETE THIS RECIPE
              </button>
            </>
          )}

          <div style={{ marginTop: '16px', textAlign: 'center', color: '#95a5a6', fontSize: '0.9em' }}>
            Created by: <strong>{recipe.username}</strong>
          </div>
        </>
      )}
    </div>
  );
};

export default RecipeCards;
