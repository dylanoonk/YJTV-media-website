const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|MOV|mov|MP4|mp4|mkv|MKV|svg|SVG)$/)) {
        req.fileValidationError = 'Only image and video files are allowed!';
        return cb(new Error('Only image and video files are allowed!'), false);
    }
    cb(null, true);
};
exports.imageFilter = imageFilter;