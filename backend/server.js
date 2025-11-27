// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import recipeRoute from "./routes/recipe.js"; // for addRecipe
import { getRecipe, getRecipeId, updateRecipe, deleteRecipe } from "./routes/getRecipe.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ----------------- Middleware -----------------
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// ----------------- Routes -----------------

// Auth and User
app.use("/auth", authRoute);
app.use("/user", userRoute);

// Recipe add route (from recipeRoute)
app.use("/recipe", recipeRoute);

// Recipe API routes (GET all, GET by ID, UPDATE, DELETE)
app.get("/recipe/api/getRecipe", getRecipe);
app.get("/recipe/api/getRecipeId", getRecipeId);
app.put("/recipe/api/updateRecipe/:id", updateRecipe);
app.delete("/recipe/api/deleteRecipe/:id", deleteRecipe);

// ----------------- MongoDB Connection -----------------
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// ----------------- Serve React Frontend -----------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from React build (if deployed)
app.use(express.static(path.join(__dirname, "client/build"))); // adjust if your build folder is different

// Catch-all route to serve index.html for SPA routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// ----------------- Start Server -----------------
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
