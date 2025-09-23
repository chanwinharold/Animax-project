const animax_db = require("../database/animax_db");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.signup = (req, res) => {
    delete req.body.id;
    const query = req.body.user_img ? (`
        INSERT INTO Utilisateurs (username, email, password, user_img)
            VALUES (?, ?, ?, ?);
    `) : (`
        INSERT INTO Utilisateurs (username, email, password, user_img)
            VALUES (?, ?, ?, 'user-pictures/default_picture.png');
    `)
    bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error) return res.status(500).json({message: `Erreur lors du hachage du mot de passe`})
        animax_db.run(query, [req.body.username, req.body.email, hash, req.body.user_img],
            (error) => {
                if (error) {
                    if (error.errno === 19) return res.status(400).json({message: "This username or email is already used"})
                    return res.status(400).json({message: "Invalid field(s) ! Please enter correct value(s)"})
                }
                res.status(201).json({message: "Utilisateur enregistrée avec succès !"})
            })
    })
}

exports.login = (req, res) => {
    delete req.body.id;
    const query = (`
        SELECT id, username, password
        FROM Utilisateurs
        WHERE username = ?
    `)
    animax_db.get(query, [req.body.username],
        (error, result) => {
            if (error) return res.status(500).json({message: `Erreur lors du transfert des données`})
            if (!result) return res.json({message: `Your username or password is incorrect !`})
            bcrypt.compare(req.body.password, result.password, (error, isValid) => {
                if (error) return  res.status(500).json({message: `Erreur lors du transfert des données`})
                if (!isValid) return res.json({message: `Your username or password is incorrect !`})
                else {
                    return res.status(200).json(
                        {
                            token: jwt.sign(
                                {userId: result.id},
                                process.env.TOKEN_KEY_SECRET,
                                {expiresIn: '24h'}
                            )
                        }
                    )
                }
            })
        })
}
