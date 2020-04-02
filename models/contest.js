const mongoose = require('mongoose');

const contestSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    url: {
        type: String,
        required: true
    },
    problemsSolved: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
});

module.exports = contestSchema;
