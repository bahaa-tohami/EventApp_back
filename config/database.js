import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

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

