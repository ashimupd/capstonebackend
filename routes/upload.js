const multer = require('multer')
const express = require('express')
const app= module.exports= express();
const path= require('path')
const auth= require('../auth/auth')

var ImagefileName = '';
var storage = multer.diskStorage({
    destination: 'upload/images',
    filename: function (req, file, callback) {
        const extension = path.extname(file.originalname);
        ImagefileName = file.fieldname + Date.now() + extension;
        callback(null, ImagefileName);

    }
});


var imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("You can upload only image files!"), false);
    }
    cb(null, true);
};

var upload = multer({
    storage: storage,
    fileFilter: imageFileFilter,
    limits: {
        fileSize: 10000000
    }
});

app.post('/image', upload.single('image'), auth, function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        image: ImagefileName
    }, null, 3));
}
)

