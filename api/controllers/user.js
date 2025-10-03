const animax_db = require("../database/animax_db");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.signup = (req, res) => {
    // We delete the client id for more security
    delete req.body.id;

    // Double check fields validity
    const regexEmail = new RegExp("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{1,4}$");
    if (req.body.username.length < 1)
        return res.status(400).json({message: "Username shouldn't be empty !"})
    if (req.body.email.length < 1)
        return res.status(400).json({message: "Email shouldn't be empty !"})
    if (!regexEmail.test(req.body.email))
        return res.status(400).json({message: "Your email is invalid !\n Please enter a valid email."})
    if (req.body.password.length < 8)
        return res.status(400).json({message: "Password should contains at least 8 characters !"})

    // Query to send data to the DB with a condition -> if a file is uploaded / or not
    const query = req.body.user_img ? (`
        INSERT INTO Utilisateurs (username, email, password, user_img)
        VALUES (?, ?, ?, ?);
    `) : (`
        INSERT INTO Utilisateurs (username, email, password, user_img)
        VALUES (?, ?, ?, 'user-pictures/default_picture.png');
    `)

    // Hashing the password
    bcrypt.hash(req.body.password, 10, (error, hash) => {
        // If an error occurred while hashing
        if (error) return res.status(500).json({message: `An error occurred ! Please try again.`})

        // Query parameters depending on -> file is uploaded / or not
        const query_parameters = req.body.user_img ? [req.body.username, req.body.email, hash, req.body.user_img] : [req.body.username, req.body.email, hash]

        // Run the query to send datas to the DB
        animax_db.run(query, query_parameters,
            (error) => {
                if (error) {
                    if (error.errno === 19) return res.status(400).json({message: "This username or email is already used"})
                    return res.status(400).json({message: "An error occurred ! Please try again."})
                }
                return res.status(201).json({message: "User saved with success !"})
            })
    })
}

exports.login = (req, res) => {
    // We delete the client id for more security
    delete req.body.id;

    // Query to find the user in the DB
    const query = (`
        SELECT id, username, password
        FROM Utilisateurs
        WHERE username = ?
    `)

    // Execution of the query
    animax_db.get(query, [req.body.username],
        (error, result) => {

            // if an error occurred send a message
            if (error) return res.status(500).json({message: `An error occurred ! Please try again.`})

            // if your username aren't correct send a message
            if (!result) return res.json({message: `Your username or password is incorrect !`})

            // check the password
            bcrypt.compare(req.body.password, result.password, (error, isValid) => {
                // if an error occurred send a message
                if (error) return res.status(500).json({message: `An error occurred ! Please try again.`})

                // if your password aren't correct send a message
                if (!isValid) return res.json({message: `Your username or password is incorrect !`})
                else {
                    // else send a jwt token for the client authentification
                    const token = jwt.sign(
                        {userId: result.id},
                        process.env.TOKEN_KEY_SECRET,
                        {expiresIn: '24h'}
                    )
                    const {password, ...others} = result
                    return res.cookie("token", token, {httpOnly: true}).status(200).json(others)
                }
            })
        })
}
