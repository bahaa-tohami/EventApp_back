import express from 'express';
import { getUserProfile } from '../controllers/userController.js';

const router = express.Router();

// Route pour récupérer le profil d'un utilisateur par son ID
router.get('/profile/:id', getUserProfile);

export default router;