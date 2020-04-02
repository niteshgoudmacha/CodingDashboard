const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

router.post('/register',  async (req, res) => {
    console.log(req.body);
    const { fullname, username, email, collegeName, branch, presentYear, codechefId, codeforcesId, hackerrankId } = req.body;
    const check = await User.findOne({ email });
    if(check) {
        res.status(400).send({ message: "Email already exists"});
    }
    const user = new User({
        fullname,
        email,
        username,
        password: User.hashPassword(req.body.password),
        collegeName,
        branch,
        presentYear,
        codechefId,
        codeforcesId,
        hackerrankId,
        createdDate: Date.now()
    });

    try {
        let userRecord = await user.save();
        console.log(userRecord);
        return res.status(200).send(userRecord);
    } catch(err) {
        console.log(err);
        return res.status(501).json({message: "error registering user, please try again"});
    }
});

router.post('/login', async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.findOne({email: req.body.email}).exec();
        if(!user) {
            return res.status(200).json({message: "email not registered, please register"});
        }
        console.log(user);
        if(user.isValid(user.password, req.body.password)) {
            // generate token
            console.log('true--');
            const token = jwt.sign({username: user.username, id: user._id}, 'HalwaJay', { expiresIn: '18h'});
            return res.status(200).json(token);
        }
        else {
            return res.status(401).json({message: "Invalid Credentials"});
        }
    } catch(error) {
        console.log('error', error);
        return res.status(501).json({ message: "Internal Server Error"});
    }
    
});

var decodedToken = '';
function verifyToken(req, res, next) {
    var token = req.headers.token;
    // console.log('token', req.headers);
    jwt.verify(token, 'HalwaJay', (err, tokenData) => {
        if(err && err.name === 'TokenExpiredError') {
            return res.status(201).json({message: err.name});
        }
        if(err) {
            console.log('err = ', err);
            return res.status(404).json({message: 'Unauthorized request'});
        }
        if(tokenData) {
            decodedToken = tokenData;
        }
        next();
    });
}

router.get('/profile', verifyToken, async (req, res) => {
    console.log('username\n');
    try {
        const user = await User.findById({ _id: decodedToken.id }, { password: 0, _id: 0, _v: 0 });
        if(!user) {
            res.status(404).send({ message: 'user not found'});
        }
        res.status(200).send(user);
    } catch (err) {
        console.log(err);
        return res.status(501).json({ message: "Internal Server Error"});
    }
    // return res.status(200).json(decodedToken.username);
});

router.get('/getUsernames', verifyToken, async (req, res) => {
    try {
        const usernames = await User.find({}, {username: 1});
        if(!usernames) {
            res.status(404).send({ message: 'users not found'});
        }
        res.status(200).send(user);
    } catch (err) {
        console.log(err);
        return res.status(501).json({ message: "Internal Server Error"});
    }
});

router.post('/update/profile', verifyToken, async (req, res) => {
    try {
        console.log('body = ', req.body);
        const { fullname, hackerrankId, codechefId, codeforcesId } = req.body; 
        const user = await User.findOneAndUpdate(
                { _id: decodedToken.id }, 
                { $set: { fullname, hackerrankId, codechefId, codeforcesId}},
            );
        if(user) {
            return res.status(200).send(user);
        }
        return res.status(404).send({ message: "user not found"});

    } catch (err) {
        console.log(err);
        return res.status(501).send({message: "internal server error"});
    }
});

module.exports = router;