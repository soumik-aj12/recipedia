import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/Users.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post("/register",async (req,res)=>{
    try{
        const {name, email, password} = req.body;
        const user = await UserModel.findOne({email: email});
        
        if(user){
            return res.json({message: "User already exists!"});
        }
        const hashpwd = await bcrypt.hash(password,10);
        const newUser = new UserModel({name,email,password: hashpwd});
        await newUser.save();
        res.status(200).json({message:"success"});
    }
    catch(e){
        res.status(400).send(e);
    }
    
})

router.get("/users", async (req,res)=>{
    // const id = req.params.id;
    const user = await UserModel.find({});
    console.log(user)
    res.status(200).json(user);
})

router.post("/login", async (req,res)=>{
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});

    if(!user){
        return res.json({error:"User doesn't exist"});
    }
    const isPwdValid = await bcrypt.compare(password,user.password);
    if(!isPwdValid){
        return res.json({error:"Incorrect Password"})
    }

    const token = jwt.sign({id: user._id},process.env.SECRET);


    res.json({token, userID: user._id});
})

router.get("/savedRecipes", async (req,res)=>{
    try{
        const id = req.query.id;
        console.log(id)
        const user = await UserModel.findById(id);
        res.status(200).json(user)
}catch(e){console.error(e);}
})

export {router as userRouter};