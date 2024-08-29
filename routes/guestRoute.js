import express from 'express';
import { inviteUser, invitationResponse } from '../controllers/guestController.js';
import { isLogged } from '../middlewares/auth.js';
import { getInvitations } from '../controllers/guestController.js';

const router = express.Router();

//router.post('/guest/comments',isLogged, addComment);
router.post('/guest/invite',isLogged, inviteUser);
router.put('/guest/invite-response',isLogged, invitationResponse);
router.get('/guest/invitations/:id',isLogged, getInvitations);
export default router;