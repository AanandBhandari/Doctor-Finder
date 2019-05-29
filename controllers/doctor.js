const Doctor = require('../models/Doctor')
exports.allDoctors =async (req,res) => {
    console.log(1);
    try {
       const doctors =await Doctor.find({})
       if (doctors) {
           res.status(200).json(doctors)
       }
    } catch (error) {
        res.status(400).json(error)
    }
}