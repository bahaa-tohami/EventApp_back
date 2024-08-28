import express from 'express';
import { saveEvent } from '../controllers/eventController.js';
import { deleteEvent } from '../controllers/eventController.js';
import { updateEvent } from '../controllers/eventController.js';
import { myInvitations } from '../controllers/eventController.js';
import { isLogged } from '../middlewares/auth.js';
import { getEventsByUser } from '../controllers/eventController.js';
import { getEvents } from '../controllers/eventController.js';
import { getEventsByEventId } from '../controllers/eventController.js';




const router = express.Router();


router.post('/save-event/:id',isLogged  , saveEvent);
router.delete('/delete-event/:id',isLogged, deleteEvent);
router.put('/update-event/:id',isLogged, updateEvent);
router.get('/my-invitations/:id',isLogged, myInvitations);
router.get('/events-by-user/:id', isLogged, getEventsByUser);
router.get('/events',isLogged, getEvents);
router.get('/event-by-id/:id', getEventsByEventId);



export default router;