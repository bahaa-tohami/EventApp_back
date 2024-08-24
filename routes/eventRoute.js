import express from 'express';
import { saveEvent } from '../controllers/eventController.js';
import { deleteEvent } from '../controllers/eventController.js';

const router = express.Router();

router.post('/saveEvent/:id', saveEvent);
router.delete('/deleteEvent/:id', deleteEvent);
export default router;