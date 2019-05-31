const express = require('express')
const router = express.Router()
const { getDoctors, getDoctor, doctorById, deleteDoctor, updateDoctor, addprofilePicture, addLocation} = require('../../controllers/doctor/doctor')
const {authenticator,hasAuthorization } = require('../../controllers/doctor/auth')
const { validateDoctorUpdateData, validateGeolocation} = require('../../validator')


router.get('/getDoctors',authenticator,getDoctors)

router.route('/doctor/:id')
        .get(authenticator,getDoctor)
        .delete(authenticator,hasAuthorization,deleteDoctor)
        .put(authenticator, hasAuthorization, validateDoctorUpdateData,updateDoctor)

router.patch('/doctor/addProfilePicture/:id', authenticator, hasAuthorization, addprofilePicture)
router.patch('/doctor/addLocation/:id/', validateGeolocation, authenticator, hasAuthorization,addLocation)


router.param('id', doctorById)
module.exports = router