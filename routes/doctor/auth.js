const express = require('express')
const router = express.Router()
const { signup, signin, emailverify, authenticater} = require('../../controllers/doctor/auth')
const {validateDoctorSignup,validateDoctorSignin} = require('../../validator/index')
router.post('/doctor/signup',validateDoctorSignup,signup)
router.get('/doctor/emailVerify',emailverify)
router.post('/doctor/signin', validateDoctorSignin, signin)
module.exports = router
