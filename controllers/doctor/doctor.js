const Doctor = require('../../models/Doctor')

exports.doctorById = async (req,res,next) => {
    try {
        const doctor = await Doctor.findById(req.params.id).select("name lastname email phoneno website specialities titles")
        if (doctor) {
           req.profile = doctor
           console.log('first');
           return next();
        }
        throw 'Doctor not found'
    } catch (error) {
        res.status(400).json(error)
    }
}
exports.getDoctor = async (req,res) => {
    res.json(req.profile)
}

exports.getDoctors =async (req,res) => {
    try {
        const doctors = await Doctor.find({}).select("name lastname email phoneno website specialities titles")
       if (doctors) {
           
          return res.status(200).json(doctors)
       }
       throw 'No Doctors found'
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.deleteDoctor = async(req,res) => {
    try {
        console.log('last');
       const deletedDoctor = await req.profile.remove();
       if (deletedDoctor) {
           
           return res.json({ message: "User deleted successfully" });
       }
        throw 'Doctor not found'
    } catch (error) {
        res.status(400).json(error)
    }
}