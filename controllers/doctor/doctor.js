const Doctor = require('../../models/Doctor')

exports.doctorById = async (req,res,next) => {
    try {
        const doctor = await Doctor.findById(req.params.id).select("name lastname email phoneno website specialities titles currentCity")
        if (doctor) {
           req.profile = doctor
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
        const doctors = await Doctor.find({}).select("name lastname email phoneno website specialities titles currentCity")
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
       const deletedDoctor = await req.profile.remove();
       if (deletedDoctor) {
           
           return res.json({ message: "Doctor deleted successfully" });
       }
        throw 'Doctor not found'
    } catch (error) {
        res.status(400).json(error)
    }
}
exports.updateDoctor = async(req,res) => {
    try {
        const { name, lastname, email, phoneno, website, specialities, titles,currentCity} = req.body
        req.profile.name = name 
        req.profile.lastname = lastname
        req.profile.email = email 
        req.profile.phoneno = phoneno
        req.profile.website = website
        req.profile.specialities = specialities
        req.profile.titles = titles
        req.profile.currentCity = currentCity
        const updatedoctor = req.profile.save()
       if(updatedoctor) {
           return res.json({message : 'Doctor updated successfully'})
       }
       throw 'Could not be updated'
    } catch (error) {
        res.status(400).json({error})
    }
}