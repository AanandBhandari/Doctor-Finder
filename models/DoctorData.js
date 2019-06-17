const mongoose = require('mongoose');
const doctorDataSchema = new mongoose.Schema({
    speciality : [String],
    title : [String]

})
module.exports = mongoose.model("DoctorData", doctorDataSchema);