import express from 'express';
import { saveEvent } from '../controllers/eventController.js';
import { deleteEvent } from '../controllers/eventController.js';
import { updateEvent } from '../controllers/eventController.js';
import { myInvitations } from '../controllers/eventController.js';
import { isLogged } from '../middlewares/auth.js';





const router = express.Router();

router.post('/save-event/:id',isLogged  , saveEvent);
router.delete('/delete-event/:id',isLogged, deleteEvent);
router.put('/update-event/:id',isLogged, updateEvent);
router.get('/my-invitations/:id',isLogged, myInvitations);

export default router;