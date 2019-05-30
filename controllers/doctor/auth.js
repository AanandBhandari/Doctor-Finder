const Doctor = require('../../models/Doctor')
const { verifyDoctorEmail} = require('../../helper/emailverify')
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        let doctorExists = await Doctor.findOne({ email: req.body.email });
        if (doctorExists)
            return res.status(403).json({
                error: "Email is taken!"
            });
        let doctor = new Doctor(req.body);
        doctor.isRegistred = false;
        doctor = await doctor.save();
        if (doctor) {
            const token = jwt.sign(
                { _id: doctor._id },
                process.env.JWT_EMAIL_VERIFICATION_KEY
                // { expiresIn: 60 * 60 }
            );
            // await verifyDoctorEmail(req.body.email,req.body.name,token)
            res.status(200).json({ message: `Follow the link provided to ${req.body.email} to verify it.` });
            setTimeout(async () => {
                const doctor = await Doctor.findOne({ email: req.body.email })
                !doctor.isRegistred && await Doctor.deleteOne({ _id: doctor._id });
                doctor.isRegistred && await Doctor.updateOne({ _id: doctor._id }, { $unset: { isRegistred: "" } }, { multi: false });

        }, 100000)
            
        }
        
    } catch (error) {
        res.status(500).json("Something went wrong.Please try again after 5 minutes")
    }
};
// verifying email link
exports.emailverify = async (req,res) => {
    try {
        const token = req.query.id;
        const decoded = await jwt.verify(token, process.env.JWT_EMAIL_VERIFICATION_KEY);
        await Doctor.updateOne({ _id: decoded._id }, { $set: { isRegistred: true } }, { multi: false })
        res.status(200).json({message : 'Successfully signup!'})
    } catch (error) {
        res.send(400).json({message : 'Invalid Link'})
    }
}
exports.signin = async (req,res) => {
    try {
        const { email, password } = req.body;
        let doctor = await Doctor.findByCredentials(email,password)
        doctor.salt = undefined
        doctor.password = undefined
        if (doctor) {
            const token = jwt.sign({ _id: doctor._id }, process.env.JWT_SIGNIN_KEY)
            return res.json({ token, doctor });
        }
        throw 'Doctor not found'
    } catch (error) {
        res.status(401).json(error)
    }
}

// authentication middleware
exports.authenticater = async (req, res, next) => {
    const token = req.headers.authorization;
    try {
        
        if (token) {
            const user = await parseToken(token)
            if (user) {
                const doctor = await Doctor.findById(user._id).select("name  email ")
                if (doctor) {
                    req.doctor = doctor
                   return next();
                }
                throw 'doctor not found'
            }
            throw 'Invalid Token'
        }
        throw 'Invalid User'
    } catch (error) {
        res.status(401).json(error)
    }
}
function parseToken(token) {
    try {
        return jwt.verify(token.split(" ")[1], process.env.JWT_SIGNIN_KEY);
    } catch (error) {
        return Error({ error: error.message });
    }
}

// has authorization middleware
exports.hasAuthorization = async (req,res,next) => {
    console.log('second');
    try {
        const sameDoctor = req.profile && req.doctor &&  req.profile._id.toString() === req.doctor._id.toString()
        console.log(sameDoctor);
        if(sameDoctor) {
            console.log('third');
           return next();
        }
        throw 'User is not authorized to perform this action'
    } catch (error) {
        res.status(403).json({error : error})
    }
}