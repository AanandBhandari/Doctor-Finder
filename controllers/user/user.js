const User = require('../../models/User')
const Doctor = require('../../models/Doctor')
const Reviews = require('../../models/Reviews')
const formidable = require("formidable");
const fs = require("fs");
const {calculateDistance} = require('../../helper/geoDistance')
const perPage = 10
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
    const page = req.query.page || 1
    
    try {
        const users = await User.find({})
        .skip((perPage*page)-perPage)
        .limit(perPage)
        .select("name lastname email phoneno currentCity avatar location")
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
            res.set(("Content-Type", req.profile.avatar.contentType))
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
    const page = req.query.page || 1
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
    .skip((perPage * page) - perPage)
    .limit(perPage)
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

exports.getDoctorBySpecialities = (req,res) => {
    const page = req.query.page || 1
    Doctor.find({ specialities: {$in : req.query.specialities}})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .select("name lastname email phoneno currentCity specialities titles website location")
        .then(doctors=> res.json(doctors))
        .catch(e => res.status(400).json(e))
}
exports.getDoctorByCity =(req,res) => {
        const page = req.query.page
        const city = req.query.city.toLowerCase().replace(/\s/g, '')
        Doctor.find({currentCity : city })
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .select("name lastname email phoneno currentCity specialities titles website location")
            .then(doctors => res.json(doctors))
            .catch(e => res.status(400).json('doctor not found'))
}

exports.reviewDoctor = (req,res) => {
       Doctor.findById(req.query.id).then(doctor => {
           const review = new Reviews({
               user: req.user,
               comment: req.body.comment,
               star: req.body.star
           })
           doctor.reviews.push(review)
           doctor.save().then(savedDoctor => {
               review.save().then(savedReview => {
                   res.json(savedReview)
               })
               .catch(err=> res.status(400).json('cannot saved review'))
           })
       }).catch(e => res.status(400).json('Doctor not found'))
    
}

exports.editReview = (req,res) => {
    // res.send('helloworld')
    // edit review by cmt id
    // Reviews.findOneAndUpdate({_id:req.query.id},{$set:{comment:req.body.comment,star : req.body.star}})
    // .then(review =>res.json(review))
    // .catch(e=>res.json('unauthorized'))
    Reviews.findById(req.query.id)
    .then(review=>{
        if (review.user.equals(req.user._id)) {
            review.comment = req.body.comment
            review.star = req.body.star
            review.save()
            .then(r=>res.json(r))
            .catch(e => res.status(400).json(e))
        } else {
            res.status(401).json('Unauthorized user')
        }
    })
    .catch(e=>res.status(400).json('This review does not exit'))
}

exports.deleteReview = (req,res) => {
    Reviews.findById(req.query.id)
        .then(review => {
            if (review.user.equals(req.user._id)) {
                Doctor.findOneAndUpdate({ reviews: review._id }, { $pull: { reviews: review._id } })
                .then(drReview=>{
                    review.remove()
                        .then(r => {
                            res.json('review')
                        })
                        .catch(e => res.status(400).json(e))
                })
                .catch(e=>res.status(400).json('this review does not exit'))
            } else {
                res.status(401).json('Unauthorized user')
            }
        })
        .catch(e => res.status(400).json('This review does not exit'))
}

