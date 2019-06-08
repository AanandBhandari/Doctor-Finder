const Doctor = require('../../models/Doctor')
const Reviews = require('../../models/Reviews')
const formidable = require("formidable");
const fs = require("fs");
const perPage = 10
exports.doctorById = async (req,res,next) => {
    try {
        const doctor = await Doctor.findById(req.params.id).select("name lastname email phoneno website specialities titles currentCity avatar location reviews")
        if (doctor) {
           req.profile = doctor
           return next();
        }
        throw 'Doctor not found'
    } catch (error) {
        res.status(400).json(error)
    }
}
exports.getDoctor = async (req,res) => {
    res.json(req.profile)
}

exports.getDoctors =async (req,res) => {
    const page = req.query.page||1
    try {
        const doctors = await Doctor.find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .select("name lastname email phoneno website specialities titles currentCity avatar location")
       if (doctors) {
           
          return res.status(200).json(doctors)
       }
       throw 'No Doctors found'
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.deleteDoctor = async(req,res) => {
    try {
       const deletedDoctor = await req.profile.remove();
       if (deletedDoctor) {
           
           return res.json({ message: "Doctor deleted successfully" });
       }
        throw 'Doctor not found'
    } catch (error) {
        res.status(400).json(error)
    }
}
exports.updateDoctor = async(req,res) => {
    try {
        const { name, lastname, email, phoneno, website, specialities, titles,currentCity} = req.body
        req.profile.name = name 
        req.profile.lastname = lastname
        req.profile.email = email 
        req.profile.phoneno = phoneno
        req.profile.website = website
        req.profile.specialities = specialities
        req.profile.titles = titles
        req.profile.currentCity = currentCity
        const updatedoctor = req.profile.save()
       if(updatedoctor) {
           return res.json({message : 'Doctor updated successfully'})
       }
       throw 'Could not be updated'
    } catch (error) {
        res.status(400).json({error})
    }
}

exports.addprofilePicture = async(req,res) => {
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

exports.addLocation = async (req,res) => {
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

exports.getReviews = (req, res) => {
    const page = req.query.page||1
    const doctor = req.profile;
    Reviews.find({_id : {$in : doctor.reviews}})
    .skip((perPage * page) - perPage)
    .limit(perPage)
    .then(reviews=> {
        res.json(reviews)
    })
    .catch(e=>res.json('No reviews'))
}

exports.deleteReview = (req,res) => {
    Reviews.findById(req.query.id)
        .then(review => {
            console.log(req.profile.reviews.includes(review._id))
                Doctor.findOneAndUpdate({ reviews: review._id }, { $pull: { reviews: review._id } })
                    .then(drReview => {
                        review.remove()
                            .then(r => {
                                res.json('review deleted')
                            })
                            .catch(e => res.status(400).json(e))
                    })
                    .catch(e => res.status(400).json('this review does not exit'))
        })
        .catch(e => res.status(400).json('This review does not exit'))
}