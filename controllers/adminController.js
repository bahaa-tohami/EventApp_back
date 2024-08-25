import { User } from '../models/UserModel.js';
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