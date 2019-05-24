const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    lastname : {
        type : String,
        trim : true,
        required : true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    speciality : [{
        type : String,
        required : true,
    }],
    title : [{
        type : String,
        required : true
    }],
    description : {
        type : String,
    },
    website : {
        type : String
    },
    phoneno : {
        type : Number
    },
    created: {
        type: Date,
        default: Date.now
    },
})
module.exports = mongoose.model("Doctor", doctorSchema);