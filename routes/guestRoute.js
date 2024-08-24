import express from 'express';
import { addComment, inviteUser, invitationResponse } from '../controllers/guestController.js';


const router = express.Router();

router.post('/guest/comments', addComment);
router.post('/guest/invite', inviteUser);
router.put('/guest/invite-response', invitationResponse);

export default router;