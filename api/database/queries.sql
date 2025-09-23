CREATE TABLE Utilisateurs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    user_img TEXT NOT NULL DEFAULT 'user-pictures/default_picture.png'
);

INSERT INTO Utilisateurs (username, email, password, user_img)
    VALUES (?, ?, ?, ?);

SELECT id, username, password
FROM Utilisateurs
WHERE username = ?;

DROP TABLE Utilisateurs;