const sqlite = require("sqlite3")

const animax_db = new sqlite.Database(
    "./database/animax_db.db",
    (err) => {
                if (err) return console.log("❌ Échec de la connexion à la BD\n", err)
                return console.log("✅ Connexion à la BD réussie !")
            }
)

module.exports = animax_db