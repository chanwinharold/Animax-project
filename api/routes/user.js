const express = require("express")
const router = express.Router()
const {signup, login} = require("../controllers/user")
const upload = require("../middlewares/multer")

router.post("/signup", signup)
router.post("/login", login)

router.post("/upload", upload.single('picture'), (req, res) => {
    const file = req.file
    res.status(200).json(file.filename)
})

module.exports = router