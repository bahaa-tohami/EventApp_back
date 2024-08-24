import express from 'express';
import { saveEvent } from '../controllers/eventController.js';
import { deleteEvent } from '../controllers/eventController.js';
import { updateEvent } from '../controllers/eventController.js';



const router = express.Router();

router.post('/save-event/:id', saveEvent);
router.delete('/delete-event/:id', deleteEvent);
router.put('/update-event/:id', updateEvent);

export default router;