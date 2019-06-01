const express = require('express')
const router = express.Router()
const { getDoctors, getDoctor, doctorById, deleteDoctor, updateDoctor, addprofilePicture, addLocation} = require('../../controllers/doctor/doctor')
const {authenticator,hasAuthorization } = require('../../controllers/doctor/auth')
const { validateDoctorUpdateData, validateGeolocation} = require('../../validator')


router.get('/getDoctors',getDoctors)

router.route('/doctor/:id')
        .get(getDoctor)
        .delete(authenticator,hasAuthorization,deleteDoctor)
        .put(authenticator, hasAuthorization, validateDoctorUpdateData,updateDoctor)

router.put('/doctor/addProfilePicture/:id', authenticator, hasAuthorization, addprofilePicture)
router.put('/doctor/addLocation/:id/', validateGeolocation, authenticator, hasAuthorization,addLocation)


router.param('id', doctorById)
module.exports = router