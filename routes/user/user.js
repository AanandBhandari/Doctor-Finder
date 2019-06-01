const express = require('express')
const router = express.Router()
const { getUsers, getUser, userById, deleteUser, updateUser, addprofilePicture, addLocation } = require('../../controllers/user/user')
const { authenticator, hasAuthorization } = require('../../controllers/user/auth')
const { validateUserUpdateData, validateGeolocation } = require('../../validator/user')


router.get('/getUsers', getUsers)

router.route('/doctor/:id')
    .get(getUser)
    .delete(authenticator, hasAuthorization, deleteUser)
    .put(authenticator, hasAuthorization, validateUserUpdateData, updateUser)

router.put('/doctor/addProfilePicture/:id', authenticator, hasAuthorization, addprofilePicture)
router.put('/doctor/addLocation/:id/', validateGeolocation, authenticator, hasAuthorization, addLocation)


router.param('id', userById)
module.exports = router