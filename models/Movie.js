const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: {
        type: String,
        require: true,
    },

    releaseDate: {
        type: Date,
    },

    rate: {
        type: Number,  // MongoDB natively supports storing floating-point numbers.
    },

    userId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User' 
    },
})
    

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;