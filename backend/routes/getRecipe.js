import express from "express";
import mongoose from "mongoose";
import { Recipe } from "../models/recipe.js";

const router = express.Router();

// ===================== GET ALL RECIPES =====================
const getRecipe = router.get("/api/getRecipe", async (req, res) => {
    try {
        const recipe = await Recipe.find();
        return res.json({ success: true, data: recipe });
    } catch (err) {
        console.log("ERROR OCCURED IN RETRIEVING RECIPIES.....", err);
        return res.status(500).json({ success: false, message: "server error" });
    }
});


// ===================== GET RECIPE BY ID =====================
const getRecipeId = router.get("/api/getRecipeId", async (req, res) => {
    const id = req.query.id;
    const findRecipe = await Recipe.findById(id);
    return res.json({ success: true, data: findRecipe });
});


// ===================== DELETE RECIPE =====================
const deleteRecipe = router.delete("/api/deleteRecipe/:id", async (req, res) => {
    const { id } = req.params;
    const deleteRecipe = await Recipe.findByIdAndDelete(id);

    if (!deleteRecipe) return res.json({ success: false, message: "recipe not found" });

    return res.json({ success: true, message: "recipe deleted" });
});


// ===================== UPDATE RECIPE =====================
const updateRecipe = router.put("/api/updateRecipe/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updateRecipe = await Recipe.findByIdAndUpdate(id, updateData, { new: true });

        if (!updateRecipe)
            return res.status(404).json({ success: false, message: "Recipe not found" });

        res.json({ success: true, data: updateRecipe });

    } catch (err) {
        console.error("Error updating recipe:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});


// ===================== EXPORTS =====================
export { getRecipe, getRecipeId, deleteRecipe, updateRecipe };
