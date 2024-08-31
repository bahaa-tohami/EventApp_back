import express from 'express';
import { getNotificationsUser, updateNotification } from '../controllers/notificationController.js';


const route = new express.Router();

route.get('/notifications/:id', getNotificationsUser);
route.put('/notifications/:id', updateNotification);
export default route;