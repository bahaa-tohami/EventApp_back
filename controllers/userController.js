import { User } from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';
import jwt from 'jsonwebtoken';
import { getUserIdFromToken } from '../utils/getUserIdFromToken.js';
/**
 * Obtenir le profil d'un utilisateur par son ID.
 * @param {Request} req
 * @param {Response} res
 */
export const getUserProfile = async (req, res) => {
    // Récupère l'ID de l'utilisateur à partir des paramètres de la route
    const userId = req.params.id; 
    const tokenUserId = getUserIdFromToken(req);
    if(tokenUserId != userId) {
        return res.json({ message: "Vous n'êtes pas autorisé à accéder à cette page" });
    }
    try {
        const user = await User.findByPk(userId, {
            attributes: ['user_id', 'username', 'email', 'first_name', 'last_name', 'role', 'status', 'created_at', 'updated_at']
        });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Erreur lors de la récupération du profil utilisateur:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

/**
 * Mettre à jour le profil d'un utilisateur par son ID.
 * @param {Request} req
 * @param {Response} res
 */
export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;
        const tokenUserId = getUserIdFromToken(req);
        if(tokenUserId != userId) {
            return res.json({ message: "Vous n'êtes pas autorisé à accéder à cette page" });
        }
        // Trouver l'utilisateur par ID
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Mettre à jour l'utilisateur avec les nouvelles données
        await user.update(updatedData);

        res.status(200).json({ message: 'Profil utilisateur mis à jour avec succès', user });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du profil utilisateur:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

/**
 * Créer un nouvel utilisateur.
 * @param {Request} req
 * @param {Response} res
 */
export const createUser = async (req, res) => {
    try {
        const userData = req.body;
        const checkPwd = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,30}$/;
        const existingUser = await User.findOne({ where: { email: userData.email } });
        const checkUsername = /^[a-zA-Z0-9_-]{5,30}$/;
        const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!checkUsername.test(req.body.username)) {
            return res.json({message: "Le username ne respecte pas les conditions"})
        }
        if(!checkEmail.test(req.body.email)) {
            return res.json({message: "L'email ne respecte pas les conditions"})
        }

        if (existingUser) {
            return res.status(400).json({ message: 'Cette adresse e-mail est déjà utilisée' });
          }

          if(!checkPwd.test(req.body.password_hash)) {
            return res.json({message: "Le mot de passe ne respecte pas les conditions"})
        }
          //fin user par username
          const existingUserUsername = await User.findOne({ where: { username: userData.username } });
          if (existingUserUsername) {
            return res.status(400).json({ message: 'Cet username est déjà utilisé' });
          }
     
        // Hasher le mot de passe avant de créer l'utilisateur
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(userData.password_hash, saltRounds);

        // Remplacer le mot de passe en clair par le mot de passe hashé
        userData.password_hash = hashedPassword;
        // Créer un nouvel utilisateur avec les données fournies
        const newUser = await User.create(userData);

        res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

export const loginUser = async (req, res) => {
    try {
     const { username, password } = req.body;
 
     // trouver user par usernane(email ou username)
     //je vais que tu me trouve le user par username ou email      
   
     const user = await User.findOne({
        where: {
          [Op.or]: [
            { username: username },
            { email: username }
          ]
        }
      });
     
 
      if (!user) {
        return res.status(400).json({ message: 'Adresse email ou username invalide' });
      }
   
      //compare password
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(400).json({ message: 'Mot de passe invalide' });
      }
 
      // Generate JWT
      const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
     
      // retourner le token
      res.status(200).json({ message: 'Connexion réussie.', token, userId: user.user_id  });
 
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  };

  /**
 * Récupérer la liste des utilisateurs avec seulement leur nom d'utilisateur.
 * @param {Request} req
 * @param {Response} res
 */
export const getUsernames = async (req, res) => {
  try {
      // Récupérer les utilisateurs avec seulement leur nom d'utilisateur
      const users = await User.findAll({
          attributes: ['username']
      });

      // Retourner la liste des noms d'utilisateur
      res.status(200).json(users);
  } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

/**
 * Obtenir le rôle d'un utilisateur par son ID.
 * @param {Request} req
 * @param {Response} res
 */
export const getUserRole = async (req, res) => {
  try {
      const userId = req.params.id;
      const user = await User.findByPk(userId, {
          attributes: ['role']
      });

      if (!user) {
          return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      res.status(200).json({ role: user.role });
  } catch (error) {
      console.error('Erreur lors de la récupération du rôle utilisateur:', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};