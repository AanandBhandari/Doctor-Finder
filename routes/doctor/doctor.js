const express = require('express')
const router = express.Router()
const { getDoctors, getDoctor, doctorById, deleteDoctor,updateDoctor} = require('../../controllers/doctor/doctor')
const {authenticator,hasAuthorization } = require('../../controllers/doctor/auth')
const {validateDoctorUpdateData} = require('../../validator')


router.get('/getDoctors',authenticator,getDoctors)

router.route('/doctor/:id')
        .get(authenticator,getDoctor)
        .delete(authenticator,hasAuthorization,deleteDoctor)
        .put(authenticator, validateDoctorUpdateData,hasAuthorization,updateDoctor)


router.param('id', doctorById)
module.exports = router