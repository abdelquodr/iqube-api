const express = require('express');


// files
const UserMiddleware = require('../middleware/userMiddleware')
const ApartmentMiddleware = require('../middleware/apartmentMiddleware')
const ApartmentController = require('../controller/apartmentController')

const apartmentRouter = express.Router()

apartmentRouter.post('/create-apartment', UserMiddleware.verifyToken, ...ApartmentMiddleware.validateApartment(), ApartmentController.createApartment)
apartmentRouter.get('/:apartmentId', ApartmentController.getSingleApartment)
// apartmentRouter.get('/:apartment_id', )

module.exports = apartmentRouter