const express = require('express')
const router = express.Router()
const {signup} = require('../controllers/auth')
const {validateDoctorSignup} = require('../validator/index')
router.post('/signup',validateDoctorSignup,signup)
module.exports = router
