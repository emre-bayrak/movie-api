const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    firstName: {
        type: String,
        minlength: 2,
        maxlength: 60
    },
    lastName: {
        type: String,
        minlength: 2,
        maxlength: 60
    },
    bio: {
        type:String,
        minlength: 60,
        maxlength: 1000
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('director', DirectorSchema);