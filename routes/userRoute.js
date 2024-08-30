import express from 'express';
import { createUser, getUsernames, getUserProfile, getUserRole, loginUser, updateUserProfile } from '../controllers/userController.js';
import { isLogged } from '../middlewares/auth.js';
import { getUserById } from '../controllers/userController.js';



const router = express.Router();
router.get('/profile/:id', isLogged, getUserProfile);

// Route pour mettre à jour le profil d'un utilisateur par son ID
router.put('/profile/:id', isLogged, updateUserProfile);
// Route pour créer un nouvel utilisateur
router.post('/users', createUser);

router.post("/login", loginUser);

router.get('/users/:id/role', isLogged, getUserRole);
// // Route pour ajouter un commentaire à un événement
// router.post('/comments', addComment);

// Route pour récupérer la liste des utilisateurs
router.get('/usernames', getUsernames);
router.get('/users/:id', getUserById);

export default router;