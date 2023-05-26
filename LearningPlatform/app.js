const express = require('express');
const mongoose = require('mongoose');

const categories = require('./Routes/categories');
const students = require('./Routes/students');
const courses = require('./Routes/courses');


mongoose.connect('mongodb://127.0.0.1/learningPlatform')
.then(()=> console.log("sucessfully connected to db"))
.catch(err => console.error("Not connected to db ", err))

const app = express();

app.use(express.json())

app.use('/api/categories', categories);

app.use('/api/students', students);

app.use('/api/courses', courses);

const port = process.env.Port || 6060

app.listen(port, ()=>{
    console.log(`server is up and running on port ${port}`)
})