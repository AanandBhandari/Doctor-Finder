const express = require('express')
const router = express.Router()
const { getUsers, getUser, userById, deleteUser, updateUser, addprofilePicture, addLocation, getDoctorsByLocation, getDoctorBySpecialities, getDoctorByCity} = require('../../controllers/user/user')
const { authenticator, hasAuthorization } = require('../../controllers/user/auth')
const { validateUserUpdateData, validateGeolocation, validateSpecialities} = require('../../validator/user')


router.get('/getUsers', getUsers)

router.route('/user/:id')
    .get(getUser)
    .delete(authenticator, hasAuthorization, deleteUser)
    .put(authenticator, hasAuthorization, validateUserUpdateData, updateUser)

router.put('/user/addProfilePicture/:id', authenticator, hasAuthorization, addprofilePicture)
router.put('/user/addLocation/:id/', validateGeolocation, authenticator, hasAuthorization, addLocation)

// looks for doctors
// by geolocation 
router.get('/user/getDoctorsByGeoLocation/:id',validateGeolocation,authenticator,hasAuthorization,getDoctorsByLocation)
// by specialities
router.get('/user/getDoctorBySpecialities/:id', validateSpecialities, authenticator, hasAuthorization, getDoctorBySpecialities)
// by city
router.get('/user/getDoctorByCity', getDoctorByCity)

router.param('id', userById)
module.exports = router