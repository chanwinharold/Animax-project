CREATE DATABASE animax_db;
USE animax_db;

CREATE TABLE Utilisateurs (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL UNIQUE,
    user_img VARCHAR(255) DEFAULT 'user-pictures/default_picture.png'
);

INSERT INTO Utilisateurs (username, email, password, user_img)
    VALUE (?, ?, ?, ?);

SELECT id, username, password
FROM Utilisateurs
WHERE username = ?