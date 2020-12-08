const multer = require("multer");

//multer function to get filename
var storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});

//filters file before upload
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
        // if (file.mimetype) {
        req.uploadError = "Only image files are allowed!";
        cb(null, false)
    }
    else { cb(null, true); }
};

const upload = multer({ storage: storage, fileFilter: imageFilter });
const imageMulter = upload.single("image")

module.exports = {
    imageMulter

}