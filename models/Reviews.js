
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reviewSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: {
        type : String,
        trim : true
    },
    star : {
        type : String,
        trim : true,
        enum : ['1','2','3','4','5']
    }
});
module.exports = mongoose.model('reviews', reviewSchema);