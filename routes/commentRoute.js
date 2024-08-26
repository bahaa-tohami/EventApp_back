import express from 'express';
import { createComment, getCommentsByEvent } from '../controllers/commentController.js'; // Assurez-vous que le chemin est correct pour importer le contrôleur

const router = express.Router();

// Route pour créer un commentaire
router.post('/comments', createComment);

// Route pour récupérer les commentaires d'un événement spécifique
router.get('/comments/event/:id', getCommentsByEvent);

export default router;
