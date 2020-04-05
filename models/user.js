const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ContestDetails = require('./contest');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    collegeName: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    presentYear: {
        type: Number,
        required: true
    },
    codechefId: {
        type: String,
        required: true,
        default: "Not Provided"
    },
    motto: {
        type: String,
        required: true,
        default: 'Not Provided'
    },
    hackerrankId: {
        type: String,
        required: true,
    },
    codeforcesId: {
        type: String,
        required: true,
        default: "Not Provided"
    },
    rating: {
        type: Number,
        default: 1500
    },
    highestRating: {
        type: Number,
        default: 1500
    },
    volatility: {
        type: Number,
        default: 125
    },
    stars: {
        type: Number,
        default: 1
    },
    noOfContests: {
        type: Number,
        default: 0
    },
    contestsList: [{
        contestId: {
            type: String
        },
        contestName: {
            type: String
        },
        contestUrl: {
            type: String
        },
        rank: {
            type: Number
        },
        rating: {
            type: Number
        }
    }],
    coderHouse: {
        type: String,
        default: "Beginner"
    },
    createdDate:{
        type: Date,
        default: Date.now
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
}

userSchema.methods.isValid = (hashedPassword, password) => {
    // console.log('model = ', password, hashedPassword);
    return bcrypt.compareSync(password, hashedPassword);
}

module.exports = mongoose.model('User',userSchema);