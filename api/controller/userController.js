const { body } = require('express-validator');
const mongoose = require('mongoose')


// files
const User = require('../../db/model/user')
const AuthHelper = require('../../helper')


module.exports = class UseController {

    // register new user and save to the database
    static async registerUser(req, res, next) {
        const { email, password } = req.body;
        try {

            req.body.password = await AuthHelper.hashPassword(password)
            const user = await User.find({ email: email })
            if (!user) return res.status(400).json({ message: 'user already exist' })
            const newUser = new User({ ...req.body, _id: mongoose.Types.ObjectId() })
            newUser.save();
            const userObject = newUser.toJSON();
            delete userObject._id; delete userObject.password;
            res.status(201).json(userObject);

        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'registration failed'
            })
        }
    }


    // login user after verification from the database
    static async loginUser(req, res, next) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: 'Invalid email or password' });
            const userObject = user.toJSON();
            const verified = AuthHelper.verifyPassword(password, user.password);
            if (!verified) return res.status(400).json({ message: 'Invalid email or password' });
            userObject.token = await AuthHelper.signInToken({ user })
            delete userObject.password
            res.status(201).json(userObject)
        } catch (error) {
            res.status(400).json({ message: 'signIn error' })
        }
    }

}