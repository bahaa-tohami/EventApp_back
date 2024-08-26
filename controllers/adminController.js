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


