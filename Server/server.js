const express = require('express')
const mongoose = require('mongoose');
const app = express()

const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb://localhost:27017/jiraDB', {useUnifiedTopology: true,useNewUrlParser: true});

app.use('/api/projects', require('./Routes/API/projects'))
app.listen(PORT, (req,res) => {
    console.log(`Server is running on Port ${PORT}`)
})