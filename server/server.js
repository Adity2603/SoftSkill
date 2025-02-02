const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/userdata")

app.post('/register' , (req , res) =>{

    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))

})

app.listen(3001 , ()=>{
    console.log("Server is Running...");

    
})