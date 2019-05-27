const express = require('express')
const router = express.Router()
const {signup,signin,emailverify} = require('../controllers/auth')
const {validateDoctorSignup,validateDoctorSignin} = require('../validator/index')
router.post('/signup',validateDoctorSignup,signup)
router.get('/emailVerify',emailverify)
// router.post('/signin', validateDoctorSignin, signin)
module.exports = router
