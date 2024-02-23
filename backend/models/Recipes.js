import mongoose from "mongoose";
const RecipeSchema = new mongoose.Schema(
    {
        name:{type:String,required: true, unique: true},
        ingredients:[{type:String,required: true}],
        instructions: {type:String,required: true},
        imageURL: {type:String},
        time: {type: Number,required: true},
        owner: {type: mongoose.Schema.Types.ObjectId,required: true}
    }
);

export const RecipeModel = mongoose.model("recipe", RecipeSchema)