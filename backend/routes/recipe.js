import express from "express";
import { Recipe } from "../models/recipe.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/api/addRecipe", async (req, res) => {
  try {
    // Check auth cookie
    const Cookie = req.cookies?.auth;
    if (!Cookie) return res.status(401).json({ message: "No auth cookie found" });

    const parsed = JSON.parse(Cookie); // { token, email }
    if (!parsed.token) return res.status(401).json({ message: "No token in cookie" });

    // Decode JWT
    const decoded = jwt.verify(parsed.token, process.env.JWT_SECRET);
    const username = decoded.role; // OR decoded.username if you stored that

    console.log("Decoded Token:", decoded);

    // Extract fields
    const {
      name,
      desc,
      ingredients,
      steps,
      rating,
      category,
      difficulty,
      cookingTime,
      servings
    } = req.body;

    if (!name || !desc) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create new recipe
    const add_recipe = new Recipe({
      username,
      name,
      desc,
      ingredients,
      steps,
      rating,
      category,
      difficulty,
      cookingTime,
      servings,
      createdBy: decoded.id // track which user added it
    });

    await add_recipe.save();

    return res.status(201).json({ message: "Recipe added successfully" });

  } catch (err) {
    console.error("ERROR IN ADDING RECIPE:", err);
    return res.status(500).json({ message: "Server error while adding recipe" });
  }
});

export default router;
