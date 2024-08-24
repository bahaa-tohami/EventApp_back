import express from 'express';
import { createUser, getUserProfile, updateUserProfile } from '../controllers/userController.js';

const router = express.Router();

// Route pour récupérer le profil d'un utilisateur par son ID
router.get('/profile/:id', getUserProfile);
// Route pour mettre à jour le profil d'un utilisateur par son ID
router.put('/profile/:id', updateUserProfile);
// Route pour créer un nouvel utilisateur
router.post('/users', createUser);
// // Route pour ajouter un commentaire à un événement
// router.post('/comments', addComment);
export default router;