const multer = require("multer")

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/public/user-pictures')
    },
    filename: (req, file, cb) => {
        const uniquePrefix = Date.now() + '-user-' + file.fieldname
        const extension = MIME_TYPES[file.mimetype]
        cb(null, uniquePrefix + '.' + extension)
    }
})

const upload = multer({storage: storage})

module.exports = upload