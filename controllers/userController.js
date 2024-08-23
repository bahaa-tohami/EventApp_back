import { User } from '../models/UserModel.js';

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