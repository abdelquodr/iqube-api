const express = require('express')

// files
const UserMiddleware = require('../middleware/userMiddleware')
const UserController = require('../controller/userController')

const userRouter = express.Router();

userRouter.post('/sign-up', ...UserMiddleware.validateUser(), UserController.registerUser)
userRouter.post('/sign-in', ...UserMiddleware.validatelogin(), UserController.loginUser)


module.exports = userRouter