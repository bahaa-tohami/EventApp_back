import express from 'express';
import { createUser, getUserProfile, loginUser, updateUserProfile } from '../controllers/userController.js';
import { isLogged } from '../middlewares/auth.js';


const router = express.Router();
router.get('/profile/:id', isLogged, getUserProfile);

// Route pour mettre à jour le profil d'un utilisateur par son ID
router.put('/profile/:id', isLogged, updateUserProfile);
// Route pour créer un nouvel utilisateur
router.post('/users', createUser);

router.post("/login", loginUser);

// // Route pour ajouter un commentaire à un événement
// router.post('/comments', addComment);
export default router;