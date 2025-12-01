import express from "express";
import jwt from "jsonwebtoken";
import { Recipe } from "../models/recipe.js";

const router = express.Router();

router.post("/api/addRecipe", async (req, res) => {
  try {
    // AUTH CHECK
    const Cookie = req.cookies.auth;
    if (!Cookie) return res.status(401).json({ message: "No auth cookie found" });

    const parsed = JSON.parse(Cookie); // { token, email }
    if (!parsed.token) return res.status(401).json({ message: "No token in cookie" });

    const decoded = jwt.verify(parsed.token, process.env.JWT_SECRET);
    const username = decoded.role;

    // BODY FIELDS
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
      return res.status(400).json({ message: "Missing field" });
    }

    // SAVE RECIPE
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
      createdBy: decoded.id
    });

    await add_recipe.save();
    res.status(201).json({ message: "Recipe added" });

  } catch (err) {
    console.log("ERROR IN RECIPE....", err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
