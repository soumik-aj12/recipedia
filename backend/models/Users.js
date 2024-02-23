import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
    {
        name:{type:String,required: true},
        email:{type:String,required: true, unique: true},
        password: {type:String,required: true},
        savedRecipes:[{type:mongoose.Schema.Types.ObjectId,ref: "recipe"}]
    }
);

export const UserModel = mongoose.model("user", UserSchema)