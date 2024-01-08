import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import {Server} from "socket.io";

const app = express ();
app.use(express.json);

// socket
const io = new Server(5002, {
    cors: {
        origin : '*',
    },
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (data)=>{
    console.log(data);
  })
});

app.get('/sendMessage', (req, res) =>{
    const {message} = req.query;
    io.emit('receive', message);

    res.status(200).json({message: 'Message sent'});
})

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
});

app.post("/api/login", async(req, res)=>{
    const {email, password} = req.body;

    if (!email || !password) {
        return res.json({
            success: false,
            message: "email or password is invalid"
        })
    }

    const loginuser = await User.findOne({email, password:md5(password)});
    if ( loginuser){
        res.status(201).json({
            success: true,
            data:loginuser,
            message: "login successful."
        })
    }
    else {
         res.status(404).json({
            success: false,
            message: "invalid data"
         })
    }
})

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
