const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|MOV|mov|MP4|mp4|mkv|MKV|svg|SVG)$/)) {
        req.fileValidationError = 'Only image and video files are allowed!';
        return cb(new Error('Only image and video files are allowed!'), false);
    }
    cb(null, true);
};


const getFileType = function(file) {
    if (file.isDirectory()) {
        return "folder"
    }
    const ext = path.extname(file);
    switch (ext) {
        case '.jpg':
        case '.JPG':
        case '.jpeg':
        case '.JPEG':
        case '.png':
        case '.PNG':
        case '.gif':
        case '.GIF':
        case '.svg':
        case '.SVG':
            return 'image';
        case '.mov':
        case '.MOV':
        case '.mp4':
        case '.MP4':
        case '.mkv':
        case '.MKV':
            return 'video';
        default:
            return 'other';
    }
};
exports.imageFilter = imageFilter;
exports.getFileType = getFileType;