const emailPatt = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
const stringPatt = /^[a-zA-Z]+$/;
const numberPatt = /^[0-9]+$/;
exports.validateDoctorSignup= async(req,res,next) => {
    const DoctorData = require('../models/DoctorData')
    const data =await DoctorData.find({})
    const {speciality,title} = data[0]
    let { name, lastname, email, password, specialities, titles, phoneno} = req.body;
    const error = [];
    let i = 0;
    let j = 0;
    specialities=specialities.map(s => s.toLowerCase().replace(/\s/g, ''))
    titles=titles.map(s => s.toLowerCase().replace(/\s/g, ''))
    if (!name.match(stringPatt) || !lastname.match(stringPatt)) {
        error.push('Invalid Name OR Lastname')
    }
    if (!email.match(emailPatt)) {
        error.push('Invalid email')
    }
    if(password.length<8){
        error.push('Password lenght should not be less than 8')
    }
    if (phoneno.length !== 10 || !phoneno.match(numberPatt)) {
        error.push('Invalid phone number')   
    }

    speciality.forEach(s => {
        if(specialities.indexOf(s.toLowerCase().replace(/\s/g, '')) >= 0){
            i++
        }});
    if (i !== specialities.length ) {
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
    if(error.length>0) {
        return res.status(400).json({error})
    }
    next();
}