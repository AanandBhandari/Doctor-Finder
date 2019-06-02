const emailPatt = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
const stringPatt = /^[a-zA-Z]+$/;
const numberPatt = /^[0-9]+$/;
const DoctorData = require('../models/DoctorData')

// DOCTOR PART
exports.validateDoctorSignup= async(req,res,next) => {
    let error = []
    await validate(req,res,error)
   
    let {password} = req.body;
    
    if(password.length<8){
        error.push('Password lenght should not be less than 8')
    }
    if (error.length > 0) {
        return res.status(400).json({ error })
    }
    next();
}
exports.validateDoctorSignin = (req,res,next) => {
    const {email,password} = req.body;
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
exports.validateDoctorUpdateData =async (req,res,next) => {
    let error = []
    await validate(req,res,error);
    if (error.length > 0) {
        return res.status(400).json({ error })
    }
    next();
}

exports.validateGeolocation = async (req,res,next) => {
    let error = []
    const {longitude,latitude} = req.query
    if (longitude <= -180 || longitude >= 180) {
        error.push('Invalid longtitude')
    }
    if (latitude <=-90 || latitude >=90) {
        error.push('Invalid latitude')
    }
    if (error.length > 0) {
        return res.status(400).json({ error })
    }
    next();
}

async function validate (req,res,error) {
    const data = await DoctorData.find({})
    const { speciality, title } = data[0]
    let { name, lastname, email, specialities, titles, phoneno ,currentCity } = req.body;
    let i = 0;
    let j = 0;
    if (typeof (specialities) === 'string') {

        specialities = new Array(specialities)
    }
    if (typeof (titles) === 'string') {

        titles = new Array(titles)
    }
    if (currentCity) {
        
        req.body.currentCity =currentCity.toLowerCase().replace(/\s/g, '')
    }
    specialities = specialities.map(s => s.toLowerCase().replace(/\s/g, ''))
    req.body.specialities = specialities
    titles = titles.map(s => s.toLowerCase().replace(/\s/g, ''))
    req.body.titles = titles
    if (!name.match(stringPatt) || !lastname.match(stringPatt)) {
        error.push('Invalid Name OR Lastname')
    }
    if (!email.match(emailPatt)) {
        error.push('Invalid email')
    }

    if (phoneno.length !== 10 || !phoneno.match(numberPatt)) {
        error.push('Invalid phone number')
    }

    speciality.forEach(s => {
        if (specialities.indexOf(s.toLowerCase().replace(/\s/g, '')) >= 0) {
            i++
        }
    });
    if (i !== specialities.length) {
        error.push('Invalid Speciality')
        // i = 0;
    }

    title.forEach(s => {
        if (titles.indexOf(s.toLowerCase().replace(/\s/g, '')) >= 0) {
            j++
        }
    });
    if (j !== titles.length) {
        error.push('Invalid Title')
        // i = 0;
    }
    return error;
    
    
}
