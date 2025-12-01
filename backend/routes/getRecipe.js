import express from "express";
import { Recipe } from "../models/recipe.js";

const router = express.Router();

// GET ALL RECIPES
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json({ success: true, data: recipes });
  } catch (err) {
    console.error("Error fetching recipes:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET RECIPE BY ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id);
    if (!recipe) return res.status(404).json({ success: false, message: "Recipe not found" });
    res.json({ success: true, data: recipe });
  } catch (err) {
    console.error("Error fetching recipe by ID:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// UPDATE RECIPE
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedRecipe) return res.status(404).json({ success: false, message: "Recipe not found" });
    res.json({ success: true, data: updatedRecipe });
  } catch (err) {
    console.error("Error updating recipe:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// DELETE RECIPE
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (!deletedRecipe) return res.status(404).json({ success: false, message: "Recipe not found" });
    res.json({ success: true, message: "Recipe deleted" });
  } catch (err) {
    console.error("Error deleting recipe:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
