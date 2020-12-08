const { body, validationResult } = require('express-validator');


module.exports = class ApartmentMiddleware {

    // check for and validate user input for apartment
    static validateApartment() {
        return [
            body('address').exists().withMessage('address is required'),
            body('NumOfRooms').exists().withMessage('number of rooms is required'),
            (req, res, next) => {
                console.log('successful')
                const error = validationResult(req);
                if (!error.isEmpty()) return res.status(400).json(error)
                next()
            }
        ]
    }
}