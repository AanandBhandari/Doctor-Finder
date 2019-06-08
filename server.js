const express = require('express')
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors')
// database connection
mongoose
    .connect(process.env.MONGO_URI, { useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false })
    .then(() => console.log("Connected to the database server..."))
    .catch(err => {
        console.log("Opps! Error occurred", err);
    });
// express bodyparser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// for cross origin resourse sharing
app.use(cors());

// api routes middleware
app.use("/api",require('./routes/doctor/auth'));
app.use("/api", require('./routes/doctor/doctor'));
app.use("/api", require('./routes/user/auth'));
app.use("/api", require('./routes/user/user'));

// server listening
app.listen(process.env.PORT,()=>console.log(`Server is on port ${process.env.PORT}`))