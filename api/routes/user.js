const express = require("express")
const router = express.Router()
const {signup, login} = require("../controllers/user")
const upload = require("../middlewares/multer")

router.post("/signup", signup)
router.post("/login", login)

router.post("/upload", upload.single('picture'), (req, res) => {
    if (req.file){
        const file = req.file
        res.status(200).json(file.filename)
    } else res.status(200).json(null)
})

module.exports = router