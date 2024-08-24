import express from 'express';
import { saveEvent } from '../controllers/eventController.js';
import { deleteEvent } from '../controllers/eventController.js';
import { updateEvent } from '../controllers/eventController.js';



const router = express.Router();

router.post('/saveEvent/:id', saveEvent);
router.delete('/deleteEvent/:id', deleteEvent);
router.put('/updateEvent/:id', updateEvent);

export default router;