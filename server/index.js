import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import User from './model/User';

const app = express ();
app.use(express.json);

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        if(conn){
            console.log('MongoDB connected');
        }
    }
    catch(e){
        console.log(e.message)
    }
};
connectDB()

app.post("/api/signup", async (req, res)=>{
    const {name, email, password} = req.body;

    const newUser = new User({
        name,
        email,
        password:md5(password)
    });

    try{
        const saveUser = await newUser.save();
        res.status(201).json({
            success: true,
            data: saveUser,
            message: "Signup Successful."
        })
    }
    catch(err){
        res.status(404).json({
           success:false,
           message: err.message 
        })
    }
})
