const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, '`{PATH}` field is required!'],
        minlength: [3, '`{PATH}` field (`{VALUE}`) should be more then ({MINLENGTH}) character'],
        maxlength: [15, '`{PATH}` field (`{VALUE}`) should be less then ({MAXLENGTH}) character']
    },
    category: { 
        type: String,
        minlength: 1,
        maxlength: 30
    },
    country: {
        type: String,
        minlength: 1,
        maxlength: 30
    },
    year: {
        type: Number,
        min: 1900,
        max: 2040
    },
    imdb_score: {
        type: Number,
        min: 0,
        max: 10
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movie', MovieSchema);