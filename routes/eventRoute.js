import express from 'express';
import { saveEvent } from '../controllers/eventController.js';

const router = express.Router();

router.post('/saveEvent/:id', saveEvent);

export default router;