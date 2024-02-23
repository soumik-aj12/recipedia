import express from 'express'
import mongoose from 'mongoose'
import { RecipeModel } from '../models/Recipes.js';
import { UserModel } from '../models/Users.js';

const router = express.Router();

router.post("/", async (req,res)=>{
    try{
        const recipe = new RecipeModel(req.body);
        const result = await recipe.save();
        res.status(200).json(result);
}catch(e){   console.error(e);}
})

// router.get("/", async (req,res)=>{
//     try{
//         console.log(req.body);
//         const recipes = await RecipeModel.find({ name: { $regex: req.body.name, $options: 'i' } });
//         res.status(200).json(recipes)
// }catch(e){   console.error(e);}
// })
router.put("/",async (req,res)=>{
    try{
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.UserID);
        console.log(user)
        console.log(recipe)
        user.savedRecipes.push(recipe);
       await user.save();
       res.status(200).json({savedRecipes: user.savedRecipes});
    }catch(e){console.log(e)}
})
router.get("/", async (req,res)=>{
    try{
        const recipes = await RecipeModel.find({});
        res.status(200).json(recipes)
        console.log(recipes)
}catch(e){   console.error(e);}
})

router.get('/:recipeId', async (req, res) => {
    try {
      const recipeId = req.params.recipeId;
  
      // Fetch recipe document from the database by ID
      const recipe = await RecipeModel.findById(recipeId);
  
      res.json(recipe);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

export {router as recipeRouter};