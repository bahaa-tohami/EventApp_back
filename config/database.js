import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import mysql from 'mysql2/promise';
dotenv.config();

// connexion a la base des données
const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

// creation de la base de données
try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    console.log(`La base de données ${process.env.DB_NAME} a été créée avec succès.`);
} catch (error) {
    console.error('Erreur lors de la création de la base de données:', error);
}

// Création d'une instance Sequelize avec les informations de connexion

 const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  });

  sequelize.authenticate()
  .then(() => {
    console.log('Connexion réussie à la base de données.');
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données:', err);
  });
  export default sequelize;
  

