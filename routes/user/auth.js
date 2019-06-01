const express = require('express')
const router = express.Router()
const { signup, signin, emailverify } = require('../../controllers/user/auth')
const { validateUserSignup, validateUserSignin } = require('../../validator/user')
router.post('/signup', validateUserSignup, signup)
router.get('/emailVerify', emailverify)
router.post('/signin', validateUserSignin, signin)
module.exports = router