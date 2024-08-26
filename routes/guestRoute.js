import express from 'express';
import { inviteUser, invitationResponse } from '../controllers/guestController.js';
import { isLogged } from '../middlewares/auth.js';

const router = express.Router();

//router.post('/guest/comments',isLogged, addComment);
router.post('/guest/invite',isLogged, inviteUser);
router.put('/guest/invite-response',isLogged, invitationResponse);

export default router;