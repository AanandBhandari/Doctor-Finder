const Doctor = require('../models/Doctor')
const { verifyDoctorEmail} = require('../helper/emailverify')
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    let doctorExists = await Doctor.findOne({ email: req.body.email });
    if (doctorExists)
        return res.status(403).json({
            error: "Email is taken!"
        });
    let doctor = new Doctor(req.body);
    doctor = await doctor.save();
    const token = jwt.sign(
        { _id: doctor._id},
        process.env.JWT_EMAIL_VERIFICATION_KEY
        // { expiresIn: 60 * 60 }
    );
    
    await verifyDoctorEmail(req.body.email,req.body.name,token).catch(console.error);
    res.status(200).json({ message: `Follow the link provided to ${req.body.email} to verify it.` });
    setTimeout(async () => {
        const doctor = await Doctor.findOne({ email: req.body.email })
        !doctor.isRegistred && await Doctor.deleteOne({ _id: doctor._id });
        doctor.isRegistred && await Doctor.updateOne({ _id: doctor._id }, { $unset: { isRegistred: 1 }},{ multi: false });

    }, 10000 * 5)
};
exports.emailverify = async (req,res) => {
    const token = req.query.id;
    const decoded = await jwt.verify(token, process.env.JWT_EMAIL_VERIFICATION_KEY);
    const doctor = await Doctor.updateOne({ _id: decoded._id }, { $set: { isRegistred: true } }, { multi: false })
}