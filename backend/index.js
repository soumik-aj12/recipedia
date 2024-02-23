import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users.js";
import { recipeRouter } from "./routes/recipes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/auth",userRouter);
app.use("/recipe",recipeRouter);

// mongoose.connect(
//   "mongodb+srv://root:recipe@recipe.il1s1ex.mongodb.net/recipe?retryWrites=true&w=majority"
// ).then(()=>console.log("Database Connected"))
// .catch(e=>console.log(e));

mongoose.connect(
  "mongodb://127.0.0.1:27017/recipe-manager"
).then(()=>console.log("Database Connected"))
.catch(e=>console.log(e));

app.get("/",(req,res)=>{
    res.send("Hello universe!")
})
app.listen(8080, () => console.log("Server running at 8080"));
