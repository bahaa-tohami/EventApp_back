import mysql from 'mysql2/promise';
import dotenv from "dotenv";

dotenv.config();

async function initDB() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    });
 
    try {
        // Créer la base de données
        await connection.query('CREATE DATABASE IF NOT EXISTS event_management;');
 
        // Utiliser la base de données
        await connection.query('USE event_management;');
 
        // Créer la table Users
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Users (
                user_id INT AUTO_INCREMENT PRIMARY KEY,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                username VARCHAR(50) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                first_name VARCHAR(50),
                last_name VARCHAR(50),
                role ENUM('user', 'admin') DEFAULT 'user',
                status ENUM('active', 'inactive') DEFAULT 'active'
            );
        `);
 
        // Créer la table Events
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Events (
                event_id INT AUTO_INCREMENT PRIMARY KEY,
                description TEXT,
                date DATE,
                time TIME,
                capacity INT,
                is_private BOOLEAN DEFAULT FALSE,
                created_by INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                title VARCHAR(100),
                location VARCHAR(255),
                FOREIGN KEY (created_by) REFERENCES Users(user_id)
            );
        `);
 
        // Créer la table Participants
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Participants (
                participant_id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                event_id INT,
                invited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                responded_at TIMESTAMP NULL,
                status ENUM('invited', 'accepted', 'declined', 'canceled') DEFAULT 'invited',
                FOREIGN KEY (user_id) REFERENCES Users(user_id),
                FOREIGN KEY (event_id) REFERENCES Events(event_id)
            );
        `);
 
        // Créer la table Notifications
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Notifications (
                notification_id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                event_id INT,
                message TEXT,
                is_read BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                type ENUM('invitation', 'reminder', 'update'),
                FOREIGN KEY (user_id) REFERENCES Users(user_id),
                FOREIGN KEY (event_id) REFERENCES Events(event_id)
            );
        `);
 
        // Créer la table Comments
        await connection.query(`
            CREATE TABLE IF NOT EXISTS Comments (
                comment_id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                event_id INT,
                content TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                rating INT CHECK(rating >= 1 AND rating <= 5),
                FOREIGN KEY (user_id) REFERENCES Users(user_id),
                FOREIGN KEY (event_id) REFERENCES Events(event_id)
            );
        `);
 
        console.log('Base de données et tables créées avec succès!');
    } catch (error) {
        console.error('Erreur lors de la création de la base de données:', error.message);
    } finally {
        await connection.end();
    }
}
export default initDB;
