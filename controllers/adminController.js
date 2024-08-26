import { User } from '../models/UserModel.js';
import { Event } from '../models/EventModel.js';
/**
 * Lister tous les utilisateurs.
 * @param {Request} req
 * @param {Response} res
 */
export const listUsers = async (req, res) => {
 
  try {
    const users = await User.findAll({
      attributes: ['user_id', 'username', 'email', 'first_name', 'last_name', 'role', 'status', 'created_at', 'updated_at']
    });
    res.status(200).json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

/**
 * Activer un utilisateur.
 * @param {Request} req
 * @param {Response} res
 */
export const activateUser = async (req, res) => {
  try {
    const { user_id } = req.body;
 
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
 
    user.status = 'active';
    await user.save();
 
    res.status(200).json({ message: 'Utilisateur activé avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'activation de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

/**
 * Supprimer un utilisateur.
 * @param {Request} req
 * @param {Response} res
 */
export const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.body;
 
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
 
    await user.destroy();
 
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

/**
 * Désactiver un utilisateur.
 * @param {Request} req
 * @param {Response} res
 */
export const deactivateUser = async (req, res) => {
 
  try {
    const { user_id } = req.body;
 
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
 
    user.status = 'inactive';
    await user.save();
 
    res.status(200).json({ message: 'Utilisateur désactivé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la désactivation de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};


/**
 * Modifier le rôle d'un utilisateur.
 * @param {Request} req
 * @param {Response} res
 */
export const updateUserRole = async (req, res) => {
 
  try {
    const { user_id, role } = req.body;
 
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
 
    user.role = role;
    await user.save();
 
    res.status(200).json({ message: 'Rôle de l\'utilisateur mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du rôle de l\'utilisateur:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

/**
 * Modifier un événement existant.
 * @param {Request} req
 * @param {Response} res
 */
export const updateEvent = async (req, res) => {
 
 
  try {
    const { event_id, description, date, time, capacity, is_private, title, location } = req.body;
 
    const event = await Event.findByPk(event_id);
    if (!event) {
      return res.status(404).json({ message: 'Événement non trouvé' });
    }
 
    event.description = description;
    event.date = date;
    event.time = time;
    event.capacity = capacity;
    event.is_private = is_private;
    event.title = title;
    event.location = location;
    await event.save();
 
    res.status(200).json({ message: 'Événement mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'événement:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};


/**
 * Supprimer un événement.
 * @param {Request} req
 * @param {Response} res
 */
export const deleteEvent = async (req, res) => {
 
  try {
    const { event_id } = req.body;
 
    const event = await Event.findByPk(event_id);
    if (!event) {
      return res.status(404).json({ message: 'Événement non trouvé' });
    }
 
    await event.destroy();
 
    res.status(200).json({ message: 'Événement supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'événement:', error);
    res.status(500).json({ message: 'Erreur interne du serveur' });
  }
};

