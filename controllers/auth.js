const Doctor = require('../models/Doctor')
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const doctorExists = await Doctor.findOne({ email: req.body.email });
    if (doctorExists)
        return res.status(403).json({
            error: "Email is taken!"
        });
    const doctor = await new Doctor(req.body);
    await doctor.save();
    res.status(201).json({ message: "Signup success! Please login." });
};