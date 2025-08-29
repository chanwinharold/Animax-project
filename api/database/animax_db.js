const mysql = require("mysql2")

const animax_db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "animax_db"
})

animax_db.connect((err) => {
    if (err) return console.log("❌ Échec de la connexion à la BD\n", err)
    return console.log("✅ Connexion à la BD réussie !")
})

module.exports = animax_db