const mongoose = require('mongoose');
const doctorDataSchema = new mongoose.Schema({
    speciality : [{
        type :String,
    }],
    title : [{
        type : String
    }]

})
module.exports = mongoose.model("DoctorData", doctorDataSchema);