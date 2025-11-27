// src/components/RecipeForm.jsx
import { useState, useEffect } from "react";

export default function RecipeForm({ onSubmit, initialData }) {
  const [form, setForm] = useState({
    name: "",
    ingredients: [""],
    steps: [""],
    desc: "",
    rating: "",
    category: "",
    difficulty: "",
    cookingTime: "",
    servings: ""
  });

  // Prefill the form if initialData is provided
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        ingredients: initialData.ingredients?.length ? initialData.ingredients : [""],
        steps: initialData.steps?.length ? initialData.steps : [""],
        desc: initialData.desc || "",
        rating: initialData.rating || "",
        category: initialData.category || "",
        difficulty: initialData.difficulty || "",
        cookingTime: initialData.cookingTime || "",
        servings: initialData.servings || ""
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (index, value, field) => {
    const arr = [...form[field]];
    arr[index] = value;
    setForm({ ...form, [field]: arr });
  };

  const addField = (field) => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  const submitForm = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      rating: Number(form.rating),
      servings: Number(form.servings)
    });
  };

  return (
    <form onSubmit={submitForm} className="recipe-form">
      <h2>{initialData ? "Update Recipe" : "Create Recipe"}</h2>

      <input
        type="text"
        name="name"
        placeholder="Recipe Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      {/* Ingredients */}
      <label>Ingredients</label>
      {form.ingredients.map((item, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Ingredient ${i + 1}`}
          value={item}
          onChange={(e) => handleArrayChange(i, e.target.value, "ingredients")}
          required
        />
      ))}
      <button type="button" className="add-btn" onClick={() => addField("ingredients")}>
        + Add Ingredient
      </button>

      {/* Steps */}
      <label>Steps</label>
      {form.steps.map((item, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Step ${i + 1}`}
          value={item}
          onChange={(e) => handleArrayChange(i, e.target.value, "steps")}
          required
        />
      ))}
      <button type="button" className="add-btn" onClick={() => addField("steps")}>
        + Add Step
      </button>

      <textarea
        name="desc"
        placeholder="Description"
        value={form.desc}
        onChange={handleChange}
        required
      />

      <div className="row">
        <input
          type="number"
          name="rating"
          placeholder="Rating (1-5)"
          value={form.rating}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="servings"
          placeholder="Servings"
          value={form.servings}
          onChange={handleChange}
          required
        />
      </div>

      <div className="row">
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="difficulty"
          placeholder="Difficulty"
          value={form.difficulty}
          onChange={handleChange}
          required
        />
      </div>

      <input
        type="text"
        name="cookingTime"
        placeholder="Cooking Time (e.g. 30 mins)"
        value={form.cookingTime}
        onChange={handleChange}
        required
      />

      <button type="submit" className="submit-btn">
        {initialData ? "Update Recipe" : "Submit Recipe"}
      </button>

      <style jsx>{`
        .recipe-form {
          max-width: 600px;
          margin: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 24px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
          font-family: system-ui, sans-serif;
        }

        h2 {
          text-align: center;
          margin-bottom: 16px;
          color: #2c3e50;
        }

        input, textarea {
          width: 100%;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
        }

        textarea {
          min-height: 80px;
        }

        label {
          font-weight: 600;
          margin-top: 12px;
          margin-bottom: 4px;
        }

        .add-btn {
          background: #e74c3c;
          color: #fff;
          padding: 10px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          margin-bottom: 12px;
        }

        .add-btn:hover {
          background: #e74c3c;
        }

        .submit-btn {
          background: #e74c3c;
          color: #fff;
          padding: 14px;
          border: none;
          border-radius: 12px;
          font-weight: bold;
          cursor: pointer;
          margin-top: 12px;
        }

        .submit-btn:hover {
          background: #e74c3c;
        }

        .row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        @media (max-width: 500px) {
          .row {
            flex-direction: column;
          }
        }
      `}</style>
    </form>
  );
}
