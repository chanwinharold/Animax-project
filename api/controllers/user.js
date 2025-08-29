const animax_db = require("../database/animax_db");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.signup = (req, res) => {
    delete req.body.id;
    const query = (`
        INSERT INTO Utilisateurs (username, email, password, user_img)
            VALUE (?, ?, ?, ?);
    `)
    bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error) return res.status(500).json({message: `Erreur de hashage du mot de passe\n ${error}`})
        animax_db.query(query, [req.body.username, req.body.email, hash, req.body.user_img],
            (error, ) => {
                if (error) return res.status(500).json({message: `Erreur lors de l'enregistrement\n ${error}`})
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
    animax_db.query(query, [req.body.username],
        (error, result) => {
            if (error) return res.status(500).json({message: `Erreur lors du transfert des données\n ${error}`})
            if (result.length === 0) return res.status(404).json({message: `Votre username ou password est incorrecte !`})
            bcrypt.compare(req.body.password, result[0].password, (err, isValid) => {
                if (error) return  res.status(500).json({message: `Erreur lors du transfert des données\n ${error}`})
                if (!isValid) return res.status(404).json({message: `Votre username ou password est incorrecte !`})
                else {
                    return res.status(200).json(
                        {
                            message: "Connexion réussie !",
                            token: jwt.sign(
                                {userId: result[0].id},
                                process.env.TOKEN_KEY_SECRET,
                                {expiresIn: '24h'}
                            )
                        }
                    )
                }
            })
        })
}
