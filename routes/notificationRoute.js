import express from 'express';
import { getNotificationsUser } from '../controllers/notificationController.js';

const route = new express.Router();

route.get('/notifications/:id', getNotificationsUser);

export default route;