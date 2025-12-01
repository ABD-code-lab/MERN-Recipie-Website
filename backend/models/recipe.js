import mongoose from "mongoose";



const RecipeSchema = new mongoose.Schema({

  username :{type:String, required:true},
  name:{ type :String, required:true},
  ingredients:{type:[String], required:true},
  steps:{type:[String], required:true},
  desc :{type:String, required:true},
  rating: {type:Number ,required:true},
  category:{type:String, required:true},
  difficulty:{type:String, required:true},
  cookingTime:{type:String, required:true},
  servings:{type:Number, required:true}

  
})
export const Recipe =  mongoose.model("Recipe", RecipeSchema)
