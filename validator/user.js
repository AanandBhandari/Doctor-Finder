const emailPatt = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
const stringPatt = /^[a-zA-Z]+$/;
const numberPatt = /^[0-9]+$/;
const DoctorData = require('../models/DoctorData')

// USER PART
exports.validateUserSignup = async (req, res, next) => {
    let error = []
    await validate(req, res, error)

    let { password } = req.body;

    if (password.length < 8) {
        error.push('Password lenght should not be less than 8')
    }
    if (error.length > 0) {
        return res.status(400).json({ error })
    }
    next();
}
exports.validateUserSignin = (req, res, next) => {
    const { email, password } = req.body;
    let error = [];

    if (!email.match(emailPatt)) {
        error.push('Invalid email')
    }
    if (password.length < 8) {
        error.push('Password lenght should not be less than 8')
    }
    if (error.length > 0) {
        return res.status(400).json({ error })
    }
    next();
}

exports.validateSpecialities = async(req,res,next) => {
    let error=[];
    const data = await DoctorData.find({})
    const { speciality } = data[0]
    let {specialities} = req.query
    // console.log(typeof(specialities));
    if (typeof(specialities) === 'string') {
        
        specialities = new Array(specialities)
    }
    let i = 0;
    specialities = specialities.map(s => s.toLowerCase().replace(/\s/g, ''))
    req.query.specialities = specialities
    speciality.forEach(s => {
        if (specialities.indexOf(s.toLowerCase().replace(/\s/g, '')) >= 0) {
            i++
        }
    });
    if (i !== specialities.length) {
        error.push('Invalid Speciality')
    }
    if (error.length > 0) {
        return res.status(400).json({ error })
    }
    next();
}

exports.validateUserUpdateData = async (req, res, next) => {
    let error = []
    await validate(req, res, error);
    if (error.length > 0) {
        return res.status(400).json({ error })
    }
    next();
}

exports.validateGeolocation = async (req, res, next) => {
    let error = []
    const { longitude, latitude } = req.query
    if (longitude <= -180 || longitude >= 180) {
        error.push('Invalid longtitude')
    }
    if (latitude <= -90 || latitude >= 90) {
        error.push('Invalid latitude')
    }
    if (error.length > 0) {
        return res.status(400).json({ error })
    }
    next();
}

async function validate(req, res, error) {
    let { name, lastname, email, phoneno, currentCity } = req.body;
    if (currentCity) {

        req.body.currentCity = currentCity.toLowerCase().replace(/\s/g, '')
    }
    if (!name.match(stringPatt) || !lastname.match(stringPatt)) {
        error.push('Invalid Name OR Lastname')
    }
    if (!email.match(emailPatt)) {
        error.push('Invalid email')
    }

    if (phoneno.length !== 10 || !phoneno.match(numberPatt)) {
        error.push('Invalid phone number')
    }

    return error;


}
