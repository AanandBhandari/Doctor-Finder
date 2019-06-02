const User = require('../../models/User')
const Doctor = require('../../models/Doctor')
const formidable = require("formidable");
const fs = require("fs");
const {calculateDistance} = require('../../helper/geoDistance')

exports.userById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("name lastname email phoneno currentCity avatar location")
        if (user) {
            req.profile = user
            return next();
        }
        throw 'User not found'
    } catch (error) {
        res.status(400).json(error)
    }
}
exports.getUser = async (req, res) => {
    res.json(req.profile)
}

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("name lastname email phoneno currentCity avatar location")
        if (users) {

            return res.status(200).json(users)
        }
        throw 'No Users found'
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await req.profile.remove();
        if (deletedUser) {

            return res.json({ message: "User deleted successfully" });
        }
        throw 'User not found'
    } catch (error) {
        res.status(400).json(error)
    }
}
exports.updateUser = async (req, res) => {
    try {
        const { name, lastname, email, phoneno, currentCity } = req.body
        req.profile.name = name
        req.profile.lastname = lastname
        req.profile.email = email
        req.profile.phoneno = phoneno
        req.profile.currentCity = currentCity
        const updateuser = req.profile.save()
        if (updateuser) {
            return res.json({ message: 'User updated successfully' })
        }
        throw 'Could not be updated'
    } catch (error) {
        res.status(400).json({ error })
    }
}

exports.addprofilePicture = async (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Photo could not be uploaded"
            });
        }
        if (files.photo) {
            req.profile.avatar.data = fs.readFileSync(files.photo.path);
            req.profile.avatar.contentType = files.photo.type;
        }
        req.profile.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result.avatar);
        });
    })
}

exports.addLocation = async (req, res) => {
    try {
        const { longitude, latitude } = req.query
        location = {
            type: "Point",
            coordinates: [longitude, latitude]
        }
        req.profile.location = location
        const result = await req.profile.save()
        if (result) {
            return res.json(result.location);
        }
        throw 'unable to save location'
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.getDoctorsByLocation = (req,res) => {
    Doctor.find({
        location: {
            $near: {
                $maxDistance: 1000*req.query.d,
                $geometry: {
                    type: "Point",
                    coordinates: req.profile.location.coordinates
                }
            }
        }
    })
    .select("name lastname email phoneno currentCity specialities titles website location")
    .lean()
        .then(results => {
            if (results) {
                let result = results.map(el=> {
                    el.d =calculateDistance(req.profile.location.coordinates[0], req.profile.location.coordinates[1], el.location.coordinates[0], el.location.coordinates[1]);
                    return el;
                })
                res.json(result)
            }
        }).catch(error=>{
            res.status(400).json(error);
        })
    
}

exports.getDoctorBySpecialities = async(req,res) => {
    Doctor.find({ specialities: {$in : req.query.specialities}})
        .select("name lastname email phoneno currentCity specialities titles website location")
        .then(doctors=> res.json(doctors))
        .catch(e => res.status(400).json(e))
}