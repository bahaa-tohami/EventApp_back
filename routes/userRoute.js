import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';

const router = express.Router();

// Route pour récupérer le profil d'un utilisateur par son ID
router.get('/profile/:id', getUserProfile);
// Route pour mettre à jour le profil d'un utilisateur par son ID
router.put('/profile/:id', updateUserProfile);
export default router;