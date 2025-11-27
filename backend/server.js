import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import recipeRoute from "./routes/recipe.js";

// Recipe controllers
import { getRecipe, getRecipeId, updateRecipe, deleteRecipe } from "./routes/getRecipe.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/recipe", recipeRoute);

// Main recipe GET route
app.use("/recipe", getRecipe);

// Specific recipe actions
app.get("/recipe/:id", getRecipeId);
app.put("/recipe/:id", updateRecipe);
app.delete("/recipe/:id", deleteRecipe);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
