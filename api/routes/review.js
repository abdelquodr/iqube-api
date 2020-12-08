const express = require('express');

// files
const ReviewMiddleware = require('../middleware/reviewMiddleware')
const ReviewController = require('../controller/reviewController')
const { imageMulter } = require("../../helper/multer")
const UserMiddleware = require('../middleware/userMiddleware')

const reviewRouter = express.Router()

reviewRouter.post('/:apartmentId', UserMiddleware.verifyToken, imageMulter, ...ReviewMiddleware.userReview(), ReviewController.review)

module.exports = reviewRouter