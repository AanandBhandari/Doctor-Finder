const mongoose = require("mongoose");
const crypto = require("crypto");
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
        type : Boolean,
        default : false
    }
})

doctorSchema.pre('save',function(next){
    let doctor = this;
    if (doctor.isModified('password')) {
        // salt
        let ranStr = function () {
            return crypto.randomBytes(Math.ceil(8))
                .toString('hex')
                .slice(0, 16);
        };
        // applying sha512 alogrithm
        let sha512 = function (password, salt) {
            let hash = crypto.createHmac('sha512', salt);
            hash.update(password);
            let value = hash.digest('hex');
            return {
                salt: salt,
                passwordHash: value
            };
        };
        function saltHashPassword(doctorpassword) {
            let salt = ranStr(16); 
            let passwordData = sha512(doctorpassword, salt);
            doctor.password = passwordData.passwordHash;
            doctor.salt = passwordData.salt;
        }
        saltHashPassword(doctor.password)
        next();
    } else {
        next();
    }
})

module.exports = mongoose.model("Doctor", doctorSchema);