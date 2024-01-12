const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const Port = "5000"


// DB connection
const mongoose = require("mongoose")
try {
    mongoose.connect("mongodb+srv://---------------------------")
} catch (error) {
    console.log(error)
}

// Import models
const UserModel = require('./Models/users')
const { JsonWebTokenError } = require('jsonwebtoken')


app.get('/users', async (req, res)=>{
    const Users = await UserModel.find()
    res.json(Users)
})


app.get('/register', async (req, res)=>{
    
})

app.post('/user/add', async (req, res)=>{
    const {username, email, password} = req.body
    const user = await UserModel.findOne({username})
    if(user){
        res.send("user already exist !")
    }else{
        const newuser = new UserModel({ username, email,
            password: bcrypt.hashSync(password, 10)
        })
        await newuser.save();
    }
    res.send('bien ajouter')
})

app.get('/Login', async (req, res)=>{
    const {username, password} = req.body
    const user = await UserModel.findOne({username})
    if(!user){
        res.json('user not found !')
    }else{
        const isPassValid = await bcrypt.compare(password, user.password)
        if(isPassValid){
            res.send("login sucsess !")
        }else{
            res.send("Password incorecct !")
        }
    }
    const token = jwt.sign({id: user._id}, process.env.SECRET)
})


app.get('/home', (req, res)=>{
    res.send("welcome to home page !")
})


app.listen(Port , ()=>{
    console.log("hello to hicham amazigh server !")
})
