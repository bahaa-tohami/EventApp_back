import express from 'express';
import { addComment, inviteUser } from '../controllers/guestController.js';

const router = express.Router();

router.post('/guest/comments', addComment);
router.post('/guest/invite', inviteUser);

export default router;