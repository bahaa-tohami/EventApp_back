import express from 'express';
import { createComment, getCommentsByEvent } from '../controllers/commentController.js'; 
import { isLogged } from '../middlewares/auth.js';
const router = express.Router();

// Route pour créer un commentaire
router.post('/comments', isLogged, createComment);

// Route pour récupérer les commentaires d'un événement spécifique
router.get('/comments/event/:id', isLogged, getCommentsByEvent);

export default router;
