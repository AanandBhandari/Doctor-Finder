const express = require('express')
const router = express.Router()
const { getUsers, getUser, userById, deleteUser, updateUser, addprofilePicture, addLocation, getDoctorsByLocation } = require('../../controllers/user/user')
const { authenticator, hasAuthorization } = require('../../controllers/user/auth')
const { validateUserUpdateData, validateGeolocation } = require('../../validator/user')


router.get('/getUsers', getUsers)

router.route('/user/:id')
    .get(getUser)
    .delete(authenticator, hasAuthorization, deleteUser)
    .put(authenticator, hasAuthorization, validateUserUpdateData, updateUser)

router.put('/user/addProfilePicture/:id', authenticator, hasAuthorization, addprofilePicture)
router.put('/user/addLocation/:id/', validateGeolocation, authenticator, hasAuthorization, addLocation)

// looking for doctors
// by location 
router.get('/user/getDoctorsByLocation/:id',validateGeolocation,authenticator,hasAuthorization,getDoctorsByLocation)

router.param('id', userById)
module.exports = router