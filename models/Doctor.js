const mongoose = require("mongoose");
const crypto = require("crypto");
const pointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point']
    },
    coordinates: {
        type: [Number]
    }
});
const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    lastname : {
        type : String,
        trim : true,
        required : true
    },
    currentCity : {
        type : String,
        trim : true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    location: {
        type: pointSchema,
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    salt : {
        type : String
    },
    specialities : [{
        type : String,
        required : true,
    }],
    titles : [{
        type : String,
        required : true
    }],
    description : {
        type : String,
    },
    website : {
        type : String
    },
    phoneno : {
        type : Number
    },
    created: {
        type: Date,
        default: Date.now
    },
    isRegistred : {
        type : Boolean
    }
})

// We index on location and let mongoDB know we are using a “2dsphere”.
// doctorSchema.index({ location: "2dsphere" });

const sha512 = function (password, salt) {
    let hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    let value = hash.digest('hex');
    return {
        passwordHash: value
    };
};
doctorSchema.pre('save',function(next){;
    let doctor = this;  
    if (doctor.isModified('password')) {
        // salt
        const ranStr = function () {
            return crypto.randomBytes(Math.ceil(8))
                .toString('hex')
                .slice(0, 16);
        };
        // applying sha512 alogrithm
            let salt = ranStr(16); 
            let passwordData = sha512(doctor.password, salt);
            doctor.password = passwordData.passwordHash;
            doctor.salt = salt;
        next();
    } else {
        next();
    }
})
doctorSchema.statics.findByCredentials = async function (email,password) {
    let Doctor = this;
        const doctor =await Doctor.findOne({ email })
        if (doctor) {
            let passwordData = sha512(password, doctor.salt)
            if (passwordData.passwordHash == doctor.password) {
                return doctor
            }
        }
        throw 'Invalid email or password'
    }
    
module.exports = mongoose.model("Doctor", doctorSchema);