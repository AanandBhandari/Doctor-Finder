const express = require('express')
const router = express.Router()
const { getDoctors, getDoctor, doctorById, deleteDoctor, updateDoctor, addprofilePicture, addLocation, getReviews, deleteReview, getPhoto, doctorDataSpecialities} = require('../../controllers/doctor/doctor')
const {authenticator,hasAuthorization } = require('../../controllers/doctor/auth')
const { validateDoctorUpdateData, validateGeolocation} = require('../../validator')

router.get('/doctorDataSpecialities', doctorDataSpecialities)
router.get('/getDoctors',getDoctors)
router.get('/getReviews/:id', getReviews)
router.delete('/deleteReview/:id',authenticator, hasAuthorization,deleteReview)

router.put('/doctor/addProfilePicture/:id', authenticator, hasAuthorization, addprofilePicture)
router.put('/doctor/addGeoLocation/:id/', validateGeolocation, authenticator, hasAuthorization,addLocation)
router.get('/doctor/photo/:id',getPhoto)

router.route('/doctor/:id')
        .get(getDoctor)
        // need to delete reviews too
        .delete(authenticator,hasAuthorization,deleteDoctor)
        .put(authenticator, hasAuthorization, validateDoctorUpdateData,updateDoctor)


router.param('id', doctorById)
module.exports = router