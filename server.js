require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Setting up database
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on('error',(err)=>console.error(err));
db.once('open',()=>console.log("Connected to database"));

app.get('/',(req, res)=>{
    res.json({
        message : "Welcome to the course API"
    })
})

app.listen(8080, () => {
    console.log("Server is running");
})