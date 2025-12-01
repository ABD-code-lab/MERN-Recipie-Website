import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import recipeRoute from "./routes/recipe.js";

import recipeRoutes from "./routes/getRecipe.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "https://recipe-application-3.onrender.com",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Simple routes
app.use("/auth", authRoute);
app.use("/user", userRoute);

app.use("/recipe", recipeRoutes);
// Base recipe routes (list, create, etc)
app.use("/recipe", recipeRoute);


// DB connect
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
