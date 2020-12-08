const mongoose = require('mongoose');

// file
const Apartment = require('../../db/model/apartment')

module.exports = class ApartmentController {

    // check if apartment is already save, if not then save
    static async createApartment(req, res, next) {
        const { user } = req.user
        console.log(user)
        try {
            const apartment = new Apartment({ ...req.body, _id: mongoose.Types.ObjectId(), author: user._id })
            if (!apartment) return res.status(400).json({ msg: 'flll in the input before submission ' })
            const newApartment = await apartment.save();
            res.status(200).json(newApartment)
        } catch (error) {
            console.log(error)
            res.status(400).json({ msg: 'apartment creation failed' })
        }
    }


    // get and apartment id before it can be marked
    static async getSingleApartment(req, res, next) {
        const { params: { apartmentId } } = req;
        try {

            const apartment = Apartment.findById({ _id: apartmentId })
            if (!apartment) return res.status(400).json({ msg: 'apartment is not found' })
            const chosenApartment = await apartment
            res.status(200).json(chosenApartment)
        } catch (error) {
            console.log(error)
            res.status(400).json(error)
        }
    }

}