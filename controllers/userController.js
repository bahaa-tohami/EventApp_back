import { User } from '../models/UserModel.js';
import { Comment } from '../models/CommentModel.js';
import { Event } from '../models/EventModel.js';

/**
 * Obtenir le profil d'un utilisateur par son ID.
 * @param {Request} req
 * @param {Response} res
 */
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id; // Récupère l'ID de l'utilisateur à partir des paramètres de la route
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
  
      // Créer un nouvel utilisateur avec les données fournies
      const newUser = await User.create(userData);
  
      res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser });
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  };

  /**
 * Ajouter un commentaire à un événement.
 * @param {Request} req
 * @param {Response} res
 */
  export const addComment = async (req, res) => {
    try {
      const { user_id, event_id, content, rating } = req.body;
  
      // Récupérer l'événement à partir de la base de données
      const event = await Event.findByPk(event_id);
  
      if (!event) {
        return res.status(404).json({ message: 'Événement non trouvé' });
      }
  
      // Vérifier si la date de l'événement est passée
      const currentDate = new Date();
      if (new Date(event.date) > currentDate) {
        return res.status(400).json({ message: 'Vous ne pouvez commenter que des événements passés' });
      }
  
      // Créer un nouveau commentaire
      const newComment = await Comment.create({ user_id, event_id, content, rating });
  
      res.status(201).json({ message: 'Commentaire ajouté avec succès', comment: newComment });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire:', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  };