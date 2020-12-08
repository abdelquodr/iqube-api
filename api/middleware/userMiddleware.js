const { body, validationResult } = require('express-validator')

// file
const AuthHelper = require('../../helper')

module.exports = class UserMiddleware {

    // check and validate incoming user input
    static validateUser() {
        return [
            body('firstname').exists().withMessage('firstname is required'),
            body('lastname').exists().withMessage('lastname is required'),
            body('email').exists().matches(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/).withMessage('invalid email type'),
            body('password').exists().isLength({ min: 6 }).withMessage('password should be 6 at least characters'),
            (req, res, next) => {
                const error = validationResult(req);
                if (!error.isEmpty()) res.status(400).json(error);
                next();
            }
        ]
    };


    // check if the user-login input is in correct format
    static validatelogin() {
        return [
            body('email').exists().withMessage('registation mail is required'),
            body('password').exists().withMessage('password must be at least 6 characters'),
            (req, res, next) => {
                console.log(req.file)
                const error = validationResult(req);
                if (!error.isEmpty()) res.status('400').json(error);
                next();
            }
        ]
    };


    // verify user token passed from the login middleware
    static async verifyToken(req, res, next) {
        const { authorization: BearerToken } = req.headers;
        if (!BearerToken) return res.status(400).json({ message: 'Empty user Validation certificate' })
        const [, token] = BearerToken.split(' ');
        try {
            req.user = await AuthHelper.verifyToken(token)
            console.log('login successful')
            next()
        } catch (error) {
            res.status(400).json({ message: 'Invalid user validation certificate' })
        }
    }


}