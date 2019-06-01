const express = require('express')
const router = express.Router()
const { signup, signin, emailverify } = require('../../controllers/user/auth')
const { validateUserSignup, validateUserSignin } = require('../../validator/user')
router.post('/user/signup', validateUserSignup, signup)
router.get('/user/emailVerify', emailverify)
router.post('/user/signin', validateUserSignin, signin)
module.exports = router