const express = require('express')
const router = express.Router()
const { getUsers, getUser, userById, deleteUser, updateUser, addprofilePicture, addLocation, getDoctorsByLocation, getDoctorBySpecialities, getDoctorByCity, getDoctorBySymptoms, reviewDoctor, editReview, deleteReview} = require('../../controllers/user/user')
const { authenticator, hasAuthorization } = require('../../controllers/user/auth')
const { validateUserUpdateData, validateGeolocation, validateSpecialities} = require('../../validator/user')

router.get('/getUsers', getUsers)

router.put('/user/addProfilePicture/:id', authenticator, hasAuthorization, addprofilePicture)
router.put('/user/addLocation/:id/', validateGeolocation, authenticator, hasAuthorization, addLocation)

// looks for doctors
// by geolocation 
router.get('/user/getDoctorsByGeoLocation/:id',validateGeolocation,authenticator,hasAuthorization,getDoctorsByLocation)
// by specialities
router.get('/user/getDoctorBySpecialities', validateSpecialities , getDoctorBySpecialities)
// by city 
router.get('/user/getDoctorByCity', getDoctorByCity)
// search doctors by symptoms
router.get('/user/getDoctorBySymptoms', getDoctorBySymptoms)

// review doctor
router.post('/user/reviewDoctor',authenticator,reviewDoctor)
router.put('/user/editReview',authenticator,editReview) // noHasAuthorization bcoz user will only edit review
router.delete('/user/deleteReview',authenticator,deleteReview)// hasauthorization ischecked in controller

router.route('/user/:id')
.get(getUser)
.delete(authenticator, hasAuthorization, deleteUser)
.put(authenticator, hasAuthorization, validateUserUpdateData, updateUser)

router.param('id', userById)
module.exports = router