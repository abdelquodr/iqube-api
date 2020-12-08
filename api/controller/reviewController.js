const mongoose = require('mongoose');
const cloudinary = require("../../helper/cloudinary")

// files
const Review = require('../../db/model/reviews')
const Images = require("../../db/model/image")
const Video = require('../../db/model/video')



module.exports = class ReviewController {

    // saving user review to the database
    static async review(req, res, next) {
        console.log('>>>>>>>>>>>> I entered <<<<<<<<<<<<<')
        const { param: { apartmentId } } = req;
        let review;
        let image;
        let video;
        try {
            if (req.user) {
                review = new Review({ ...req.body, _id: mongoose.Types.ObjectId(), user_id: req.user.user._id, apartment_id: apartmentId });
                if (!review) return res.status(400).json({ msg: 'something went wrong' });
                // upload images to cloudinary if file is uploaded
                console.log(req.file)
                if (req.file.mimetype === 'image/png' || req.file.mimetype === 'image/jpg' || req.file.mimetype === 'image/gif') {
                    console.log(req.file)
                    await cloudinary.v2.uploader.upload(req.file.path, { folder: "images" },
                        (err, result) => {
                            if (err) console.log(err);
                            image = new Images({ review_id: review._id, url: result.secure_url })

                        })
                    res.status(200).json({ review, image })
                }
                if (req.file.mimetype === 'video/mp4') {
                    console.log(req.file)
                    await cloudinary.v2.uploader.upload_large(req.file.path, {
                        resource_type: "video",
                        public_id: "my_folder/my_sub_folder/dog_closeup",
                        chunk_size: 6000000,
                    },
                        (err, result) => {
                            if (err) console.log(err);
                            video = new Video({ review_id: review._id, url: result.secure_url })

                        })
                    res.status(200).json({ review, video })
                }

            } else {
                review = new Review({ ...req.body, _id: mongoose.Types.ObjectId(), apartment_id: apartmentId });
                if (!review) return res.status(400).json({ msg: 'something went wrong' });
                res.status(200).json(review)
            }

        } catch (error) {
            console.log(error)
            res.status(400).json({ error: error })
        }
    }
}



// fvympylf
