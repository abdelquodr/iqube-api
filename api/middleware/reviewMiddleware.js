const { body, validationResult } = require('express-validator')

module.exports = class ReviewMiddleware {

    // user can review with optional videos or images
    static userReview() {
        return [
            body('review').exists().withMessage('your review is required'),
            body('upvote').exists().withMessage('its optional'),
            (req, res, next) => {
                const error = validationResult(req)
                if (!error) res.status(400).json(error);
                next()
            }
        ]
    }


    // random visitor can upvote only upvote


}