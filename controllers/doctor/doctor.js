const Doctor = require('../../models/Doctor')
const DoctorData = require('../../models/DoctorData')
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
exports.getPhoto = (req, res, next) => {
    if (req.profile.avatar.data) {
        res.set(("Content-Type", req.profile.avatar.contentType));
        return res.send(req.profile.avatar.data);
    }
    res.set(("Content-Type",'image/png'))
    // return res.json({err :'error'});
    next();
};
exports.getDoctors =async (req,res) => {
    const page = req.query.page||1
    try {
        const doctors = await Doctor.find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .select("name lastname email phoneno website specialities titles currentCity location")
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
exports.doctorData = (req, res) => {
    let text = req.query.s;
    let topic = req.query.topic
    let obj = topic === 'title' ? { "_id": 0, 'title': 1 } : { "_id": 0, 'speciality': 1 }
    let result = [];
    DoctorData.find({}, obj)
    .then(data => {
        let cases = data[0].speciality || data[0].title
            cases.forEach(a => {
                if (a.toLowerCase().indexOf(text.toLowerCase()) > -1) {
                    result.push(a)
                }
            })
            if (result) {
                if (result.length>7) result.length=7
                return res.json(result)
            }
            res.status(400).json('error..')
        })

}