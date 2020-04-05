const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    firstName: String,
    lastName: String,
    bio: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('director', DirectorSchema);