require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Setting up database
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;

db.on('error',(err)=>console.error(err));
db.once('open',()=>console.log("Connected to database"));

app.use(express.json());
app.get('/',(req, res)=>{
    res.json({
        message : "Welcome to the course API"
    })
})

const categories = require('./routes/categories');
app.use('/categories',categories);

const courses = require('./routes/courses');
app.use('/courses', courses);

const users = require('./routes/users/crud');
const userCourse = require('./routes/users/courses');
app.use('/users',users, userCourse);

app.listen(8080, () => {
    console.log("Server is running");
})