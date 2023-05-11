const multer = require('multer');

const ALLOWED_FILE_TYPES = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
    'image/gif': 'gif',
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/attachments');
    },
    filename: (req, file, cb) => {
        const ext = ALLOWED_FILE_TYPES[file.mimetype];
        const name = file.originalname.split('.')[0];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, name + '-' + uniqueSuffix + '.' + ext);
    },
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(ALLOWED_FILE_TYPES[file.mimetype] != undefined){
            cb(null, true);
        }else{
            req.fileValidationError = "Forbidden extensions";
            return cb(null, false);
        }
    }
 }).single('attachment');

module.exports = upload;

