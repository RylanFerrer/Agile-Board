const express = require('express')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const app = express()

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/jiraDB', {useUnifiedTopology: true,useNewUrlParser: true});
app.use(express.json())
app.use(cookieParser())
app.use('/api/dashboard', require('./Routes/API/dashboard'))
app.use('/api/projects', require('./Routes/API/projects'))
app.use('/api/auth', require('./Routes/API/auth'))
app.listen(PORT, (req,res) => {
    console.log(`Server is running on Port ${PORT}`)
})