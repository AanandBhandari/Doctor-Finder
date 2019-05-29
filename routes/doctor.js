const express = require('express')
const router = express.Router()
const {allDoctors} = require('../controllers/doctor')
const {authenticater } = require('../controllers/auth')


router.get('/getDoctors',authenticater,allDoctors)
module.exports = router