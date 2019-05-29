const express = require('express')
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
// database connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => console.log("Connected to the database server..."))
    .catch(err => {
        console.log("Opps! Error occurred", err);
    });
// express bodyparser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// api routes middleware
app.use("/api",require('./routes/auth'));
app.use("/api", require('./routes/doctor'));

// server listening
app.listen(process.env.PORT,()=>console.log(`Server is on port ${process.env.PORT}`))