import express from 'express';
import { listUsers, activateUser, deleteUser, deactivateUser, updateUserRole, updateEvent, deleteEvent } from '../controllers/adminController.js';
import { isAdmin, isLogged } from '../middlewares/auth.js';
 
const router = express.Router();
 

router.get('/admin/users', isLogged, isAdmin, listUsers);
router.put('/admin/users/activate', isLogged, isAdmin, activateUser);
router.delete('/admin/users/delete/:id', isLogged, isAdmin, deleteUser);
router.put('/admin/users/deactivate', isLogged, isAdmin, deactivateUser);
router.put('/admin/users/role', isLogged, isAdmin, updateUserRole);
router.put('/admin/events', isLogged, isAdmin, updateEvent);
router.delete('/admin/events', isLogged, isAdmin, deleteEvent);

 
export default router;
 