const express = require('express')
const router = express.Router()
const { getDoctors, getDoctor, doctorById, deleteDoctor} = require('../../controllers/doctor/doctor')
const {authenticater,hasAuthorization } = require('../../controllers/doctor/auth')


router.get('/getDoctors',authenticater,getDoctors)

router.route('/doctor/:id')
        .get(authenticater,getDoctor)
        .delete(authenticater,hasAuthorization,deleteDoctor)


router.param('id', doctorById)
module.exports = router