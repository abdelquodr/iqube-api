const express = require('express');

// files
const userRouter = require('./user')
const apartmentRouter = require('./apartment')
const reviewRouter = require('./review')


const v1Routes = express()

v1Routes.use('/user', userRouter)
v1Routes.use('/apartment', apartmentRouter)
v1Routes.use('/review', reviewRouter)


module.exports = v1Routes